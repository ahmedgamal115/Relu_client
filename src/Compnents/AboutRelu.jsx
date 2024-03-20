import React from 'react';
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import ReluLogo from '../Data/Logo/Relu.png';

export default function AboutRelu() {
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row justify-center py-10">
        <div className="border p-4 lg:p-8 mb-4 lg:mb-0 lg:mr-8 flex-shrink-1">
          <h2 className="text-3xl p-2 font-semibold mb-4">About Relu</h2>
          <p className="text-gray-500 p-2 content">Welcome to ReLU Art!
            Founded by two visionaries, we're reinventing traditional frames into innovative pieces that resonate with the modern generation. 
            Our frames defy the ordinary, adding beauty and creativity to any space, sparking conversations and captivating the eye. Crafted with meticulous attention to detail, our frames blend sophistication and elegance, perfect for homes, offices, or galleries.
            At ReLU Art ~ your Art, our Frame ~ is more than a slogan – it's our commitment to reflecting your unique style and vision. Plus, all our materials are sourced from Egypt, meeting European standards for quality and excellence. 
            Join us in embracing the future of framing, where creativity knows no bounds, and beauty knows no limits.
          </p>
        </div>
        <div className="border p-4 lg:p-6 text-center relative lines-background">
          <div className="h-40 lg:h-60 w-40 lg:w-60 mx-auto mb-4 lg:mb-0 rounded-full z-20 bg-gray-100 opacity-90">
            <img src={ReluLogo} className="h-full w-full object-cover" alt="Relu Logo" />
          </div>
          <div className="bg-gray-100 opacity-90 rounded p-4">
            <p className="mb-2 text-gray-700">Follow us on:</p>
            <div className="flex justify-center space-x-4">
              <a href="www.tiktok.com/@reluart.eg" target='_blank' rel="noreferrer">
                <FaTiktok className="text-gray-500 w-12 h-12" /> 
              </a>
              <a href="https://www.instagram.com/reluart.eg/"  target='_blank' rel="noreferrer">
                <FaInstagram className="text-gray-500 w-12 h-12" /> 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
