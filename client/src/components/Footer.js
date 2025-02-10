import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
  faInstagram,
  faTelegram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Logo & Copyright */}
        <div className="mb-6 md:mb-0">
          <img src={logo} alt="Logo" className="w-20 h-auto mx-auto md:mx-0 mb-3" />
          <p className="text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/ikamalagrahari"
              className="hover:text-green-400 transition-colors duration-300"
            >
              ikamalagrahari
            </a>
            . All Rights Reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { path: "/recipes", label: "Recipes" },
              { path: "/favouriteRecipes", label: "Favorites" },
              { path: "/addRecipe", label: "Add Recipe" },
              { path: "/contact", label: "Contact" },
            ].map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className="hover:text-blue-400 transition duration-300 text-sm"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-400">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { href: "https://github.com/ikamalagrahari", icon: faGithub },
              { href: "https://discord.gg/ikamalagrahari", icon: faDiscord },
              { href: "https://instagram.com/ikamalagrahari", icon: faInstagram },
              { href: "https://t.me/ikamalagrahari", icon: faTelegram },
              { href: "https://facebook.com/ikamalagrahari", icon: faFacebook },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
              >
                <FontAwesomeIcon icon={social.icon} size="2x" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider and Bottom Text */}
      <div className="border-t border-gray-700 mt-6 pt-4">
        <p className="text-center text-sm text-gray-400">
          Designed and Developed with ❤️ by{" "}
          <a
            href="https://github.com/ikamalagrahari"
            className="hover:text-green-400 transition-colors duration-300"
          >
            ikamalagrahari
          </a>
          . Contact us via social media or email for inquiries.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
