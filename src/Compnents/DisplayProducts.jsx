import { Link } from 'react-router-dom';
import i1 from '../Data/ExampleImages/null-1.jpg';
import i2 from '../Data/ExampleImages/null-2.jpg';
import i3 from '../Data/ExampleImages/null-3.jpg';
import i4 from '../Data/ExampleImages/null-4.jpg';

const products = [
  {
    id: 1,
    name: '50 X 50 CM',
    href: '#',
    price: '48',
    imageSrc: i1,
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: '50 X 50 CM',
    href: '#',
    price: '35',
    imageSrc: i2,
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: '50 X 50 CM',
    href: '#',
    price: '89',
    imageSrc: i3,
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: '50 X 50 CM',
    href: '#',
    price: '35',
    imageSrc: i4,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
];

export default function DisplayProducts() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to="/order" className="group relative overflow-hidden">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-300 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out transform scale-100 group-hover:scale-110 hover:shadow-lg"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-800">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-700">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
