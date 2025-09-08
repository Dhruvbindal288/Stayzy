import React from "react";

function Signup() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[380px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome To Stayzy
        </h2>
        <form className="space-y-4">
        
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

       
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

        
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>

         
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
           Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an  account?{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
           Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
