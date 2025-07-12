import "./App.css";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Componente/Home/Home";
import Label from "./Componente/LayOut/Lable";
import Sign from "./Componente/Sign.up/Sign";
import Catogery from "./Componente/Catogery/Catogery";
import Login from "./Componente/Login/Login";
import Cards from "./Componente/Cards/Cards";
import Brands from "./Componente/Brands/Brands";
import Contact from "./Componente/Contact/Contact";
import Prodect from "./Componente/Prodectes/Prodect";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProdectDetials from "./Componente/Prodect.detials/ProdectDetials";
import CartContextProvider from "./Context/CartContextProvider";
import Payment from "./Componente/Payment/Payment";
import OlOrders from "./Componente/Orders/OlOrders";
import CatogeryDitails from "./Componente/catogeryDitails/CatogeryDitails";
import BrandesDitalse from "./Componente/BrandesDItails/BrandesDitalse";
import WishlistContextProvider from "./Context/WishlistContextProvider";
import Wishlist from "./Componente/Wishlist/Wishlist";
import ForgotPassword from "./Componente/ForgetPassored/ForgetPassored";

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Label />,
      children: [
        { index: true, element: <Home /> },
        { path: "Prodect", element: <Prodect /> },
        { path: "cards", element: <Cards /> },
        { path: "Catogery", element: <Catogery /> },
        { path: "ProdectDetials/:id/:category", element: <ProdectDetials /> },
        { path: "CatogeryDetails/:id", element: <CatogeryDitails /> },
        { path: "BrandesDitalse/:id", element: <BrandesDitalse /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "Brands", element: <Brands /> },
        { path: "Payment", element: <Payment /> },
        { path: "allorders", element: <OlOrders /> },
        {path:"forgot-password", element:<ForgotPassword />},
        { path: "Login", element: <Login /> },
        { path: "sign", element: <Sign /> },
        { path: "contact", element: <Contact /> },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          toastClassName="relative z-[999999] top-12 bg-green-500 text-white rounded shadow-xl"
          bodyClassName="text-center text-base"
        />
        </WishlistContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
