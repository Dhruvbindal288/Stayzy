
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

function Signup() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  


  
  const signupMutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await axiosInstance.post("/auth/signup", newUser);
      return response.data;
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate(formData); 
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[380px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome To Stayzy
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

         

         
          {signupMutation.isError && (
            <p className="text-red-500 text-sm">
              {signupMutation.error.response?.data?.message || "Signup failed"}
            </p>
          )}
          {signupMutation.isSuccess && (
            <p className="text-green-600 text-sm">Signup successful!</p>
          )}

          <button
            type="submit"
            disabled={signupMutation.isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
          >
            {signupMutation.isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;


//https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_1280.jpg