import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CheckPromoCode } from "../gql/Query";
import { Alert } from "@mui/material";
import { MakeStanderOrder } from "../gql/Mutation";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";



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
    const [fullSizeImage,setFullSizeImage] = useState(false)
    const [fullSizeImageUrl,setFullSizeImageUrl] = useState(null)


    const promoData = useQuery(CheckPromoCode,
        {variables:{code:promoCode}})
    
    const [makeStanderOrder] = useMutation(MakeStanderOrder,{
        onCompleted:()=>{
            navigate('/',{
                state: { msg: "تم استلام الطلب وسوف يتم التواصل معك في اقرب وقت" }
            })
        }
    })

    useEffect(()=>{
        if(promoData.data){
            setPromoCodeIsExpired(promoData.data.checkPromocode.expired)
            setPromoCodeId(promoData.data.checkPromocode.id)
            if(promoData.data.checkPromocode.discount){
                setPromoCodeDiscount(promoData.data.checkPromocode.discount)
            }else{
                setPromoCodeDiscount(promoData.data.checkPromocode.amount)
            }
        }else{
            setPromoCodeDiscount(null)
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
        <div>
            <div className="pt-6">
                {/* Main content grid */}
                <div className="relative mx-auto max-w-2xl sm:px-6 lg:mb-8 lg:grid lg:max-w-7xl lg:grid-cols-5 lg:gap-x-8 lg:px-8">
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
                                        shadow-cardShadow mb-8 bg-transparent cursor-pointer"
                                        onClick={()=>{
                                            setFullSizeImage(true)
                                            setFullSizeImageUrl(data.image[imageIndex])
                                        }}
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
                                                ${idx === imageIndex ? "border-2 border-primary border-solid": "border-none"}`}
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
                    <div className="lg:col-span-3 lg:border-r lg:border-gray-200 lg:pr-8 p-5 lg:p-0">
                        {
                            loading && <p>Loading...</p>
                        }
                        {
                            error && <p>Error! {console.log(error)}</p>
                        }
                        {
                            data 
                            &&
                            <h1 className="text-2xl  tracking-tight text-black sm:text-2xl barbra">{data.productSize.width} * {data.productSize.height} CM</h1>

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
                                    <p className={`text-xl tracking-tight text-black cosmic ${promoCodeDiscount? 'line-through' : 'no-underline'} `}>{data.price} EGP</p>
                            }
                            {
                                promoCodeDiscount ?
                                    promoData.data && promoData.data.checkPromocode.discount ?
                                        <p className="text-xl tracking-tight text-gray-900">{parseFloat(data.price) - (parseFloat(data.price) * (parseFloat(promoCodeDiscount)/100))} EGP</p>
                                    :
                                        <p className="text-xl tracking-tight text-gray-900">{parseFloat(data.price) - parseFloat(promoCodeDiscount)} EGP</p>
                                :<></>
                            }
                        </div>


                            
                        {/* Add to Bag form */}
                        <form className="mt-4" onSubmit={(e)=>{
                            handleSubmitData(e)
                        }}>
                            {/* Order details fields */}
                            <div className="grid grid-cols-1  gap-4 mt-4">
                            <label htmlFor="name" className="block text-sm text-black barbra">
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

                            <label htmlFor="phone" className="block text-sm text-black barbra">
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
                            <label htmlFor="phone" className="block text-sm text-black barbra">
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
                            <label htmlFor="amount" className="block text-sm text-black barbra">
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
                            <label htmlFor="promo-code" className="block text-sm text-black barbra">
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
                                <span className="ml-2 text-black barbra">Redeem</span>
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
                            <label htmlFor="address" className="block text-sm text-black barbra">
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
                                className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 barbra"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Image (for large screens) */}
                    <div className="hidden lg:block lg:col-span-2 lg:border-r lg:border-gray-200  lg:w-full">

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
                                        shadow-cardShadow mb-8 bg-transparent cursor-pointer"
                                        onClick={()=>{
                                            setFullSizeImage(true)
                                            setFullSizeImageUrl(data.image[imageIndex])
                                        }}
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
                                                ${idx === imageIndex ? "border-2 border-primary border-solid": "border-none"}`}
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
                    {
                        fullSizeImage ? 
                            <div className="fixed top-0 left-0 w-full h-screen bg-layout">
                                <div className="fixed top-0 right-0 w-[50px] h-[50px] bg-black rounded-full">
                                    <XCircleIcon className="text-lg text-white cursor-pointer"
                                    onClick={()=>{setFullSizeImage(false)}}/>
                                </div>
                                <div className="absolute top-[50%] left-[50%]
                                translate-x-[-50%] translate-y-[-50%]
                                w-[80%] h-[80%] overflow-hidden rounded-xl z-50">
                                    <img 
                                    src={fullSizeImageUrl} 
                                    alt="full size" 
                                    className="object-contain"/>
                                </div>
                            </div> 
                        :""
                    }

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

  
