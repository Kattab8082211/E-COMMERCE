import React from 'react'
import Navbar from '../../Nav'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import FooterUp from '../Footer/FooterUp'
export default function Lable() {
  return (
    <>
       <Navbar/>
       <Outlet/>
       <FooterUp/>
       <Footer/>
    </>
  )
}
