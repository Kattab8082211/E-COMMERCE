import React, { useState } from "react";
import img11 from "../../assets/poert1.png";
import img12 from "../../assets/port2.png";
import img13 from "../../assets/port3.png";
import ChildComponent from "./chiled";
let imgArr = [
  {
    src: img11,
  },
  {
    src: img12,
  },
  {
    src: img13,
  },
  {
    src: img11,
  },
  {
    src: img12,
  },
  {
    src: img13,
  }
];

export default function Prodect() {
  return (
    <>
      <div className="  bg-color-prodect   pt-5 ">
        <div className="text-cente container">
          <div className="pt-5 mb-4">
            <h2 className="text-center text-uppercase fs-1 fw-bolder">
              portfolio component
            </h2>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <div className="line-prodect mr-home"></div>
              <i
                className="fa-solid fa-star fa-lg"
                style={{ color: "#130f0f" }}
              />
              <div className="line-prodect ml-home"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center ">
            {imgArr.map((imgArr, index) => (
              <ChildComponent key={index} src={imgArr.src} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
