import axios from "axios";
import { useState } from "react";
import { Nav } from "../components/Nav";

export const RegisterFlight = () => {
  // Success and Errors Handlers
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Loading Handler
  const [isLoading, setIsLoading] = useState(false);

  // Add Flight Handler
  const addFlight = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let source = e.target.source.value,
      destination = e.target.destination.value,
      date = e.target.date.value,
      travellerID = e.target.travellerID.value;

    try {
      let res = await axios.post("/api/v1/flights", {
        source,
        destination,
        date,
        travellerID,
      });
      if (res.data) {
        setIsLoading(false);
        setSuccess(true);
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <Nav />
      <div className="container d-flex justify-content-center my-5">
        <form className="form-border" action="/all" onSubmit={addFlight}>
          <div className="mb-3">
            <label className="form-label">Source</label>
            <input
              type="text"
              name="source"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Destination</label>
            <input
              type="text"
              name="destination"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="date" name="date" className="form-control" required />
          </div>
          <input
            type="hidden"
            name="travellerID"
            value={localStorage.getItem("travellerID")}
          />
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Is Loading..." : "Register"}
          </button>
          {success && (
            <div className="alert alert-success text-center my-2">
              Successfully Registered
            </div>
          )}
          {error && (
            <div className="alert alert-danger text-center my-2">
              Registration Faild
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
