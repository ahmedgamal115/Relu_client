
import { PhotoIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';

export default function CustomDetails() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12 p-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Create your own design</h2>
        <p className="mt-1 text-sm leading-6 text-red-900 py-5">
          Choose an image to be your frame with your custom height and width
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              {imagePreview ? (
                <div className="rounded-full overflow-hidden w-24 h-24">
                  <img src={imagePreview} alt="Uploaded" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12 p-5">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
            <label htmlFor="width" className="block text-sm font-medium leading-6 text-gray-900">
              Width
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="width"
                id="width"
                placeholder='Width in CM'
              
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
              Height
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="height"
                id="height"
                placeholder='Height in CM'
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
              Full name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="full-name"
                id="full-name"
                autoComplete="given-name"
                placeholder='Your full name please'
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
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
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                placeholder='Available at cairo for now'
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6 p-10">
      <button
        type="submit"
        className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit the order
      </button>
    </div>
  </form>
  );
}
