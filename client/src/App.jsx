
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import io from "socket.io-client";
function App() {
  const [room , setRoom] = useState('')
  const [message , setMessage] = useState('')
  const [messagereceived , setMessageReceived] = useState('')
  const socket = io.connect("http://localhost:3001");
  
  const joinRoom = () => {
    if(room!=""){
        socket.emit('join_room' , room)
        console.log(room)
    }
  }

   const sendMessage = () => {
 
    socket.emit("send",{message , room})
   }

   useEffect(() => {
      socket.on('receive_message' , (data) => {
        console.log(data)
        setMessageReceived(data)
      })
   },[socket])

  return (   
    <center>
       room : <input type="text"  value={room}  onChange={ e => setRoom(e.target.value) } />
       <button onClick={joinRoom}>joinRoom</button>
       <br />
       message : <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
       <button onClick={sendMessage}>Enter</button>
       <br />
       <p>{JSON.stringify(messagereceived)}</p>
    </center>  
  )
}

export default App
