import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [cash, setcash] = useState(false);
  let navigate = useNavigate();
  let { cartID } = useContext(CartContext);
  let paymentForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: paymentAll,
  });
  function paymentAll(values) {
    let shippingAddress = {
      shippingAddress: values,
    };
    if (cash) {
      paymentCash(shippingAddress);
    } else {
      paymantOnline(shippingAddress);
    }
  }

  function paymentCash(values) {
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, values, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((data) => {
        console.log(data);
        navigate("/allorders");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function paymantOnline(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((data) => {
        console.log(data);
        window.open(data.data.session.url, "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <form
        onSubmit={paymentForm.handleSubmit}
        className="max-w-md mx-auto mt-40"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            value={paymentForm.values.details}
            onChange={paymentForm.handleChange}
            id="floating_details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="phone"
            name="phone"
            value={paymentForm.values.phone}
            onChange={paymentForm.handleChange}
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={paymentForm.values.city}
            onChange={paymentForm.handleChange}
            id="floating_city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            city
          </label>
        </div>
        <button
          onClick={() => setcash(true)}
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
        <button
          onClick={() => setcash(false)}
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
