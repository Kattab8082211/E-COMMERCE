import React, { useState } from "react";
import avatar from "../../assets/avataaars.svg";


export default function Home() {

  return (
    <>
    <div className=" bg-green-home d-flex justify-content-center align-items-center  pt-5 " >
      <div className="text-center">
      <img className="with-home-img"  src={avatar} ></img>
      <div className="pt-5 mb-4">
        <h2 className="text-center text-uppercase fs-1 fw-bolder">start Framework</h2>
        <div className="d-flex justify-content-around align-items-center mt-4">
          <div className="line-home mr-home"></div>
          <i className="fa-solid fa-star fa-lg" style={{color: '#ffffff'}} />
          <div className="line-home ml-home"></div>
        </div>
      </div>
      <div>
      Graphic Artist - Web Designer - Illustrator
      </div>
      </div>
    </div>
    </>
  );
}
