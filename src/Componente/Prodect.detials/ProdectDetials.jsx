import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loading from "../Loding/Loading";
import { CartContext } from "../../Context/CartContextProvider";
import { Eye } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { HeartHandshake } from "lucide-react";

export default function ProdectDetials() {
  let { addProtuctToCart } = useContext(CartContext);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // عشان تضيف الأسهم
    adaptiveHeight: true, // مفيد لو الصور بأحجام مختلفة
  };
  const [product, setProduct] = useState(null);
  const [relatedProdect, setrelatedProdect] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  let { id, category } = useParams();
  async function getProdect(id) {
    setIsLoding(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    console.log(data);
    setProduct(data.data);
    setIsLoding(false);
  }
  async function getProdectCategory() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    let newData = data.data.filter((prodect) => {
      return prodect.category.name == category;
    });

    setrelatedProdect(newData);
  }
  useEffect(() => {
    getProdect(id);
    getProdectCategory(category);
  }, [id]);
  if (isLoding || !product) {
    return <Loading />;
  }
  return (
    <>
<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center pt-7">
  {/* Slider section */}
  <div className="w-85 max-w-2xl mx-auto">
    <Slider {...settings} className="w-full mx-auto">
      {product?.images.map((src, index) => (
        <img key={index} src={src} alt={`Product image ${index}`} className="w-full h-64 object-cover rounded-lg" />
      ))}
    </Slider>
  </div>

  {/* Product details */}
  <div className="px-4 md:px-0">
    <h2 className="mb-3 text-xl font-semibold">{product.title}</h2>
    <h3 className="mb-3 text-gray-500">{product.description}</h3>
    <h3 className="mb-3 font-medium">{product.category.name}</h3>

    <div className="flex justify-between mb-3">
      {product.priceAfterDiscount ? (
        <>
          <h3 className="text-red-500 line-through">{product.price} EGP</h3>
          <h3 className="text-green-600 font-bold">{product.priceAfterDiscount} EGP</h3>
        </>
      ) : (
        <h3 className="text-green-600 font-bold">{product.price} EGP</h3>
      )}

      <span className="flex items-center gap-1 text-yellow-500 font-medium">
        <i className="fa-solid fa-star"></i>
        {product.ratingsAverage}
      </span>
    </div>

    <button
      onClick={() => addProtuctToCart(product._id)}
      className="duration-200 mt-5 w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 hover:from-teal-400 hover:to-lime-400 focus:ring-4 focus:outline-none focus:ring-lime-200"
    >
      <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-200 bg-white rounded-md group-hover:bg-transparent">
        Add To Cart
      </span>
    </button>
  </div>
</div>

      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-10 text-center text-green-500">
        Related Product
      </h3>
      <div className=" gap-3  m-2 mt-5  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {relatedProdect?.map((prodect) => (
          <div
            className=" relative group overflow-hidden shadow-xl p-2 mt-5"
            key={prodect._id}
          >
            <div className="relative group/card hover:opacity-100">
              <img
                className="mt-2"
                src={prodect.imageCover}
                alt={prodect.title}
              />
              <div className="flex items-center justify-center gap-3 layer bg-gray-500/30 absolute top-0 right-0 left-0 bottom-0 opacity-0 group-hover/card:opacity-100 transition-all">
                <Link
                  to={`/ProdectDetials/${prodect._id}/${prodect.category.name}`}
                >
                  <Eye className="bg-green-400 text-white w-10 h-10 rounded-full p-2 hover:text-green-400 hover:bg-white transition-all cursor-pointer " />
                </Link>
                <button onClick={() => addProtuctToCart(prodect._id)}>
                  <ShoppingCart className="bg-green-400 text-white w-10 h-10 rounded-full p-2  hover:text-green-400 hover:bg-white transition-all cursor-pointer" />
                </button>
                <HeartHandshake className="bg-green-400 text-white w-10 h-10 rounded-full p-2  hover:text-green-400 hover:bg-white transition-all cursor-pointer" />
              </div>
            </div>
            <h3 className="text-sm text-green-400">{prodect.category.name}</h3>
            <h2>{prodect.title.split(" ", 2).join(" ")}</h2>
            <div className="flex justify-between">
              {prodect.priceAfterDiscount ? (
                <>
                  <h3 className="text-red-500 line-through">
                    {prodect.price} EGP
                  </h3>
                  <h3>{prodect.priceAfterDiscount} EGP</h3>
                </>
              ) : (
                <h3>{prodect.price} EGP</h3>
              )}

              <span>
                <i className="  fa-solid fa-star text-yellow-100"></i>
                {prodect.ratingsAverage}
              </span>
            </div>
            <div className="absolute top-0 right-0">
              {prodect.priceAfterDiscount ? (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                  sale
                </span>
              ) : null}
            </div>

            <button
              onClick={() => addProtuctToCart(prodect._id)}
              className="  duration-200 mt-3 w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            >
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Add To Cart
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
