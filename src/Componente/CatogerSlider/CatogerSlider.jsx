import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

export default function CatogerSlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(data);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const phoneSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    arrows: true,
  };

  return (
    <>
      
      <div className=" p-4 block md:hidden">
      <Slider
        className=" w-[90%] mx-auto mt-5 mb-10"
        {...phoneSettings}
      >
        {categories?.map((category) => (
          <div key={category._id}>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-56 object-cover rounded shadow "
            />
          </div>
        ))}
      </Slider>

</div>
<div className=" p-4 hidden md:block">
<Slider
        className="hidden md:block container md:max-w-2xl lg:max-w-4xl xl:max-w-7xl 2xl:max-w-9xl mx-auto mt-5 mb-10"
        {...desktopSettings}
      >
        {categories?.map((category) => (
          <div key={category._id}>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover rounded shadow"
            />
          </div>
        ))}
      </Slider>
</div>
      
    </>
  );
}
