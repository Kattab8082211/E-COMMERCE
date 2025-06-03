


import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark px-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white" to="/">
          Start Framework
        </NavLink>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/about"
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/Prodect"
              >
                Portfolio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/*import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="container ">
      <nav className=" bg-navBar pe-4 ps-4 navbar position-fixed start-0 end-0 navbar-expand-lg z-3">
        <div className="container-fluid">
          <Link className=" text-white text-uppercase fw-bolder fs-2" to="/">
            Start Framework
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className=" bg-Color active"
                  aria-current="page"
                  to="/about"
                >
                  about
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className=" bg-Color active"
                  aria-current="page"
                  to="/Prodect"
                >
                  portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link className=" bg-Color active" aria-current="page" to="/contact">
                  contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
} */}
    </nav>
  );
}
