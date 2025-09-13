import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { FaBed, FaBath } from "react-icons/fa";

function Home() {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    guests: "",
  });


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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Find Your Stay 🏡
      </h1>

      <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-wrap gap-4">
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
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      
      {isLoading && (
        <p className="text-center text-gray-600">Loading listings...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load listings.</p>
      )}

     
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {listings?.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {listing.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">
                    {listing.location}, {listing.country}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{listing.price}{" "}
                    <span className="text-sm font-medium text-gray-500">
                      / night
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <FaBed /> {listing.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {listing.bathrooms}
                    </span>
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
