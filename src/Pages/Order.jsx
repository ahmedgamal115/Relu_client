import { useParams } from "react-router-dom";
import Footer from "../Compnents/Footer";
import Navbar from "../Compnents/Navbar";
import ProductsDetails from "../Compnents/ProductsDetails";
import { useQuery } from "@apollo/client";
import { GetProductsById } from "../gql/Query";
import { useEffect } from "react";

function Order() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const params = useParams()
  const { loading, error, data } = useQuery(GetProductsById,{
    variables: {
      "productId": params.productId
    }
  })
    return (
      <div className="">
        <Navbar/>
        <ProductsDetails loading={loading} error={error} data={data && data.product} productId={params.productId}/>
        <Footer/>
      </div>
    );
  }
  
  export default Order;
  