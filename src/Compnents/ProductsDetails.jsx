
import i1 from '../Data/ExampleImages/(50 x 70 cm)_page-0001.jpg'


const product = {
  name: '50 X 50 CM',
  price: '192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
  ],
  images: [
    {
      src: i1,
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    
  ],

  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  
}


// ...

const ProductDetails = () => {
    return (
        <div className="bg-gray-100">
            <div className="pt-6">
                {/* Main content grid */}
                <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    {/* Image (for small screens) */}
                    <div className="lg:hidden p-5">
                        <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                className="w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Price and Add to Bag section */}
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 p-5 lg:p-0">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>

                        {/* Price section */}
                        <div className="mt-2">
                            <p className="text-xl tracking-tight text-gray-900">{product.price}</p>
                        </div>

                        {/* Add to Bag form */}
                        <form className="mt-4 ">
                            {/* Order details fields */}
                            <div className="grid grid-cols-1 gap-4 mt-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="border p-2 rounded-md w-full"
                                placeholder="Your Name"
                                required
                            />

                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                pattern="[0-9]{11}"
                                title="Please enter a valid 11-digit Egyptian phone number"
                                className="border p-2 rounded-md w-full"
                                placeholder="Your Phone Number"
                                required
                            />

                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows="3"
                                className="border p-2 rounded-md w-full"
                                placeholder="Your Address"
                                required
                            ></textarea>
                            </div>

                            {/* Submit order button */}
                            <button
                                type="submit"
                                className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Image (for large screens) */}
                    <div className="hidden lg:block lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Description and details */}
                    <div className="py-6 lg:col-span-3 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 p-5 lg:p-0">
                        <h3 className="text-xl font-semibold text-gray-900">Description</h3>
                        <p className="text-base text-gray-800">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

  
