import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function SliderHedar() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="grid grid-cols-12 mt-5 mb-10">
        <div className=" col-span-8">
          <Slider {...settings}>
            <div>
              <img src={img1} className="w-full h-139.5" />
            </div>
            <div>
              <img src={img2} className="w-full h-139.5" />
            </div>
            <div>
              <img src={img3} className="w-full h-139.5" />
            </div>
          </Slider>
        </div>
        <div className=" col-span-4">
          <img src={img1} className="w-full" />
          <img src={img2} className="w-full" />
        </div>
      </div>
    </>
  );
}
