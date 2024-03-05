
import './App.css';
import Home from '../src/Pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Pages/Products';
import Order from './Pages/Order';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/products" element={<Products />} />  
        <Route path="/order" element={<Order />} />  
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
