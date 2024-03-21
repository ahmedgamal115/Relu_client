import React from 'react';
import { Link } from 'react-router-dom';
import ReluLogo from '../Data/Logo/Relu.png';
import { FaTiktok, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-1">
      <div className="container mx-auto">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex justify-center text-center sm:text-center mb-8"> 
            <Link to="/" className="flex items-center">
              <img src={ReluLogo} alt="Relu Logo" className="w-12 h-12" />
              <span className="text-white ml-2 text-lg font-semibold font-quicksand">ReLU Art</span>
            </Link>
            
          </div>
          <div className='flex justify-center'>
            <p className="mt-2 font-semibold romanesco-regular text-white">your Art , our Frame</p>
            <br />
            
          </div>
          <div className='flex justify-center'>
            <Link to='/customOrder'>
              <p className="mt-2 font-semibold romanesco-regular text-white hover:text-gray-300">Create Your Own DESIGN From Here</p>
            </Link>
          </div>
          
          
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-semibold mb-4 font-quicksand">Follow ReLU Art </h4>
            <div className="flex justify-center sm:justify-start  space-x-4">
              <a
                href="https://www.tiktok.com/@reluart.eg"
                className="text-white transition"
                target='_blank' rel="noreferrer"
              >
                <FaTiktok className="w-8 h-8 hover:text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/reluart.eg/"
                className="text-white transition"
                target='_blank' rel="noreferrer"
              >
                <FaInstagram className="w-8 h-8 hover:text-gray-400" />
              </a>

            </div>
            <p className='p-2'>علشان نكمل الرحلة سوا</p>

          </div>
        </div>
        <div className='flex justify-center items-center'>
            <a href="https://webx-crafters.vercel.app/" className="flex items-center justify-center p-2">
              <span className="uppercase">Created by -</span> 
              <span className="px-1">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">W</span>ebX-Crafters
              </span> 
            </a>
          </div>
      </div>
    </footer>
  );
}
