
import AboutRelu from '../Compnents/AboutRelu';
import Footer from '../Compnents/Footer';
import DisplayProducts from '../Compnents/DisplayProducts';
import MainBox from '../Compnents/MainBox';
import Navbar from '../Compnents/Navbar';
import { useQuery } from '@apollo/client';
import { GetProducts } from '../gql/Query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';

function Home() {
  const location = useLocation()
  const [showAlerte,setShowAlerte] = useState(false)
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  useEffect(()=>{
    if(location.state){
      setShowAlerte(true)
      setTimeout(() => {
        setShowAlerte(false)
      }, 10000)
    }else{
      setShowAlerte(false)
    }
      
  },[location.state])
  const { loading, error, data } = useQuery(GetProducts)
  return (
    <div className='relative'>
      <Navbar/>
      {
        showAlerte &&
          <Alert className='fixed top-0 left-0 w-full z-50 flex justify-center items-center' severity="success">
            <p className='text-black font-bold text-2xl'>{location.state.msg}</p> 
          </Alert>
      }
      <MainBox/>
      <AboutRelu/>
      <DisplayProducts loading={loading} error={error} data={data && data.productsFeed}/>
      <Footer/>
    </div>
  );
}

export default Home;
