import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const[form,setForm] = useState({email:'',password:''});
    const navigate = useNavigate();

    const hc = e =>  setForm({...form,[e.target.name]:e.target.value});
    const hs = async(e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5700/api/auth/login',form);
        localStorage.setItem('token',res.data.token);
        navigate('/dashboard');
    }

  return <>
<form onSubmit={hs}>
   
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
   <button className='btn btn-danger'>Login</button>
  
  </form>
  </>
}

export default Login;