
import './App.css'
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"

import Home from './Componente/Home/Home'
import Label from './Componente/LayOut/Lable'
import About from './Componente/About/About'
import Contact from './Componente/Contact/Contact'
import Prodect from './Componente/Prodectes/Prodect'

function App() {
  let router = createBrowserRouter([
    {path:"", element: <Label/> , children:[
      {index:true, element:<Home/>},
      {path:"about", element:<About/>},
      {path:"Prodect", element:<Prodect/>},
      {path:"contact", element:<Contact/>}
    ]}
  ])


  return (
    <>
    <RouterProvider router={router} />
  
    
    </>
  )
}

export default App
