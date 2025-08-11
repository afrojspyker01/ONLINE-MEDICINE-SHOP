import React from 'react'
import { Carousel } from 'react-bootstrap';
import { productdata } from '../data';
const Carouselslider = () => {

  return <>
  <Carousel>
    {productdata.map((item,idx)=>(
        <Carousel.Item key={idx}>
                <img 
                    className='d-block w-100'
                    src={item.image}
                    alt="img"
                    width={1460}
                    height={450}
                />
                <Carousel.Caption>
                    <h5>{item.name}</h5>
                    <p>{item.category}</p>
                </Carousel.Caption>
        </Carousel.Item>
    ))}
  </Carousel>

  </>
}

export default Carouselslider