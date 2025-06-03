import React from "react";

export default function () {
  return (
    <>
      <div className="footer-up row">
        <div className="col-12 col-md-4 p-3">
          <h3 className="pt-3">LOCATION</h3>
          <p>2215 John Daniel Drive</p>
          <p>Clark, MO 65243</p>
        </div>
        <div className="col-12 col-md-4 p-3">
          <h3 className="pt-3">AROUND THE WEB</h3>
          <div className="d-flex justify-content-center ">
            <div className="d-flex justify-content-around align-self-center pt-3 pb-3 pe-2 ps-2 me-3 border rounded-circle">
              <i className="fa-brands fa-facebook fa-lg color" />
            </div>
            <div className="d-flex justify-content-around align-self-center pt-3 pb-3 pe-2 ps-2 me-3 border rounded-circle">
              <i className="fa-brands fa-twitter fa-lg color" />
            </div>
            <div className="d-flex justify-content-around align-self-center pt-3 pb-3 pe-2 ps-2 me-3 border rounded-circle">
              <i className="fa-brands fa-linkedin fa-lg color" />
            </div>
            <div className="d-flex justify-content-around align-self-center pt-3 pb-3 pe-2 ps-2 me-3 border rounded-circle">
              <i className="fa-solid fa-globe fa-lg color" />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 p-3">
          <h3 className="pt-3">ABOUT FREELANCER</h3>
          <p>
            Freelance is a free to use, licensed Bootstrap theme created by
            Route
          </p>
        </div>
      </div>
    </>
  );
}
