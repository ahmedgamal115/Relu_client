import React from 'react'
import {Link} from 'react-router-dom';
import Relu from '../Data/Logo/Relu.png';
import Custom from '../Data/Icons/graphic-design.png'
export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-100 p-1">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to='/' className="flex items-center">
            <img src={Relu} alt="Relu Logo" width={64} height={64} />
            <span className="text-white ml-2 font-quicksand text-lg">ReLU Art</span>
          </Link>
          <Link to='/customOrder'>
            <div className='flex items-center justify-center p-1'>
              <p className='hidden lg:flex text-black   romanesco-regular font-bold  text-lg'>Create your own design </p>
              <img src={Custom} alt='' className='flex lg:hidden w-12 h-12'></img>
            </div>
          </Link>
          <div className=' items-center justify-center p-1'>
            <p className='text-black font-semibold romanesco-regular'>your Art , our Frame </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
