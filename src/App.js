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
  socket.emit("message",message)
  setMessage("")
}
 
  socket.on("newMessage",(newMessage)=>{
    setChat(prev => [...prev,newMessage])
  })



  return (
    <div className="App d-flex align-items-center justify-content-center">
      <Container className='d-flex align-items-center justify-content-center flex-column'>
        <div className='chatbox w-50 h-50 shadow border-4 rounded-4 p-4'>
          {chat.map((msg,index)=> {
            return <div key = {index}>{msg}</div>
          } )}
        </div>
        <Form className='d-flex'>
          <Form.Group className='mt-3 w-100 flex-grow-1'>
            <Form.Control type = "text" value={message} onChange = {(e)=> setMessage(e.target.value)}  />
          </Form.Group>
          <Button type='submit' onClick={sendMessage} className='mt-3 ms-3'>send</Button>
        </Form>


      </Container>
    
    </div>
  );
}

export default App;
