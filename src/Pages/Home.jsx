
import AboutRelu from '../Compnents/AboutRelu';
import Footer from '../Compnents/Footer';
import DisplayProducts from '../Compnents/DisplayProducts';
import MainBox from '../Compnents/MainBox';
import Navbar from '../Compnents/Navbar';
import { useQuery } from '@apollo/client';
import { GetProducts } from '../gql/Query';

function Home() {
  const { loading, error, data } = useQuery(GetProducts)
  return (
    <div>
      <Navbar/>
      <MainBox/>
      <AboutRelu/>
      <DisplayProducts loading={loading} error={error} data={data && data.productsFeed}/>
      <Footer/>
    </div>
  );
}

export default Home;
