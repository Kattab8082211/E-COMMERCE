import React from "react";
import Navbar from "../../Nav";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import FooterUp from "../Footer/FooterUp";
export default function Lable() {
  return (
    <>
      <Navbar />
      <div className=" container sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl 2xl:max-w-9xl mx-auto mt-[90px]">
        <Outlet />
      </div>
      <FooterUp />
      <Footer />
    </>
  );
}
