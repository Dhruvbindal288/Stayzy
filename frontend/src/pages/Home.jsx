import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { FaBed, FaBath, FaUserFriends } from "react-icons/fa";

function Home() {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    guests: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchListings = async () => {
    const response = await axiosInstance.get("/listings/all-listings", {
      params: filters,
    });
    return response.data;
  };

  const { data: listings, isLoading, isError, refetch } = useQuery({
    queryKey: ["listings", filters],
    queryFn: fetchListings,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
        Find Your Stay 🏡
      </h1>

      {/* Filters */}
      <div className="bg-white p-3 rounded-xl shadow-md mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded-lg flex-1 text-sm"
        />
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="border p-2 rounded-lg w-24 text-sm"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="border p-2 rounded-lg w-24 text-sm"
        />
        <input
          type="number"
          name="guests"
          value={filters.guests}
          onChange={handleChange}
          placeholder="Guests"
          className="border p-2 rounded-lg w-20 text-sm"
        />
        <button
          onClick={() => refetch()}
          className="bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading/Error */}
      {isLoading && <p className="text-center text-gray-600">Loading listings...</p>}
      {isError && <p className="text-center text-red-500">Failed to load listings.</p>}

      {/* Listings */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings?.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-40 md:h-44 object-cover"
              />
              <div className="p-3 flex flex-col gap-1">
                <h2 className="text-md md:text-lg font-bold text-gray-800 truncate">
                  {listing.title}
                </h2>
                <p className="text-gray-500 text-xs md:text-sm truncate">
                  {listing.location}, {listing.country}
                </p>

                {/* Price */}
                <p className="text-indigo-600 font-bold text-lg mt-1">
                  ₹{listing.price}{" "}
                  <span className="text-gray-500 text-sm font-normal">/ night</span>
                </p>

                <p className="text-gray-700 text-sm line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex justify-start items-center gap-3 mt-2 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <FaBed className="text-indigo-600" /> {listing.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBath className="text-indigo-600" /> {listing.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUserFriends className="text-indigo-600" /> {listing.guests}
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
