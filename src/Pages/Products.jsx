
import Footer from '../Compnents/Footer';
import DisplayProducts from '../Compnents/DisplayProducts';
import Navbar from '../Compnents/Navbar';
import { useQuery } from '@apollo/client';
import { GetProductsBySize } from '../gql/Query';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Products() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const params = useParams()
  const { loading, error, data } = useQuery(GetProductsBySize,{
    variables: {"productSize": params.id}
  })
  return (
    <div>
      <Navbar/>
      <DisplayProducts loading={loading} error={error} data={data && data.productBySize}/>
      <Footer/>
    </div>
  );
}

export default Products;
