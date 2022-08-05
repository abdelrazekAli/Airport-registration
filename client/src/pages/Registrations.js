import axios from "axios";
import { Nav } from "../components/Nav";
import { useEffect, useState } from "react";
import { ReadOnlyRow } from "../components/ReadOnlyRow";
import { EditableRow } from "../components/EditableRow";

export const Registrations = () => {
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loadingDB, setLoadingDB] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  // Get registrations handler
  const getRegistrations = async () => {
    try {
      let travellerID = localStorage.getItem("travellerID");
      const res = await axios.get(`/api/v1/flights/${travellerID}`);
      if (res.data) {
        setLoadingDB(true);
        setRegistrations(res.data);
      }
    } catch (err) {
      setLoadingDB(false);
      setError(true);
    }
  };
  useEffect(() => {
    getRegistrations();
  }, []);

  // Delete registerion handler
  const deleteHandler = async (flightID) => {
    try {
      const res = await axios.delete(`/api/v1/flights/${flightID}`);
      if (res.data) {
        getRegistrations();
      }
    } catch (err) {
      setError(true);
    }
  };

  // Edit Registerion handler
  const editHandler = async (flightID, source, destination, date) => {
    try {
      let res = await axios.put(`/api/v1/flights/${flightID}`, {
        source,
        destination,
        date,
      });
      if (res.data) {
        getRegistrations();
        setTimeout(window.location.replace("/all"), 10000);
      }
    } catch (err) {
      setError(true);
    }
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      <Nav />
      <div className="my-5">
        <div className="form-border table-responsive  container">
          {loadingDB ? (
            registrations.length === 0 ? (
              "You do not have any Registerations"
            ) : (
              <form action="">
                <table className="table text-center ">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Source</th>
                      <th>Destination</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.length > 0 &&
                      registrations.map((registration) =>
                        editMode ? (
                          <EditableRow
                            key={registration.f_id}
                            registration={registration}
                            onCancel={changeEditMode}
                            onEdit={editHandler}
                          />
                        ) : (
                          <ReadOnlyRow
                            key={registration.f_id}
                            registration={registration}
                            onDelete={deleteHandler}
                            onEdit={changeEditMode}
                          />
                        )
                      )}
                  </tbody>
                </table>
              </form>
            )
          ) : (
            "Is Loading..."
          )}
          {error && (
            <div className="alert alert-danger my-2">
              Something Went Wrong !
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
