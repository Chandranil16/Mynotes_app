import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import  { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
