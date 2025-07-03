import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const WishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let headers = { token: localStorage.getItem("token") };

  // جلب العناصر الموجودة في الـ wishlist
  function getWishlist() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then(({ data }) => {
        setWishlistItems(data.data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        toast.error("فشل تحميل قائمة المفضلة");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // إضافة منتج للمفضلة
  function addProductToWishlist(productId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((res) => {
        toast.success("تمت إضافة المنتج للمفضلة");
        getWishlist();
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
        toast.error("فشل إضافة المنتج للمفضلة");
      });
  }

  // حذف منتج من المفضلة
  function removeProductFromWishlist(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
      .then(() => {
        toast.success("تم حذف المنتج من المفضلة");
        getWishlist();
      })
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
        toast.error("فشل حذف المنتج من المفضلة");
      });
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isLoading,
        addProductToWishlist,
        removeProductFromWishlist,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
