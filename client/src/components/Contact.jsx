import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Clientform from './Clientform';
import Clientlist from './Clientlist';


const Contact = () => {
  const [clients,setClients] = useState([]);
  const [seletedclient,setSelectedclient] = useState(null);
  const [searchTerm,setSearchTerm] = useState('');



  const fetchclients = async()=>{
    const res = await axios.get('http://localhost:5700/api/clients');
    setClients(res.data);
  };
  const searchClients = async ()=>{
    if(searchTerm.trim() === ''){
      fetchclients();
    }
    else {
      const res = await axios.get(`http://localhost:5700/api/clients/search?name=${searchTerm}`);
      setClients(res.data);
    }
  }
  useEffect(()=>{
    fetchclients();
  },[]);
  return <>
   <h2>Online Medicine Shop</h2>
   <input 
    type='text'
    placeholder='Search ....'
    value={searchTerm}
    onChange={e=>setSearchTerm(e.target.value)}
   />
   <button onClick={searchClients}>Search</button>
   <button onClick={fetchclients}>Reset</button>
   <Clientform fetchclient={fetchclients} selectedclient={seletedclient} setSelectedclient={setSelectedclient}/>
   <Clientlist clients={clients} fetchclients={fetchclients} setSeletedclient={setSelectedclient}/>
  </>
}

export default Contact