
import { useMutation, useQuery } from '@apollo/client';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CheckPromoCode } from '../gql/Query';
import { MakeCustomOrder } from '../gql/Mutation';
import { useNavigate } from 'react-router-dom';

export default function CustomDetails() {
  const navigate = useNavigate()
  const [images,setImages] =useState(null)
  const [values,setValues] =useState({"amount":[1]})
  const [promo , setPromo ] = useState(false)
  const [promoCodeIsExpired , setPromoCodeIsExpired ] = useState(true)
  const [promoCode , setPromoCode ] = useState(null)
  const [promoCodeId , setPromoCodeId ] = useState(null)
  const [activeErrorMsg,setActiveErrorMsg] = useState(false)

  const promoData = useQuery(CheckPromoCode,
    {variables:{code:promoCode}})

  const [makeCustomOrder] = useMutation(MakeCustomOrder,{
    onCompleted:()=>{
      navigate('/',{
        state: { msg: "Order Done" }
      })
    }
  })

  const handleFiles = (e) =>{
    let arr = []
    for (let index = 0; index < e.target.files.length; index++) {
      arr.push(e.target.files[index])
    }
    setImages(arr)
    setValues({...values,[e.target.name]: e.target.files[0]})
  }

  useEffect(()=>{
    if(promoData.data){
        setPromoCodeIsExpired(promoData.data.checkPromocode.expired)
        setPromoCodeId(promoData.data.checkPromocode.id)
    }
  },[promoData.data])
  useEffect(()=>{
      setTimeout(() => {
          setActiveErrorMsg(false)
      }, 2000);
  },[activeErrorMsg])

  const handleSubmitData = (e)=>{
    e.preventDefault()
    if(promoCode && promoCodeIsExpired){
      setActiveErrorMsg(true)
      return
    }
    let orderData = {
      "username": values.username,
      "phone": values.phone,
      "address": values.address,
      "amount": values.amount,
      "otherPhone": values.otherPhone,
      "discountCode": promoCodeId,
      "customeImage": values.customeImage,
      "customWidth": values.customWidth,
      "customHeight": values.customHeight
    }
    console.log(orderData)
    makeCustomOrder({variables: orderData})
  }

  return (
    <form onSubmit={(e)=>{
      handleSubmitData(e)
    }}>
    {
      activeErrorMsg && 
          <Alert severity="error"> Promo code expired</Alert>
    }
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12 p-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Create your own design</h2>
        <p className="mt-1 text-sm leading-6 text-red-900 py-5">
          Choose an image to be your frame with your custom height and width
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Product photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="customeImage" type="file" className="sr-only" 
                      accept=".png, .jpg, .jpeg" onChange={handleFiles}/>
                    </label>
                    {
                      !images ?
                        <p className="pl-1">or drag and drop</p>
                      :
                        <p className="pl-1">Data uploaded</p>
                    }
                  </div>
                    {
                      !images ?
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                      :
                        images.map((img,idx)=>(
                        <div key={idx} className='flex flex-wrap justify-center items-center'>
                          <p className="text-xs leading-5 text-gray-600">{img.name}</p>
                        </div>
                        ))
                    }
                </div>
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
                name="customWidth"
                id="width"
                placeholder='Width in CM'
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>{
                  setValues({...values,[e.target.name]: parseFloat(e.target.value)})
                }}
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
                name="customHeight"
                id="height"
                placeholder='Height in CM'
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>{
                  setValues({...values,[e.target.name]: parseFloat(e.target.value)})
                }}
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
                name="username"
                id="full-name"
                autoComplete="given-name"
                placeholder='Your full name please'
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>{
                  setValues({...values,[e.target.name]: e.target.value})
                }}
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
              onChange={(e)=>{
                setValues({...values,[e.target.name]: e.target.value})
              }}
          />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
            Another Phone Number
            </label>
            <div className="mt-2">
              <input
                type="tel"
                id="phone"
                name="otherPhone"
                pattern="[0-9]{11}"
                title="Please enter a valid 11-digit Egyptian phone number"
                className="border p-2 rounded-md w-full"
                placeholder="Your Phone Number"
                required
                onChange={(e)=>{
                  setValues({...values,[e.target.name]: e.target.value})
                }}
            />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Amount
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="amount"
                name="amount"
                className="border p-2 rounded-md w-full"
                placeholder="How much needed"
                defaultValue={1}
                onChange={(e)=>{
                  setValues({...values,[e.target.name]: [parseFloat(e.target.value)]})
                }}
            />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700">
                Apply promo-code
            </label>
            <div className="mt-2">
                <input
                    type="checkbox"
                    id="cash-on-delivery"
                    name="payment-method"
                    value="promo"
                    onChange={()=>{
                        setPromo(!promo)
                        setPromoCode(null)
                        if(promo){
                            setPromoCodeId(null)
                        }
                    }}
                    className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-900">Redeem</span>
            </div>
            {promo ? (
                <div >
                    <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700">
                        Your Promo 
                    </label>
                    <div className="mt-2">
                        <input
                            id="promo-code"
                            name="discountCode"
                            className="border p-2 rounded-md w-full"
                            onChange={(e)=>{
                                setPromoCode(e.target.value)
                            }}
                        />
                    </div>
                    {
                        promoCode &&
                            <>
                                {promoData.loading && <p>Loading...</p> }
                                {promoData.error && <p>Invalid Promo Code</p>}
                            </> 
                    }
                </div>
            ):''}
          </div>
          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                id="street-address"
                autoComplete="street-address"
                placeholder='Available at cairo for now'
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>{
                  setValues({...values,[e.target.name]: e.target.value})
                }}
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
