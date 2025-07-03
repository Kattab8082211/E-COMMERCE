import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { Loader } from "lucide-react";

export default function Sign() {
  //import the input from componente is not responsive from phone screen
  const { setToken } = useContext(AuthContext);
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loding, setLodig] = useState(false);
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

  async function handelRegister(values) {
    setLodig(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("Success:", res.data);
      setErrorMessage(null); // Clear error if successful
      setToken(res.data.token);
      navigate("/Login");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLodig(false);
    }
  }

  const RegesterForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelRegister,
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

      <form onSubmit={RegesterForm.handleSubmit} className="w-1/2 mx-auto">
        <h3 className="text-2xl">Register:</h3>

        {/* Name */}
        <div className="mt-4">
          <label htmlFor="name" className="block mb-2 text-m font-medium">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={RegesterForm.values.name}
            onChange={RegesterForm.handleChange}
            onBlur={RegesterForm.handleBlur}
            placeholder="Khattab.jr"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegesterForm.touched.name && RegesterForm.errors.name && (
            <div className="text-red-500">{RegesterForm.errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mt-4">
          <label htmlFor="email" className="block mb-2 text-m font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={RegesterForm.values.email}
            onChange={RegesterForm.handleChange}
            onBlur={RegesterForm.handleBlur}
            placeholder="mail@example.com"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegesterForm.touched.email && RegesterForm.errors.email && (
            <div className="text-red-500">{RegesterForm.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <label htmlFor="password" className="block mb-2 text-m font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={RegesterForm.values.password}
            onChange={RegesterForm.handleChange}
            onBlur={RegesterForm.handleBlur}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegesterForm.touched.password && RegesterForm.errors.password && (
            <div className="text-red-500">{RegesterForm.errors.password}</div>
          )}
        </div>

        {/* Re-Password */}
        <div className="mt-4">
          <label htmlFor="rePassword" className="block mb-2 text-m font-medium">
            Confirm Password:
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={RegesterForm.values.rePassword}
            onChange={RegesterForm.handleChange}
            onBlur={RegesterForm.handleBlur}
            placeholder="Confirm Password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegesterForm.touched.rePassword &&
            RegesterForm.errors.rePassword && (
              <div className="text-red-500">
                {RegesterForm.errors.rePassword}
              </div>
            )}
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label htmlFor="phone" className="block mb-2 text-m font-medium">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={RegesterForm.values.phone}
            onChange={RegesterForm.handleChange}
            onBlur={RegesterForm.handleBlur}
            placeholder="01XXXXXXXXX"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {RegesterForm.touched.phone && RegesterForm.errors.phone && (
            <div className="text-red-500">{RegesterForm.errors.phone}</div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-5">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5"
          >
            {loding ? <Loader /> : <span>Submit</span>}
          </button>
        </div>
      </form>
    </>
  );
}
