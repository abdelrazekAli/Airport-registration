export const ReadOnlyRow = ({ registration, onDelete, onEdit }) => {
  return (
    <tr>
      <th>{registration.f_id}</th>
      <td>{registration.source}</td>
      <td>{registration.destination}</td>
      <td>{registration.date}</td>
      <td>
        <button className="btn btn-success mx-2" onClick={onEdit}>
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(registration.f_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
