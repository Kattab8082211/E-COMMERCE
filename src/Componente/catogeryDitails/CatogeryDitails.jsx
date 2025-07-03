import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loding/Loading";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { HeartHandshake } from "lucide-react";
import { CartContext } from "../../Context/CartContextProvider";
export default function CatogeryDitails() {
  let { addProtuctToCart } = useContext(CartContext);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getProductsByCategory() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
      );
      setProducts(data.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(products);

  useEffect(() => {
    getProductsByCategory();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center font-bold text-green-600">
        Products in Category
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found for this category.
        </p>
      ) : (
        <>
          <div className=" gap-3  m-2  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {products.map((product) => (
              <div
                className=" relative group overflow-hidden shadow-xl p-2"
                key={product._id}
              >
                <div className="relative group/card hover:opacity-100">
                  <img
                    className="mt-2"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <div className="flex items-center justify-center gap-3 layer bg-gray-500/30 absolute top-0 right-0 left-0 bottom-0 opacity-0 group-hover/card:opacity-100 transition-all">
                    <Link
                      to={`/ProdectDetials/${product._id}/${product.category.name}`}
                    >
                      <Eye className="bg-green-400 text-white w-10 h-10 rounded-full p-2 hover:text-green-400 hover:bg-white transition-all cursor-pointer " />
                    </Link>
                    <button onClick={() => addProtuctToCart(product._id)}>
                      <ShoppingCart className="bg-green-400 text-white w-10 h-10 rounded-full p-2  hover:text-green-400 hover:bg-white transition-all cursor-pointer" />
                    </button>
                    <HeartHandshake className="bg-green-400 text-white w-10 h-10 rounded-full p-2  hover:text-green-400 hover:bg-white transition-all cursor-pointer" />
                  </div>
                </div>
                <h3 className="text-sm text-green-400">
                  {product.category.name}
                </h3>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
                <div className="flex justify-between">
                  {product.priceAfterDiscount ? (
                    <>
                      <h3 className="text-red-500 line-through">
                        {product.price} EGP
                      </h3>
                      <h3>{product.priceAfterDiscount} EGP</h3>
                    </>
                  ) : (
                    <h3>{product.price} EGP</h3>
                  )}

                  <span>
                    <i className="  fa-solid fa-star text-yellow-100"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <div className="absolute top-0 right-0">
                  {product.priceAfterDiscount ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      sale
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
