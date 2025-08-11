import React from 'react'
import { Carousel,Card } from 'react-bootstrap'

const Cardslider = ({cites}) => {

  return <>
    <Carousel>
        {cites.map((x, index)=>(
            <Carousel.Item>
                <img
                    className='d-block w-50'
                    src={x.image}
                    alt={x.name}
                    width={1450}
                    height={450}
                />
                <Carousel.Caption>
                    <Card bg='dark' text='white'>
                        <Card.Title>{x.name}</Card.Title>
                        <Card.Text>{x.rating}</Card.Text>
                    </Card>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
  </>
}

export default Cardslider