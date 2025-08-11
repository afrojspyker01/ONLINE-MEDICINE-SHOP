import React, { useState } from 'react'
import axios from 'axios'

const Areaform = ({ onareaadd }) => {
    const [form, setForm] = useState({
        name: '',
        city: '',
        image: null,
    });

    const hc = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };
    const hs = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', form.name);
        data.append('city', form.city);
        data.append('image', form.image);

        const res = await axios.post('http://localhost:5600/api/areas', data);
        if (res.status === 201) {
            alert('Area added sucessfully');
            onareaadd();
            setForm({
                name: '',
                city: '',
                image: null,
            })
        }
    };
    return <>
      <h1 className='mt-5'>Add Area</h1>
      <form onSubmit={hs} encType='multipart/form-data'>
      <div className='form-group'>
         <label>Area Name: </label>
         <input 
         type='text' 
         className='form-control col-md-3'
         name='name'   
         value={form.name}
         onChange={hc}
         required
         />
      </div>
       <div className='form-group'>
         <label>City: </label>
         <input 
         type='text' 
         className='form-control col-md-3'
         name='city'   
         value={form.city}
         onChange={hc}
         required
         />
         
      </div>
       <div className='form-group'>
         <label>Image: </label>
         <input 
         type='file' 
         className='form-control-file'
         name='image'   
         onChange={hc}
         required
         />
      </div>
      <button type='submit' className='btn btn-success mt-2'>Add</button>

      </form>

    </>
}

export default Areaform