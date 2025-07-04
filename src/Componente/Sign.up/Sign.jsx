import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { Loader } from "lucide-react";

export default function Sign() {
  const { setToken } = useContext(AuthContext);
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "الاسم قصير")
      .max(15, "الاسم طويل")
      .required("الاسم مطلوب"),
    email: Yup.string().email("البريد غير صالح").required("البريد مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور قصيرة")
      .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير")
      .matches(/[0-9]/, "يجب أن تحتوي على رقم")
      .required("كلمة المرور مطلوبة"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "كلمات المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح")
      .required("الهاتف مطلوب"),
  });

  async function handleRegister(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("Success:", res.data);
      setErrorMessage(null);
      setToken(res.data.token);
      navigate("/Login");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const RegisterForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      {errorMessage && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={RegisterForm.handleSubmit} className="w-full max-w-md lg:max-w-lg mx-auto px-4">
        <h3 className="text-2xl text-center mb-6">Register:</h3>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={RegisterForm.values.name}
            onChange={RegisterForm.handleChange}
            onBlur={RegisterForm.handleBlur}
            placeholder="Khattab.jr"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegisterForm.touched.name && RegisterForm.errors.name && (
            <div className="text-red-500 mt-1">{RegisterForm.errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={RegisterForm.values.email}
            onChange={RegisterForm.handleChange}
            onBlur={RegisterForm.handleBlur}
            placeholder="mail@example.com"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegisterForm.touched.email && RegisterForm.errors.email && (
            <div className="text-red-500 mt-1">{RegisterForm.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={RegisterForm.values.password}
            onChange={RegisterForm.handleChange}
            onBlur={RegisterForm.handleBlur}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegisterForm.touched.password && RegisterForm.errors.password && (
            <div className="text-red-500 mt-1">{RegisterForm.errors.password}</div>
          )}
        </div>

        {/* Re-Password */}
        <div className="mb-4">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium">
            Confirm Password:
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={RegisterForm.values.rePassword}
            onChange={RegisterForm.handleChange}
            onBlur={RegisterForm.handleBlur}
            placeholder="Confirm Password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegisterForm.touched.rePassword && RegisterForm.errors.rePassword && (
            <div className="text-red-500 mt-1">{RegisterForm.errors.rePassword}</div>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={RegisterForm.values.phone}
            onChange={RegisterForm.handleChange}
            onBlur={RegisterForm.handleBlur}
            placeholder="01XXXXXXXXX"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegisterForm.touched.phone && RegisterForm.errors.phone && (
            <div className="text-red-500 mt-1">{RegisterForm.errors.phone}</div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-6 text-center">
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 w-full flex justify-center items-center"
          >
            {loading ? <Loader className="animate-spin" /> : <span>Register</span>}
          </button>
        </div>
      </form>
    </>
  );
}
