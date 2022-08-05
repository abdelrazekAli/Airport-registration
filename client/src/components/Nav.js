import { Link, NavLink } from "react-router-dom";

export const Nav = () => {
  // Get user
  let user = localStorage.getItem("travellerID");

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("travellerID");
  };
  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg p-3">
      <div className="container">
        <NavLink className="navbar-brand" to={"/"}>
          <h3>Airport 2</h3>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {user ? (
            <>
              <ul className="navbar-nav m-auto h6">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/register"}>
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/all"}>
                    Registrations
                  </NavLink>
                </li>
              </ul>
              <Link
                to={"/login"}
                className="navbar-text btn btn-danger text-light"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </>
          ) : (
            <ul className="navbar-nav m-auto h6">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/login"}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/signup"}>
                  Signup
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
