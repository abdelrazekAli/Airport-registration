import { Nav } from "../components/Nav";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Nav />
      <div className="content mt-5">
        <div className="card" style={{ width: "50rem" }}>
          <img
            src="/assets/img/cover.jpg"
            className="card-img-top"
            alt="cover"
          />
          <div className="card-body">
            <h4 className="card-title my-2">Welcome to our Airport</h4>
            <NavLink
              to={"/register"}
              className="btn btn-primary text-light mt-2"
            >
              Register Flight Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
