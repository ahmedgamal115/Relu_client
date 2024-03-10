import React from 'react';
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import ReluLogo from '../Data/Logo/Relu.png';

export default function AboutRelu() {
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row justify-center py-10">
        <div className="border p-4 lg:p-8 mb-4 lg:mb-0 lg:mr-8 flex-shrink-0">
          <h2 className="text-3xl font-semibold mb-4">About Relu</h2>
          <p className="text-gray-700">Relu is a creative platform dedicated to...</p>
        </div>
        <div className="border p-4 lg:p-6 text-center relative lines-background">
          <div className="h-40 lg:h-60 w-40 lg:w-60 mx-auto mb-4 lg:mb-0 rounded-full z-20 bg-gray-100 opacity-90">
            <img src={ReluLogo} className="h-full w-full object-cover" alt="Relu Logo" />
          </div>
          <div className="bg-gray-100 opacity-90 rounded p-4">
            <p className="mb-2 text-gray-700">Follow us on:</p>
            <div className="flex justify-center space-x-4">
              <a href="#/" className="text-blue-500 hover:underline">
                <FaTiktok className="text-gray-500 w-12 h-12" /> 
              </a>
              <a href="#/" className="text-purple-500 hover:underline">
                <FaInstagram className="text-gray-500 w-12 h-12" /> 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
