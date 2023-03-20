
import './App.css';
import { useEffect } from 'react';
import { io } from "socket.io-client";

function App() {

 const socket = io.connect('http://localhost:5000')

 const onClick = () =>{
 let data = "hello socket"

  socket.emit("message",data)
 }

 useEffect(() => {

  socket.on("reply",(reply)=>{
    console.log(reply)

    
  })
   
 }, [socket])
 


  return (
    <div className="App">
    <button onClick={onClick} >click</button>
    </div>
  );
}

export default App;
