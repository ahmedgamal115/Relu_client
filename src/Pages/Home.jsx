
import AboutRelu from '../Compnents/AboutRelu';
import Footer from '../Compnents/Footer';
import DisplayProducts from '../Compnents/DisplayProducts';
import MainBox from '../Compnents/MainBox';
import Navbar from '../Compnents/Navbar';

function Home() {
  return (
    <div>
      <Navbar/>
      <MainBox/>
      <AboutRelu/>
      <DisplayProducts/>
      <Footer/>
    </div>
  );
}

export default Home;
