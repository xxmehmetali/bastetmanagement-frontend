import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';

export default function Menu() {

  return (

    <div>
      <Card style={{ width: '18rem' }}>
      bunlara erişebilrisin
        <ListGroup variant="flush">
              <ListGroup.Item>cat1</ListGroup.Item>
              <ListGroup.Item>cat2</ListGroup.Item>
              <ListGroup.Item>cat3</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}
