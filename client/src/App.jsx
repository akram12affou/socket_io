
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
function App() {
  const [room , setRoom] = useState('');
  const [name , setName] = useState('');
  const [messages , setMessages] = useState([])
  const socket = io.connect("http://localhost:3001");
    
  const joinRoom = () => {
    if(room!=""){
      console.log(room)
        socket.emit('join_room' , room)
    }
  }

  useEffect(() => {
    socket.on('receive_message' , (data) => {
      setMessages((list) => [...list, data]);
    });
  },[socket]);




  return (   
    <center>
       room : <input type="text"  value={room}  onChange={ e => setRoom(e.target.value) } />
      
       <br />
       name : <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
       <br />
       <button onClick={joinRoom}>joinRoom</button>
      
       <Chat messages={messages} room={room} name={name}/>
    </center>  
  )
}

export default App
