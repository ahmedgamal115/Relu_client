import React from 'react';
import { Link } from 'react-router-dom';
import ReluLogo from '../Data/Logo/Relu.png';
import { FaTiktok, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          <div className="text-center sm:text-left mb-8"> {/* Centered at small screens */}
            <Link to="/" className="flex items-center">
              <img src={ReluLogo} alt="Relu Logo" className="w-12 h-12" />
              <span className="text-white ml-2 text-lg font-semibold">ReLU Art</span>
            </Link>
            <p className="mt-2 text-gray-300">Discover creativity at its best.</p>
            <p className="mt-2 font-semibold">Create Your Own DESIGN From Here</p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-semibold mb-4">Connect</h4>
            <div className="flex justify-center sm:justify-start lg:justify-end space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-300 transition duration-300"
              >
                <FaTiktok className="w-8 h-8" />
              </a>
              <a
                href="#"
                className="text-white hover:text-purple-300 transition duration-300"
              >
                <FaInstagram className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
