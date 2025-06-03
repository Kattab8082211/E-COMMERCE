import React from "react";

export default function ChildComponent({ src }) {
  return (
    <div className="col-12 col-md-4 mb-4 text-center ">
      <div className="rounded-3 overflow-hidden position-relative z-0">
        <img src={src} alt="portfolio item" className="img-fluid rounded" />
        <div className="layer  position-absolute start-0 w-100 top-0 h-100 d-flex justify-content-center align-items-center">
          <i
            className="fa-solid fa-heart fa-2xl"
            style={{ color: "#ffffff" }}
          />
        </div>
      </div>
    </div>
  );
}
