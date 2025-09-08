import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <div className="flex flex-col items-center mt-20 px-4">
      <div className="bg-white shadow-xl rounded-full flex flex-col md:flex-row items-center w-full md:w-auto md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        
      
       <div className="flex flex-col px-6 py-3 hover:bg-gray-50 rounded-full">
  <label className="text-xs font-semibold text-gray-500">Where</label>
  <select
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
    className="mt-1 px-4 py-2 border border-gray-300 rounded-lg text-base text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
  >
    <option value="">Search Destination</option>
    <option value="Delhi">Delhi</option>
    <option value="Goa">Goa</option>
    <option value="Jaipur">Jaipur</option>
    <option value="Manali">Manali</option>
  </select>
</div>


        <div className="flex flex-col px-6 py-3 hover:bg-gray-50">
          <label className="text-xs font-semibold text-gray-500">Check-in</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            placeholderText="Add dates"
            className="bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div>

       
        <div className="flex flex-col px-6 py-3 hover:bg-gray-50">
          <label className="text-xs font-semibold text-gray-500">Check-out</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            placeholderText="Add dates"
            className="bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div>

        
        <div className="px-6 py-3 flex justify-center">
          <button className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition flex items-center justify-center">
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
