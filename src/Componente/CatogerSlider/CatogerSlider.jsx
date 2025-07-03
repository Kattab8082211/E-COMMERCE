import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
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

  var settings = {
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
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id}>
            <img src={category.image} className="w-full h-64 object-cover" />
          </div>
        ))}
      </Slider>
    </>
  );
}
