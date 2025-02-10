import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUtensils,
  faPlus,
  faStar,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faQuestionCircle,
  faPhone,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = localStorage.getItem("token");

  const LogoutUser = () => {
    if (window.confirm("Want to Logout from this Session?")) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      window.location.href = "/recipes";
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </NavLink>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 text-2xl focus:outline-none transition-transform duration-300"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-8 items-center">
          {auth ? (
            <>
              <NavItem to="/recipes" icon={faUtensils} label="Recipes" />
              <NavItem to="/addRecipe" icon={faPlus} label="Add Recipe" />
              <NavItem to="/favouriteRecipes" icon={faHeart} label="Favorites" />
              <NavItem to="/contact" icon={faPhone} label="Contact" />
              <button
                onClick={LogoutUser}
                className="text-gray-800 hover:text-indigo-600 flex items-center space-x-2 transition duration-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={faSignInAlt} label="Login" />
              <NavItem to="/signup" icon={faUserPlus} label="SignUp" />
              <NavItem to="/forgotPassword" icon={faQuestionCircle} label="Forgot Password" />
              <NavItem to="/contact" icon={faPhone} label="Contact" />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Sliding Mobile Menu */}
            <div className="fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ease-in-out">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-800 text-2xl focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <ul className="flex flex-col space-y-6 mt-8">
                {auth ? (
                  <>
                    <NavItem to="/recipes" icon={faUtensils} label="Recipes" onClick={() => setIsOpen(false)} />
                    <NavItem to="/addRecipe" icon={faPlus} label="Add Recipe" onClick={() => setIsOpen(false)} />
                    <NavItem to="/favouriteRecipes" icon={faStar} label="Favorites" onClick={() => setIsOpen(false)} />
                    <NavItem to="/contact" icon={faPhone} label="Contact" onClick={() => setIsOpen(false)} />
                    <button
                      onClick={LogoutUser}
                      className="text-gray-800 hover:text-indigo-600 flex items-center space-x-2 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <NavItem to="/login" icon={faSignInAlt} label="Login" onClick={() => setIsOpen(false)} />
                    <NavItem to="/signup" icon={faUserPlus} label="SignUp" onClick={() => setIsOpen(false)} />
                    <NavItem to="/forgotPassword" icon={faQuestionCircle} label="Forgot Password" onClick={() => setIsOpen(false)} />
                    <NavItem to="/contact" icon={faPhone} label="Contact" onClick={() => setIsOpen(false)} />
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

// ✅ Reusable NavLink Component with Hover Effect
const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="text-gray-800 hover:text-indigo-600 flex items-center space-x-2 transition duration-300"
  >
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </NavLink>
);

export default Navbar;
