import Listing from "../models/listing.models.js";

export const createListing = async (req, res) => {
  try {
    const user = req.user; 
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const {
      title,
      description,
      image,
      price,
      location,
      country,
      category,
      guests,
      bedrooms,
      bathrooms,
    } = req.body;

    if (!title || !description || !image || !price || !location || !country) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const newListing = await Listing.create({
      title,
      description,
      image,
      price,
      location,
      country,
      owner: user._id,
      category: category || "general",
      guests: guests || 1,
      bedrooms: bedrooms || 1,
      bathrooms: bathrooms || 1,
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const allListings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, guests } = req.query;

    
    const filter = {};

    if (location) filter.location = { $regex: location, $options: "i" };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (guests) filter.guests = { $gte: Number(guests) };

    const listings = await Listing.find(filter)
      .populate("owner", "fullName email") 
      .sort({ createdAt: -1 }); 

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listingDetails = async (req, res) => {
  try {
    const { id: listingId } = req.params;

    const listing = await Listing.findById(listingId).populate(
      "owner",
      "fullName email"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing details:", error);
    res.status(500).json({ message: "Server error" });
  }
};