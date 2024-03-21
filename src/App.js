import './App.css';
import Home from '../src/Pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './Pages/Products';
import Order from './Pages/Order';
import CustomOrder from './Pages/CustomOrder';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

function App() {
  const uri = process.env.REACT_APP_API_URL
  const client = new ApolloClient({
    link: createUploadLink({
      uri: uri,
    }),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/products/:id" element={<Products />} />  
            <Route path="/order/:productId" element={<Order />} />  
            <Route path="/customOrder" element={<CustomOrder />} />  
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
