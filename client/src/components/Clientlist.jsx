import React from 'react';
import axios from 'axios';

const Clientlist = ({ clients, fetchclients, setSeletedclient }) => {

  const deleteclient = async (id) => {
    try {
      await axios.delete(`http://localhost:5700/api/clients/${id}`);
      fetchclients();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Location</th>
            <th>Status</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((x) => (
            <tr key={x._id}>
              <td>{x.name}</td>
              <td>{x.sector}</td>
              <td>{x.location}</td>
              <td>{x.status}</td>
              <td>
                {
                  x.image ? (
                    <img
                      src={`http://localhost:5700/uploads/${x.image}`}
                      alt={x.name}
                      width="80"
                      height="80"
                    />
                  ) : (
                    <span>No Image</span>
                  )
                }
              </td>
              <td>
                <button className='btn btn-dark me-2' onClick={() => setSeletedclient(x)}>Edit</button>
                <button className='btn btn-danger' onClick={() => deleteclient(x._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Clientlist;
