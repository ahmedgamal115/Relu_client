import React from 'react';
import { Link } from 'react-router-dom';
const products =[
  {
    size : '50 X 70 CM',
    desc : 'Elegant Dimensions'
  },
  {
    size : '50 X 50 CM',
    desc : 'Square Beauty'
  },
  {
    size : '45 X 60 CM',
    desc : 'Artistic Proportions'
  },
  {
    size : '30 X 40 CM',
    desc : 'Harmony in Dimensions'
  },
  {
    size : '16 X 26 CM',
    desc : 'Compact Elegance'
  },
]
export default function MainBox() {
  return (
    <div className="h-[550px] lg:h-[400px] w-full relative overflow-hidden bg-gray-200 p-8">
      <ul className="flex justify-around items-center h-full flex-wrap">
        {
          products.map((item , index)=>(
            <Link to='/products' >
              <li className="custom-border m-2 p-4 sm:p-6 lg:p-8 text-gray-800 bg-opacity-80 bg-white backdrop-blur-md backdrop-filter rounded-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:grayscale-0 hover:bg-gray-500 hover:text-gray-200">
                <span className="text-xl lg:text-2xl font-bold">{item.size}</span>
                <p className="text-sm">{item.desc}</p>
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  );
}
