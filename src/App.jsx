
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Products from './components/Products';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Thankyou from './components/Thankyou';
import OrderHistory from './components/OrderHistory';
import Contact from './components/Contact';
import CancellationAndRefund from './components/Cancellation';
import TermsAndConditions from './components/TC';
import ShippingAndDelivery from './components/ShippingDelivery';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutUs from './components/AboutUs';
function App() {

  return (
    <>
    <Provider store={appStore} >
      <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element ={<Body/>}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} /> 
          <Route path ="/register" element={<Register />} />
          <Route path="/product/:sku" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element= {<Checkout />}/>
          <Route path="/thankyou" element = {<Thankyou />}/>
          <Route path="/orders-history" element = {<OrderHistory />} />
          <Route path="/contactus" element = {<Contact/>} />
          <Route path="/cancel-refund" element = {<CancellationAndRefund/>} />
          <Route path="/shipping" element = {<ShippingAndDelivery/>} />
          <Route path="/terms" element ={<TermsAndConditions/>} />
          <Route path="/privacy" element ={<PrivacyPolicy/>} />
          <Route path="/aboutus" element = {<AboutUs/>} />
        </Route>
      </Routes>
      
      </BrowserRouter>    
    </Provider>
    </>
  )
}

export default App
