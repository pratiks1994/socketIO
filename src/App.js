import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect,useState } from 'react';
import { io, Socket } from "socket.io-client";
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
  console.log("msg sent")
  setMessage("")

}
 

useEffect(() => {

  socket.on("newMessage", (data)=>{
    console.log("ran")
     setChat((prev) => [...prev,data])
    console.log(chat)
  })

  return () => {
    socket.off("newMessage")
  }

  
}, [chat])


  // socket.on("newMessage",(newMessage)=>{
  //   console.log("ran")
  //   setChat(prev => [...prev,newMessage])
  //   // console.log(chat)
  // })



  return (
    <div className="App d-flex align-items-center justify-content-center">
      <Container className='d-flex flex-column justify-content-center align-items-lg-center bg'>
        <div className='chatbox w-50 shadow border-4 rounded-4 p-4'>
          {chat.map((msg)=> {
            return <div className ={msg.id==="john" ? "text-end m-2 bg-primary rounded p-2" : "text-start m-2 bg-info rounded p-2"}>{msg.message}</div>
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
