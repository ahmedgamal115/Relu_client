import { Link } from 'react-router-dom';

export default function DisplayProducts({ loading, error, data }) {
  
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        
          {loading && <p>Loading...</p>}
          {error && <p>Error{console.error(error)}</p>}
          {
            data &&
              data.length !== 0 ?
                data.map((product,idx) => (
                  idx < 4 ?
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <Link to={`/order/${product.id}`} key={idx} className="group relative overflow-hidden">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={product.image[0]}
                          alt={`Product`}
                          className="h-[350px] w-full object-cover object-center 
                          transition-transform duration-500 ease-in-out transform 
                          scale-150 group-hover:scale-100 hover:shadow-lg"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-800">{product.productSize.width} X {product.productSize.height} CM</h3>
                      <p className="mt-1 text-lg font-medium text-gray-700">{product.price} EGP</p>
                    </Link>
                  </div>
                  :''
                ))
              :
              data &&
                <>
                  <p className='font-bold text-4xl w-full flex justify-center items-center h-[400px]'> Designs not avaliable</p>
                </>            
              }
        </div>
    </div>
  );
}
