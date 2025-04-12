
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { Menu, X } from 'lucide-react'; // Optional icons

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Link Analytics
        </Link>

        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`md:flex md:space-x-6 items-center ${isOpen ? 'block mt-4' : 'hidden'} md:block`}>
          <Link to="/about" className="block mt-2 md:mt-0 hover:text-purple-200">
            About Us
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block mt-2 md:mt-0 hover:text-purple-200">
                Dashboard
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="block mt-2 md:mt-0 hover:text-purple-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block mt-2 md:mt-0 hover:text-purple-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
