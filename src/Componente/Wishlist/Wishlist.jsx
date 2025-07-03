import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContextProvider";
import Loading from "../Loding/Loading";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlistItems, isLoading, removeProductFromWishlist, getWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    getWishlist();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-40 mb-20 container mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Wishlist Items
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد منتجات في المفضلة حاليا.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="shadow p-4 rounded border relative group bg-white"
            >
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => removeProductFromWishlist(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                  إزالة
                </button>
                <Link
                  to={`/ProdectDetials/${item.id}/${item.category.name}`}
                  className="text-green-600 underline"
                >
                  التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

