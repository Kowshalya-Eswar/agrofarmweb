import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Profile from './components/profile';
import Login from './components/login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={appStore} >
      <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element ={<Body/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" elememt={<Profile />} />
        </Route>
      </Routes>
      
      </BrowserRouter>    
    </Provider>
    </>
  )
}

export default App
