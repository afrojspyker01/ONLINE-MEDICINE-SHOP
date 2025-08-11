import React from 'react'
import citydata from '../data/data'
import Citycard from './Citycard'
import Cardslider from './Cardslider'

const Home = () => {

  return <>
  <div className='row'>
    {
      citydata.map(x=>(
        <div className='col-md-3'>
         <Citycard city={x}/>
        </div>
      ))
    }
  </div>
  <div className='container-fluid mt-3'>
    <h2>Medical Shopping</h2>
    <Cardslider cites={citydata}/>
  </div>

  </>
}

export default Home