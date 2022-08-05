import axios from "axios";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";

export const Login = () => {
  // Error Hanlder
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  // Loading Handler
  const [isLoading, setIsLoading] = useState(false);

  // Login Handler
  const loginHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let email = e.target.email.value,
      password = e.target.password.value;
    try {
      let res = await axios.post("/api/v1/login", { email, password });
      if (res.data) {
        localStorage.setItem("travellerID", res.data.travellerID);
        window.location.replace("/");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response.status === 400) {
        setError({ isError: true, msg: "Invalid email or password" });
      } else {
        setError({ isError: true, msg: "Somthing went wrong!" });
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="container my-5">
        <form
          className="form-border col col-md-6 mx-auto"
          action="/"
          onSubmit={loginHandler}
        >
          <h2 className="text-center mb-4">Login</h2>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              required
              minLength="6"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary d-block w-100"
            disabled={isLoading}
          >
            {isLoading ? "Is Loading..." : "Login"}
          </button>
          {error.isError && (
            <div className="alert alert-danger text-center my-2">
              {error.msg}
            </div>
          )}
          <div className="my-3  text-center">
            Don't have an account?
            <Link to={"/signup"} className="text-decoration-none mx-1">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
