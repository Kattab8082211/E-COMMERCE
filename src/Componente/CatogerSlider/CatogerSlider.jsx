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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider className="grid grid-cols-1 w-85 mx-auto  md:grid-cols-12 gap-4 mt-5 mb-10" {...settings}>
        {categories?.map((category) => (
          <div className="md:col-span-8 mx-auto" key={category._id}>
            <img src={category.image} className="w-full h-64 object-cover" />
          </div>
        ))}
      </Slider>
    </>
  );
}
