import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function SliderHedar() {
  const settingsMobile = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
  };

  const settingsDesktop = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* موبايل - تصميم خاص */}
      <div className="block md:hidden w-85 mx-auto mt-5 mb-10">
        <Slider {...settingsMobile}>
          <div>
            <img src={img1} className="w-full h-60 object-cover rounded-lg" alt="Mobile Slide 1" />
          </div>
          <div>
            <img src={img2} className="w-full h-60 object-cover rounded-lg" alt="Mobile Slide 2" />
          </div>
          <div>
            <img src={img3} className="w-full h-60 object-cover rounded-lg" alt="Mobile Slide 3" />
          </div>
        </Slider>
      </div>

      {/* ديسكتوب/تابلت - التصميم القديم اللي انت عامله */}
      <div className="hidden md:grid grid-cols-12 gap-4 mt-5 mb-10">
        {/* Slider section */}
        <div className="md:col-span-8 w-full mx-auto">
          <Slider {...settingsDesktop}>
            <div>
              <img src={img1} className="w-full h-[35rem] object-cover rounded-lg" alt="Desktop Slide 1" />
            </div>
            <div>
              <img src={img2} className="w-full h-[35rem] object-cover rounded-lg" alt="Desktop Slide 2" />
            </div>
            <div>
              <img src={img3} className="w-full h-[35rem] object-cover rounded-lg" alt="Desktop Slide 3" />
            </div>
          </Slider>
        </div>

        {/* Side images */}
        <div className="md:col-span-4 space-y-4">
          <img src={img1} className="w-full h-68 object-cover rounded-lg" alt="Side 1" />
          <img src={img2} className="w-full h-68 object-cover rounded-lg" alt="Side 2" />
        </div>
      </div>
    </>
  );
}
