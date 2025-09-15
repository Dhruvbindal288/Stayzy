import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { FaBed, FaBath, FaUserFriends } from "react-icons/fa";

function Listing() {
  const { id } = useParams();

  const fetchListing = async () => {
    const response = await axiosInstance.get(`/listings/${id}`);
    return response.data;
  };

  const { data: listing, isLoading, isError } = useQuery({
    queryKey: ["listing", id],
    queryFn: fetchListing,
  });

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-600">Loading listing...</p>;
  }

  if (isError || !listing) {
    return <p className="text-center mt-10 text-red-500">Failed to load listing.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-[420px] object-cover"
          />
          <span className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
            ₹{listing.price} / night
          </span>
        </div>

       
        <div className="p-8">
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
              <p className="text-gray-500 text-lg mt-1">
                {listing.location}, {listing.country}
              </p>
            </div>
          </div>

          
          <hr className="my-6 border-gray-200" />

          
          <div className="flex flex-wrap gap-8 text-gray-700 text-lg">
            <span className="flex items-center gap-2">
              <FaBed className="text-indigo-600 text-xl" /> {listing.bedrooms} Bedrooms
            </span>
            <span className="flex items-center gap-2">
              <FaBath className="text-indigo-600 text-xl" /> {listing.bathrooms} Bathrooms
            </span>
            <span className="flex items-center gap-2">
              <FaUserFriends className="text-indigo-600 text-xl" /> {listing.guests} Guests
            </span>
          </div>

       
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">About this place</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </div>

        
          <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-800">
              <strong className="font-semibold">Hosted by:</strong>{" "}
              {listing.owner?.fullName} ({listing.owner?.email})
            </p>
          </div>

          
          <div className="mt-8 flex justify-end">
            <Link
              to="/"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
