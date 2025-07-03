import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cartID, setcartID] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  const [numberOfCart, setNumberOfCart] = useState(null);
  const [priceOfCart, setPriceOfCart] = useState(null);
  const [isLodaing, setisLodaing] = useState(false);
  let headers = { token: localStorage.getItem("token") };
  //add item from cart
  function addProtuctToCart(productId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((data) => {
        console.log(data.data.data);
        setCartDetails(data.data);
        toast(data.data.message);
      })
      .catch((data) => {
        toast(data.data.message);
      });
  }
  //puse item in the cart
  function getCart() {
    setisLodaing(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then(({ data }) => {
        console.log(data);
        setCartDetails(data);
        setNumberOfCart(data);
        setPriceOfCart(data);
        setcartID(data?.cartId);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setisLodaing(false);
      });
  }
  //delete item from cart
  function removeProdect(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((data) => {
        console.log(data);
        setCartDetails(data.data);
        setNumberOfCart(data.data);
        setPriceOfCart(data.data);
        toast("تم حذف المنتج من السلة بنجاح");
      })
      .catch((error) => {
        console.log("error");
        toast("حدث خطأ أثناء حذف المنتج");
      });
  }
  //updet the number of item
  function updetItem(id, count) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((data) => {
        console.log(data);
        setCartDetails(data.data);
        setNumberOfCart(data.data);
        setPriceOfCart(data.data);
        toast("تم حذف المنتج من السلة بنجاح");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //clear data from cart
  function clearData() {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((data) => {
        console.log(data);
        setCartDetails("");
        setNumberOfCart("");
        setPriceOfCart("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //component ded mounte
  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProtuctToCart,
        removeProdect,
        getCart,
        updetItem,
        clearData,
        cartID,
        cartDetails,
        numberOfCart,
        priceOfCart,
        isLodaing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
