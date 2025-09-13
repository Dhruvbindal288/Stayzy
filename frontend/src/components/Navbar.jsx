import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

 
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between min-h-14 bg-white shadow px-6">
     
      <h1 className="text-2xl font-bold">Stayzy</h1>

     
      <ul className="hidden md:flex items-center gap-14 font-medium">
       <NavLink to='/'><li className="hover:text-red-600 cursor-pointer">Home</li></NavLink>  
      <NavLink to='/create-listing'>  <li className="hover:text-red-600 cursor-pointer">Host a listing</li></NavLink>
     <NavLink to='/login'><li className="hover:text-red-600 cursor-pointer">Login</li></NavLink>   
      </ul>

      
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaTimes className="text-black text-2xl" />
          ) : (
            <FaBars className="text-black text-2xl" />
          )}
        </button>
      </div>

     
      {isOpen && (
        <ul className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 font-medium md:hidden">
         <NavLink to='/'><li className="hover:text-red-600 cursor-pointer">Home</li></NavLink>  
        <li className="hover:text-red-600 cursor-pointer">Experience</li>
     <NavLink to='/login'><li className="hover:text-red-600 cursor-pointer">Login</li></NavLink>   
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
