import React from 'react'
import { Card } from 'react-bootstrap'

const Citycard = ({city}) => {

  return <>
    <Card className='mt-2'>
    <Card.Img src={city.image} variant='top'/>
    <Card.Body>
         <Card.Title>Medicine:{city.name}</Card.Title>
        <Card.Text>rating:{city.rating}</Card.Text>
    </Card.Body>

    </Card>
  </>
}

export default Citycard