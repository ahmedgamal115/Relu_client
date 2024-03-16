import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CheckPromoCode } from "../gql/Query";
import { Alert } from "@mui/material";
import { MakeStanderOrder } from "../gql/Mutation";
import { useNavigate } from "react-router-dom";


const ProductDetails = ({ loading, error, data, productId }) => {
    const navigate = useNavigate()

    const [values,setValues] = useState({"productOrder":productId,"amount":[1]})
    const [promo , setPromo ] = useState(false)
    const [promoCodeIsExpired , setPromoCodeIsExpired ] = useState(true)
    const [promoCode , setPromoCode ] = useState(null)
    const [promoCodeId , setPromoCodeId ] = useState(null)
    const [promoCodeDiscount , setPromoCodeDiscount ] = useState(null)
    const [activeErrorMsg,setActiveErrorMsg] = useState(false)
    const [imageIndex,setImageIndex] = useState(0)


    const promoData = useQuery(CheckPromoCode,
        {variables:{code:promoCode}})
    
    const [makeStanderOrder] = useMutation(MakeStanderOrder,{
        onCompleted:()=>{
            navigate('/',{state:{ msg: "Order done" }})
        }
    })

    useEffect(()=>{
        if(promoData.data){
            setPromoCodeIsExpired(promoData.data.checkPromocode.expired)
            setPromoCodeId(promoData.data.checkPromocode.id)
            setPromoCodeDiscount(promoData.data.checkPromocode.discount)
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
            setPromoCodeDiscount(null)
            return
        }
        let orderData = {
            "username": values.username,
            "phone": values.phone,
            "address": values.address,
            "amount": values.amount,
            "otherPhone": values.otherPhone,
            "productOrder": values.productOrder,
            "discountCode": promoCodeId,

        }
        makeStanderOrder({variables: orderData})
    }
    return (
        <div className="bg-gray-100">
            <div className="pt-6">
                {/* Main content grid */}
                <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    {/* Image (for small screens) */}
                    <div className="lg:hidden p-5">
                        {
                            loading && <p>Loading...</p>
                        }
                        {
                            error && <p>Error! {console.log(error)}</p>
                        }
                        {
                            data &&
                                <div className="aspect-h-4 aspect-w-3 p-3 overflow-hidden rounded-lg">
                                    <img
                                        src={data.image[imageIndex]}
                                        alt='Product wanted'
                                        className="h-[300px] w-[400px] object-cover rounded-xl
                                        shadow-cardShadow mb-8 bg-transparent"
                                    />
                                    {
                                        data.image[1] &&
                                        <div className="flex justify-start items-center gap-3">
                                        {
                                            data.image.map((imge,idx)=>(
                                                <img 
                                                src={imge} 
                                                alt='Product wanted'
                                                className={`h-[100px] w-[100px] object-cover rounded-xl 
                                                object-center shadow-cardShadow cursor-pointer
                                                ${idx === imageIndex ? "border-[4px] border-gray-500 border-dashed": "border-none"}`}
                                                onClick={()=>{
                                                    // imageIndex === 0 ?
                                                    //     setImageIndex(1)
                                                    // :
                                                    //     setImageIndex(0)
                                                    setImageIndex(idx)
                                                }} />
                                            ))
                                        }
                                        </div>
                                    }
                                </div>
                        }
                    </div>

                    {/* Price and Add to Bag section */}
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 p-5 lg:p-0">
                        {
                            loading && <p>Loading...</p>
                        }
                        {
                            error && <p>Error! {console.log(error)}</p>
                        }
                        {
                            data &&
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.productSize.width} X {data.productSize.height} CM</h1>

                        }
                        {/* Price section */}
                        <div className="mt-2">
                            {
                                loading && <p>Loading...</p>
                            }
                            {
                                error && <p>Error! {console.log(error)}</p>
                            }
                            {
                                data &&
                                    <p className={`text-xl tracking-tight text-gray-900 ${promoCodeDiscount? 'line-through' : 'no-underline'} `}>{data.price} EGP</p>
                            }
                            {
                                promoCodeDiscount ?
                                    <p className="text-xl tracking-tight text-gray-900">{parseFloat(data.price) - (parseFloat(data.price) * (parseFloat(promoCodeDiscount)/100))} EGP</p>
                                :<></>
                            }
                        </div>

                        {/* Add to Bag form */}
                        <form className="mt-4" onSubmit={(e)=>{
                            handleSubmitData(e)
                        }}>
                            {/* Order details fields */}
                            <div className="grid grid-cols-1 gap-4 mt-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Fullname
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="username"
                                className="border p-2 rounded-md w-full"
                                placeholder="Your Name"
                                required
                                onChange={(e)=>{
                                    setValues({...values,[e.target.name]:e.target.value})
                                }}
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
                                onChange={(e)=>{
                                    setValues({...values,[e.target.name]:e.target.value})
                                }}
                            />
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Another phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="otherPhone"
                                pattern="[0-9]{11}"
                                title="Please enter a valid 11-digit Egyptian phone number"
                                className="border p-2 rounded-md w-full"
                                placeholder="Your Phone Number"
                                onChange={(e)=>{
                                    setValues({...values,[e.target.name]:e.target.value})
                                }}
                            />
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                className="border p-2 rounded-md w-full"
                                placeholder="How much needed"
                                defaultValue={1}
                                onChange={(e)=>{
                                    setValues({...values,[e.target.name]:[parseFloat(e.target.value)]})
                                }}
                            />
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
                                            setPromoCodeDiscount(null)
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
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows="3"
                                className="border p-2 rounded-md w-full mb-4"
                                placeholder="Your Address"
                                required
                                onChange={(e)=>{
                                    setValues({...values,[e.target.name]:e.target.value})
                                }}
                            ></textarea>
                            </div>
                            {
                                activeErrorMsg && 
                                    <Alert severity="error"> Promo code expired</Alert>
                            }
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
                    <div className="hidden lg:block lg:col-span-1 lg:border-r lg:border-gray-200  lg:w-full">
                        {
                            loading && <p>Loading...</p>
                        }
                        {
                            error && <p>Error! {console.log(error)}</p>
                        }
                        {
                            data &&
                                <div className="aspect-h-4 p-3 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                                    <img
                                        src={data.image[imageIndex]}
                                        alt='Product wanted'
                                        className="h-[500px] w-[400px] object-cover rounded-xl
                                        shadow-cardShadow mb-8 bg-transparent"
                                    />
                                    {
                                        data.image[1] &&
                                        <div className="flex justify-start items-center gap-3">
                                        {
                                            data.image.map((imge,idx)=>(
                                                <img 
                                                src={imge} 
                                                alt='Product wanted'
                                                className={`h-[150px] w-[150px] object-cover rounded-xl 
                                                object-center shadow-cardShadow cursor-pointer
                                                ${idx === imageIndex ? "border-[4px] border-gray-500 border-dashed": "border-none"}`}
                                                onClick={()=>{
                                                    // imageIndex === 0 ?
                                                    //     setImageIndex(1)
                                                    // :
                                                    //     setImageIndex(0)
                                                    setImageIndex(idx)
                                                }} />
                                            ))
                                        }
                                        </div>
                                    }
                                </div>
                        }
                    </div>

                    {/* Description and details */}
                    <div className="py-6 lg:col-span-3 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 p-5 lg:p-0">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

  
