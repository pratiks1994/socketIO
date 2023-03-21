import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Form } from "react-bootstrap";
import { useParams,useNavigate } from "react-router-dom";

function Chat() {
   const socket = io.connect("http://192.168.1.208:5000");
   const [message, setMessage] = useState("");
   const [chat, setChat] = useState([]);
   const navigate = useNavigate()

   let {id} = useParams()
   

  

   const sendMessage = (e) => {
      e.preventDefault();
      let newMessage = { id, message };
      socket.emit("message", newMessage);
      console.log("msg sent");
      setMessage("");
   };

   useEffect(() => {
      socket.on("newMessage", (data) => {
         console.log("ran");
         setChat((prev) => [...prev, data]);
         console.log(chat);
      });

      return () => {
         socket.off("newMessage");
      };
   }, [chat]);

   return (
      <>
         <Container className="d-flex flex-column justify-content-center align-items-lg-center bg">
            <div className="my-2 align-self-end me-5">
               <Button onClick={()=>navigate("../")}>Logout</Button>
            </div>

            <div className="chatbox d-flex flex-column w-50 shadow border-4 rounded-4 p-4 overflow-auto">
               {chat.map((msg,index) => {
                  return (
                     <div key={index}
                        className={
                           msg.id === id
                              ? "text-end mt-2 ms-auto bg-secondary rounded p-2 w-auto "
                              : "text-start mt-2 me-auto bg-success rounded p-2 w-auto flex-start"
                        }
                     >
                        {msg.message}
                        <span className="p-3 fw-lighter text-light">_ {msg.id}</span>
                     </div>

                  );
               })}
            </div>

            <Form className="d-flex w-100 justify-content-center w-50">
               <Form.Group className="mt-3 w-50">
                  <Form.Control
                     type="text"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                  />
               </Form.Group>
               <Button
                  type="submit"
                  onClick={sendMessage}
                  className="mt-3 ms-3"
               >
                  send
               </Button>
            </Form>
         </Container>
      </>
   );
}

export default Chat;
