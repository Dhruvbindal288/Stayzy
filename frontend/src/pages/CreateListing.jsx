import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    country: "",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    category: "general",
  });

  const createListingMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/listings/create-listing", data);
      return response.data;
    },
    onSuccess: () => {
      alert("✅ Listing created successfully!");
      navigate("/"); // redirect back to homepage
    },
    onError: (error) => {
      console.error("❌ Error creating listing:", error.response?.data || error.message);
      alert("Failed to create listing");
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createListingMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "title",
            "description",
            "image",
            "price",
            "location",
            "country",
            "guests",
            "bedrooms",
            "bathrooms",
            "category",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={["price", "guests", "bedrooms", "bathrooms"].includes(field) ? "number" : "text"}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder={`Enter ${field}`}
                required={["title", "description", "image", "price", "location", "country"].includes(field)}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={createListingMutation.isPending}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {createListingMutation.isPending ? "Creating..." : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
