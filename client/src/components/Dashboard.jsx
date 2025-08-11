import {useState,useEffect} from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [msg,setMsg] = useState("");
    useEffect(()=>{
        axios.get('http://localhost:5700/api/auth/dashboard',{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>setMsg(res.data.message))
        .catch(()=>setMsg('unauthorized'));
    },[]);

  return <>
   <h1>{msg}</h1>
  </>
}

export default Dashboard