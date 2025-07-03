import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { HeartHandshake } from "lucide-react";
import Loading from "../Loding/Loading";
import { CartContext } from "../../Context/CartContextProvider";
import { WishlistContext } from "../../Context/WishlistContextProvider";

export default function DispalyProdect() {
  let { addProtuctToCart } = useContext(CartContext);
  let { addProductToWishlist } = useContext(WishlistContext);
  const [prodect, setProdect] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ← حالة البحث
  async function getProdect() {
    setIsLoding(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    let prodect = data.data;
    setProdect(data.data);
    setIsLoding(false);
    console.log(prodect);
  }
  useEffect(() => {
    getProdect();
  }, []);
  if (isLoding) {
    return <Loading />;
  }
  const filteredProducts =
    prodect?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  return (
    <>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="search"
          className="m-5 p-2 border border-gray-300 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className=" gap-3  m-2  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts?.map((prodect) => (
          <div
            className=" relative group overflow-hidden shadow-xl p-2"
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
                <button onClick={() => addProductToWishlist(prodect._id)}>
  <HeartHandshake className="bg-green-400 text-white w-10 h-10 rounded-full p-2 hover:text-green-400 hover:bg-white transition-all cursor-pointer" />
</button>

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
