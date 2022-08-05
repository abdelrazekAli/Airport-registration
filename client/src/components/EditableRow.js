import { useState } from "react";

export const EditableRow = ({ registration, onCancel, onEdit }) => {
  let flightID = registration.f_id;
  const [date, setDate] = useState(registration.date);
  const [source, setSource] = useState(registration.source);
  const [destination, setDestination] = useState(registration.destination);

  return (
    <tr>
      <th>{flightID}</th>
      <td>
        <input
          name="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </td>
      <td>
        <input
          name="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </td>
      <td>
        <input
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </td>

      <td>
        <button
          className="btn btn-success mx-2"
          onClick={() => onEdit(flightID, source, destination, date)}
        >
          Update
        </button>
        <button className="btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
