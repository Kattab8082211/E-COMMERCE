import React, { useState } from "react";


export default function Contact() {
  const [formData, setFormData] = useState({
    userName: "",
    userAge: "",
    userEmail: "",
    userPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="container py-5 text-center">
                <div className="pt-5 mb-4">
            <h2 className="text-center text-uppercase fs-1 fw-bolder">
              portfolio component
            </h2>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <div className="line-prodect mr-home"></div>
              <i
                className="fa-solid fa-star fa-lg"
                style={{ color: "#130f0f" }}
              />
              <div className="line-prodect ml-home"></div>
            </div>
          </div>

      <form onSubmit={handleSubmit} className="w-75 mx-auto mt-25 text-start">
        {["userName", "userAge", "userEmail", "userPassword"].map((field) => (
          <div className="mb-4 position-relative" key={field}>
            {formData[field] && (
              <label className="floating-label text-muted ">
                {field}
              </label>
            )}
            <input
              type={field === "userPassword" ? "password" : field === "userEmail" ? "email" : field === "userAge" ? "number" : "text"}
              className="form-control border-0 border-bottom mt-5"
              placeholder={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              
            />
          </div>
        ))}

        <button type="submit" className="btn btn-success">
          send Message
        </button>
      </form>
    </div>
  );
}
