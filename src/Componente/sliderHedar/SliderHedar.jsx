import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function SliderHedar() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5 mb-10">
      {/* Slider section - دايمًا ظاهر */}
      <div className="md:col-span-8 w-85 mx-auto">
        <Slider {...settings}>
          <div>
            <img src={img1} className="w-full h-60 md:h-[35rem] object-cover rounded-lg" alt="Slide 1" />
          </div>
          <div>
            <img src={img2} className="w-full h-60 md:h-[35rem] object-cover rounded-lg" alt="Slide 2" />
          </div>
          <div>
            <img src={img3} className="w-full h-60 md:h-[35rem] object-cover rounded-lg" alt="Slide 3" />
          </div>
        </Slider>
      </div>

      {/* Side images - تظهر فقط من md */}
      <div className="hidden md:block md:col-span-4 space-y-4">
        <img src={img1} className="w-full h-40 object-cover rounded-lg" alt="Side 1" />
        <img src={img2} className="w-full h-40 object-cover rounded-lg" alt="Side 2" />
      </div>
    </div>
  );
}
