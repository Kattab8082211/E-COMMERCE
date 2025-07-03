import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { Loader } from "lucide-react";
import { jwtDecode } from "jwt-decode";
export default function Sign() {
  //import the input from componente is not responsive from phone screen

  const { setToken, setidUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("البريد غير صالح").required("البريد مطلوب"),
    password: Yup.string()
      .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير")
      .required("passord is problem"),
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loding, setLodig] = useState(false);
  async function handelLogin(values) {
    setLodig(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log("Success:", res.data);
      setErrorMessage(null); // Clear error if successful
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      let { id } = jwtDecode(res.data.token);
      localStorage.setItem("id", id);
      setidUser(id);

      navigate("/");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLodig(false);
    }
  }

  const LoginForm = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelLogin,
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

      <form onSubmit={LoginForm.handleSubmit} className="w-1/2 mx-auto">
        <h3 className="text-2xl">Register:</h3>

        {/* Email */}
        <div className="mt-4">
          <label htmlFor="email" className="block mb-2 text-m font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={LoginForm.values.email}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            placeholder="mail@example.com"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {LoginForm.touched.email && LoginForm.errors.email && (
            <div className="text-red-500">{LoginForm.errors.email}</div>
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
            value={LoginForm.values.password}
            onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
          />
          {LoginForm.touched.password && LoginForm.errors.password && (
            <div className="text-red-500">{LoginForm.errors.password}</div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-5">
          <button
            disabled={loding}
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
