import axios from "axios";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";

export const Signup = () => {
  // Error hanlder
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  // Loading Handler
  const [isLoading, setIsLoading] = useState(false);

  // Signup Handler
  const signupHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let name = e.target.name.value,
      email = e.target.email.value,
      phone_number = e.target.phone_number.value,
      password = e.target.password.value;
    try {
      let res = await axios.post("/api/v1/signup", {
        name,
        email,
        phone_number,
        password,
      });
      if (res.data) {
        window.location.replace("/login");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response.status === 409) {
        setError({ isError: true, msg: "Email is already used" });
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
          action="/login"
          onSubmit={signupHandler}
        >
          <h2 className="text-center mb-4">Sign Up</h2>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone_number"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary text-light w-100"
            disabled={isLoading}
          >
            {isLoading ? "Is Loading..." : "Create"}
          </button>

          {error.isError && (
            <div className="alert alert-danger text-center my-2">
              {error.msg}
            </div>
          )}
          <div className="my-3 text-center">
            Have already an account?
            <Link to={"/login"} className=" my-3 text-decoration-none mx-1">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
