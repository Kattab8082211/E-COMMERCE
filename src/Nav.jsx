import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img15 from "./assets/images/freshcart-logo.svg";
import { AuthContext } from "./Context/AuthContextProvider";
import { CartContext } from "../src/Context/CartContextProvider";
import { ShoppingCart, LogIn, Menu, X } from "lucide-react";

export default function Navbar() {
  const { numberOfCart, cartDetails, removeProdect } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/Login");
  }

  return (
    <>
      <nav className="bg-slate-300 py-4 fixed w-full z-[99999] top-0">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <NavLink to="/">
            <img className="w-40 md:w-48" src={img15} alt="Logo" />
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-3">
            {token && (
              <ul className="flex gap-3">
                {["/", "/Prodect", "/Cards", "/Catogery", "/Brands","/wishlist"].map(
                  (path, idx) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `text-lg hover:font-semibold transition-all ${
                            isActive
                              ? "text-green-800 p-2 rounded-full bg-green-100 font-bold"
                              : ""
                          }`
                        }
                      >
                        {["Home", "Prodect", "Cards", "Catogery", "Brands","wishlist"][idx]}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          {/* Auth & Cart */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <>
                <button onClick={() => setShowCartDrawer(true)} className="relative cursor-pointer">
                  <ShoppingCart />
                  <span className="text-green-600 absolute -top-4 left-3 text-sm">
                    {numberOfCart?.numOfCartItems}
                  </span>
                </button>
                <button onClick={logout} className="cursor-pointer">
                  <LogIn />
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/Login"
                  className={({ isActive }) =>
                    `text-lg hover:font-semibold transition-all ${
                      isActive
                        ? "text-green-800 p-2 rounded-full bg-green-100 font-bold"
                        : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/Sign"
                  className={({ isActive }) =>
                    `text-lg hover:font-semibold transition-all ${
                      isActive
                        ? "text-green-800 p-2 rounded-full bg-green-100 font-bold"
                        : ""
                    }`
                  }
                >
                  Sign
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-300 py-4">
            <ul className="flex flex-col items-center gap-4">
              {token &&
                ["/", "/Prodect", "/Cards", "/Catogery", "/Brands","/wishlist"].map(
                  (path, idx) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `block text-lg hover:font-semibold transition-all ${
                            isActive
                              ? "text-green-800 p-2 rounded-full bg-green-100 font-bold"
                              : ""
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        {["Home", "Prodect", "Cards", "Catogery", "Brands","wishlist"][idx]}
                      </NavLink>
                    </li>
                  )
                )}
              {token ? (
                <li>
                  <button onClick={logout} className="text-lg font-semibold">
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/Login"
                      className="text-lg hover:font-semibold"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Sign"
                      className="text-lg hover:font-semibold"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      {showCartDrawer && (
        <div className="fixed top-0 right-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex justify-between items-center border-b pb-2">
            <button onClick={() => setShowCartDrawer(false)} className="text-gray-400 hover:text-gray-900 rounded-lg text-sm p-1.5">
              <X className="ms-65 mt-10 w-5 h-5" />
            </button>
          </div>
          <div className="py-4 space-y-4">
            {numberOfCart?.numOfCartItems ? (
              cartDetails?.data?.products?.map((item) => (
                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                  <img src={item.product.imageCover} className="w-12 h-12 rounded object-cover" alt={item.product.title} />
                  <div className="flex-1 ml-2">
                    <h4 className="text-sm font-bold">{item.product.title}</h4>
                    <p className="text-xs text-gray-500">{item.count} x {item.price} EGP</p>
                  </div>
                  <button onClick={() => removeProdect(item.product._id)} className="text-red-500 text-xs">Remove</button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
