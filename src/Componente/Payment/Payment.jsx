import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [cash, setCash] = useState(false);
  const navigate = useNavigate();
  const { cartID } = useContext(CartContext);

  const validationSchema = Yup.object({
    details: Yup.string()
      .min(5, "Details must be at least 5 characters")
      .required("Details is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number")
      .required("Phone is required"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required"),
  });

  const paymentForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: paymentAll,
  });

  function paymentAll(values) {
    const shippingAddress = { shippingAddress: values };
    if (cash) {
      paymentCash(shippingAddress);
    } else {
      paymentOnline(shippingAddress);
    }
  }

  function paymentCash(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(() => navigate("/allorders"))
      .catch((err) => console.log(err));
  }

  function paymentOnline(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => window.open(res.data.session.url, "_self"))
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={paymentForm.handleSubmit} className="max-w-md mx-auto mt-40">
      {/* DETAILS */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="details"
          value={paymentForm.values.details}
          onChange={paymentForm.handleChange}
          onBlur={paymentForm.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          id="floating_details"
        />
        <label htmlFor="floating_details" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">
          Details
        </label>
        {paymentForm.errors.details && paymentForm.touched.details && (
          <p className="text-red-600 text-xs">{paymentForm.errors.details}</p>
        )}
      </div>

      {/* PHONE */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="phone"
          value={paymentForm.values.phone}
          onChange={paymentForm.handleChange}
          onBlur={paymentForm.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          id="floating_phone"
        />
        <label htmlFor="floating_phone" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">
          Phone
        </label>
        {paymentForm.errors.phone && paymentForm.touched.phone && (
          <p className="text-red-600 text-xs">{paymentForm.errors.phone}</p>
        )}
      </div>

      {/* CITY */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="city"
          value={paymentForm.values.city}
          onChange={paymentForm.handleChange}
          onBlur={paymentForm.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          id="floating_city"
        />
        <label htmlFor="floating_city" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600">
          City
        </label>
        {paymentForm.errors.city && paymentForm.touched.city && (
          <p className="text-red-600 text-xs">{paymentForm.errors.city}</p>
        )}
      </div>

      {/* CASH & ONLINE BUTTONS */}
      <div className="flex gap-3 justify-center">
        <button
          type="submit"
          onClick={() => setCash(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Pay Cash
        </button>
        <button
          type="submit"
          onClick={() => setCash(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Pay Online
        </button>
      </div>
    </form>
  );
}
