import React, { useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import Loading from "../Loding/Loading";
import { Link } from "react-router-dom";

export default function Cards() {
  let {
    clearData,
    updetItem,
    removeProdect,
    isLodaing,
    cartDetails,
    numberOfCart,
    getCart,
  } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {isLodaing ? (
        <Loading />
      ) : (
        <div className="mt-36 mb-10 px-2 sm:px-4">
          <h2 className="text-2xl mb-4 text-center font-bold">Your Cart</h2>

          {/*  Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {cartDetails?.data?.products.map((prodect) => (
              <div
                key={prodect._id}
                className="bg-white shadow rounded-lg p-4 flex flex-col space-y-3"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={prodect.product.imageCover}
                    alt={prodect.product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {prodect.product.title}
                    </h3>
                    <p className="text-green-600 font-medium">
                      {prodect.price} EGP
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updetItem(prodect.product._id, prodect.count - 1)
                      }
                      className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-3">{prodect.count}</span>
                    <button
                      onClick={() =>
                        updetItem(prodect.product._id, prodect.count + 1)
                      }
                      className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeProdect(prodect.product._id)}
                    className="text-red-600 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/*  Desktop Table */}
          <div className="hidden md:block relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.data?.products.map((prodect) => (
                  <tr
                    key={prodect._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={prodect.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={prodect.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {prodect.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updetItem(prodect.product._id, prodect.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                          type="button"
                        >
                          -
                        </button>
                        <span>{prodect.count}</span>
                        <button
                          onClick={() =>
                            updetItem(prodect.product._id, prodect.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {prodect.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeProdect(prodect.product._id)}
                        className="cursor-pointer font-medium text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 m-6">
            <div className="flex flex-col items-start space-y-2">
              <h2 className="text-base md:text-lg">
                Number of items:{" "}
                <span className="text-green-600 font-semibold">
                  {numberOfCart?.numOfCartItems}
                </span>
              </h2>
              <h2 className="text-base md:text-lg">
                Total Price:{" "}
                <span className="text-green-600 font-semibold">
                  {numberOfCart?.data?.totalCartPrice} EGP
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={clearData}
                className="px-5 py-2.5 rounded-lg text-white bg-red-700 hover:bg-red-800"
              >
                Clear Cart
              </button>
              <Link to="/Payment">
                <button className="px-5 py-2.5 rounded-lg text-white bg-blue-700 hover:bg-blue-800">
                  Cash Payment
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
