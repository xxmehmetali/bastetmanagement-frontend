
import React from 'react'
import { useParams } from 'react-router-dom';

export default function EmployeeDetail() {
  let {id} = useParams();



  return (
    <div>
      id budur lo:
      {id}
    </div>
  );
}
    