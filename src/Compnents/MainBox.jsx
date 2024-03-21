import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { GetSizes } from '../gql/Query';
export default function MainBox() {
  const {loading,error,data} = useQuery(GetSizes)
  return (
    <div className="h-[550px] lg:h-[400px] w-full relative overflow-hidden bg-gray-200 p-8">
      <ul className="flex justify-around items-center h-full flex-wrap">
        {loading && <p>Loading...</p>}
        {error && <p>Error {console.error(error)}</p>}
        {
          data && 
          data.sizesFeed.map((item , index)=>(
            <Link to={`/products/${item.id}`} key={item.id} >
              <li className=" m-2 p-4 sm:p-6 lg:p-8 text-black bg-opacity-80 bg-white backdrop-blur-mg backdrop-filter rounded-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:grayscale-0 hover:bg-black hover:text-white">
                <span className="text-xl lg:text-2xl barbra">{item.width} * {item.height} CM</span>
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  );
}
