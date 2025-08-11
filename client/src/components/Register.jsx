import {useState} from 'react';
import axios from 'axios'

const Register = () => {
    const[form,setForm] = useState({name:'',email:'',password:''});

    const hc = e =>  setForm({...form,[e.target.name]:e.target.value});
    const hs = async(e) => {
        e.preventDefault();
        await axios.post('http://localhost:5700/api/auth/register',form);
        alert('Registration success');
    }

  return <>
<form onSubmit={hs}>
   <div className='form-group'>
    <label>Name:</label>
    <input 
        type='text'
        name='name'
        placeholder='enter...'
        onChange={hc}
        className='form-control col-md-3'
    />
   </div>
   <div className='form-group'>
    <label>Email:</label>
    <input 
        type='text'
        name='email'
        placeholder='enter...'
        onChange={hc}
        className='form-control col-md-3'
    />
   </div>
   <div className='form-group'>
    <label>Password:</label>
    <input 
        type='password'
        name='password'
        placeholder='enter...'
        onChange={hc}
        className='form-control col-md-3'
    />
   </div>
   <button className='btn btn-danger'>Register</button>
  
  </form>
  </>
}

export default Register