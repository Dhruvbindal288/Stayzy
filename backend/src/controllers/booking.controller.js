import Booking from "../models/booking.model.js";
import Listing from "../models/listing.models.js";


export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { listingId } = req.params;
    const { checkIn, checkOut } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "Check-in and check-out are required" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const overlap = await Booking.findOne({
      listing: listingId,
      $or: [
        {
          checkIn: { $lte: new Date(checkOut) },
          checkOut: { $gte: new Date(checkIn) },
        },
      ],
    });

    if (overlap) {
      return res.status(400).json({ message: "Listing already booked for these dates" });
    }

    const booking = await Booking.create({
      listing: listingId,
      user: userId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("listing", "title location image price")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getListingBookings = async (req, res) => {
  try {
    const { listingId } = req.params;

    const bookings = await Booking.find({ listing: listingId }).select("checkIn checkOut");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching listing bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};
