import React from "react"
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'

import Front from "./pages/Front"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from "./pages/Home"
import Addbook from "./pages/Addbook"
import Viewbooks from "./pages/Viewbooks"
import Viewbook from "./pages/Viewbook"
import EditBook from "./pages/EditBook"
import Viewprofile from "./pages/Viewprofile"
import Editprofile from "./pages/Editprofile"



function App() {

  return (
    <>

     <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Navigate to = "/front"/>}/>   
        <Route path='/front' element={<Front/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/addbook" element={<Addbook/>}/>
        <Route path="/viewallbooks" element={<Viewbooks/>}/>
        <Route path='/updatebook' element={<EditBook/>}/>
        <Route path="/viewbook/:bookid" element={<Viewbook />} /> 
        <Route path="/viewprofile" element={<Viewprofile/>}/>
        <Route path='/editprofile' element={<Editprofile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
