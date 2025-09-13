import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function Home() {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    guests: "",
  });

  // fetch listings with filters
  const fetchListings = async () => {
    const response = await axiosInstance.get("/listing/all", {
      params: filters,
    });
    return response.data;
  };

  const { data: listings, isLoading, isError, refetch } = useQuery({
    queryKey: ["listings", filters],
    queryFn: fetchListings,
  });

  // Handle filter change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Stay</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded-lg flex-1"
        />
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="border p-2 rounded-lg w-32"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="border p-2 rounded-lg w-32"
        />
        <input
          type="number"
          name="guests"
          value={filters.guests}
          onChange={handleChange}
          placeholder="Guests"
          className="border p-2 rounded-lg w-28"
        />
        <button
          onClick={() => refetch()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {/* Listings */}
      {isLoading && (
        <p className="text-center text-gray-600">Loading listings...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load listings.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings?.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {listing.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {listing.location}, {listing.country}
                </p>
                <p className="text-gray-700 mb-2 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{listing.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {listing.guests} guests · {listing.bedrooms} br ·{" "}
                    {listing.bathrooms} ba
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          !isLoading && (
            <p className="text-center text-gray-500 col-span-full">
              No listings found. Try adjusting filters.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
