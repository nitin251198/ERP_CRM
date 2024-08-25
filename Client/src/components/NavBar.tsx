import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; // Import the styling

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    localStorage.setItem("authToken", '');
    window.location.pathname = '/login';
  };

  return (
    <header className="bg-gray-500 text-white p-4 flex items-center justify-between rounded-lg">
      <h2 className="cursor-pointer uppercase font-medium text-xl">
        <Link to="/" className="text-white hover:text-gray-300">ERP_CRM</Link>
      </h2>
      <ul className={`md:flex gap-4 uppercase font-medium ${isNavbarOpen ? 'block' : 'hidden'} md:block`}>
        {localStorage.getItem("authToken") ? (
          <li
            onClick={handleLogoutClick}
            className="py-2 px-3 cursor-pointer hover:bg-gray-700 transition rounded-sm"
          >
            Logout
          </li>
        ) : (
          <li className="py-2 px-3 cursor-pointer hover:bg-gray-700 transition rounded-sm">
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          </li>
        )}
      </ul>
      <span className="md:hidden cursor-pointer" onClick={toggleNavbar}>
        <i className="fa-solid fa-bars text-white"></i>
      </span>
    </header>
  );
};

export default Navbar;
