import React, { useState, useEffect } from 'react';
import axios from "axios";

const Clientform = ({ fetchclient, selectedclient, setSelectedclient }) => {
  const [form, setForm] = useState({
    name: "",
    sector: "",
    location: "",
    status: "",
    image: null // This should hold a File object
  });

  useEffect(() => {
    if (selectedclient) {
      setForm({
        name: selectedclient.name || "",
        sector: selectedclient.sector || "",
        location: selectedclient.location || "",
        status: selectedclient.status || "",
        image: null // Reset image for update
      });
    }
  }, [selectedclient]);

  const hc = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] }); // Store file object
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const hs = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('sector', form.sector);
    data.append('location', form.location);
    data.append('status', form.status);

    if (form.image) {
      data.append('image', form.image); // Append file only if available
    }

    try {
      if (selectedclient) {
        await axios.put(`http://localhost:5700/api/clients/${selectedclient._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSelectedclient(null);
      } else {
        await axios.post('http://localhost:5700/api/clients', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setForm({ name: "", sector: "", location: "", status: "", image: null });
      fetchclient();
    } catch (err) {
      console.error("Error uploading client:", err);
    }
  };

  return (
    <>
      <form onSubmit={hs} encType="multipart/form-data">
        <div className='form-group'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            placeholder='enter...'
            onChange={hc}
            className='form-control col-md-3'
            value={form.name}
            required
          />
        </div>

        <div className='form-group'>
          <label>Sector:</label>
          <input
            type='text'
            name='sector'
            placeholder='enter...'
            onChange={hc}
            className='form-control col-md-3'
            value={form.sector}
            required
          />
        </div>

        <div className='form-group'>
          <label>Location:</label>
          <input
            type='text'
            name='location'
            placeholder='enter...'
            onChange={hc}
            className='form-control col-md-3'
            value={form.location}
            required
          />
        </div>

        <div className='form-group'>
          <label>Status:</label>
          <input
            type='text'
            name='status'
            placeholder='enter...'
            onChange={hc}
            className='form-control col-md-3'
            value={form.status}
            required
          />
        </div>

        <div className='form-group'>
          <label>Image:</label>
          <input
            type='file'
            name='image'
            onChange={hc}
            className='form-control-file'
            accept="image/*"
          />
        </div>

        <button className='btn btn-primary mt-3' type='submit'>
          {selectedclient ? "Update" : "Add"} Client
        </button>
      </form>
    </>
  );
};

export default Clientform;
