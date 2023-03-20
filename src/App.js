import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect,useState } from 'react';
import { io } from "socket.io-client";
import { Button, Container, Form } from 'react-bootstrap'


function App() {

 const socket = io.connect('http://192.168.1.208:5000')
 const [message, setMessage] = useState("")
 const  [chat, setChat] = useState([])

//  const onClick = () =>{
//  let data = "hello socket"

//   socket.emit("message",data)
//  }

//  useEffect(() => {

//   socket.on("reply",(reply)=>{
//     console.log(reply)
    
//   })
   
//  }, [socket])

const sendMessage = (e) =>{
  e.preventDefault()

  let id = "john"

  let newMessage = {id,message}
  socket.emit("message",newMessage)
  setMessage("")
}
 

  socket.on("newMessage",(newMessage)=>{
    setChat(prev => [...prev,newMessage])
  })



  return (
    <div className="App d-flex align-items-center justify-content-center">
      <Container className='d-flex flex-column justify-content-center align-items-lg-center bg'>
        <div className='chatbox w-50 shadow border-4 rounded-4 p-4'>
          {chat.map((msg,index)=> {
            return <div className ={msg.id==="john" ? "text-end m-2 bg-primary rounded p-2" : "text-start m-2 bg-inforounded p-2"}key = {index}>{msg.message}</div>
          } )}
        </div>
        <Form className='d-flex w-100 justify-content-center'>
          <Form.Group className='mt-3 w-50' >
            <Form.Control type = "text" value={message} onChange = {(e)=> setMessage(e.target.value)}  />
          </Form.Group>
          <Button type='submit' onClick={sendMessage} className='mt-3 ms-3'>send</Button>
        </Form>


      </Container>
    
    </div>
  );
}

export default App;
