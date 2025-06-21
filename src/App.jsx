import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Profile from './components/profile';
import Login from './components/login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Products from './components/Products';
import Register from './components/Register';
function App() {

  return (
    <>
    <Provider store={appStore} >
      <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element ={<Body/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" elememt={<Profile />} />
          <Route path="/products" element={<Products />} /> 
          <Route path ="/register" element={<Register />} />
        </Route>
      </Routes>
      
      </BrowserRouter>    
    </Provider>
    </>
  )
}

export default App
