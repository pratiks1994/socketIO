import React from 'react'
import { Button, Form } from "react-bootstrap"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login() {
   const navigate = useNavigate()
   const [userId, setUserId] = useState("")

const handleLogin = (e) => {
   e.preventDefault()
   navigate(`chat/${userId}`)

}
   

  return (
   
    <div >
      <Form className='shadow-lg rounded-4 p-4'>
         <Form.Group className='d-flex flex-column justify-content-start p-2' >
            <Form.Label className=" ms-2">user id</Form.Label>
            <Form.Control type='text' className='mt-1 shadow' value={userId} onChange={(e)=> setUserId(e.target.value)}/>
         </Form.Group>
         <Button variant='primary' className='my-2' onClick={handleLogin}>Login</Button>

      </Form>
    </div>
    
  )
}

export default Login