import { useState , useEffect } from "react"
import io from "socket.io-client";

function Chat({room , messages , name}) {
  const [messageText , setMessageText] = useState('')
  const socket = io.connect("http://localhost:3001");
  

  const sendMessage = async () => {
    const message = {
        room : room ,
        author : name ,
        message : messageText ,
        time :
           new Date(Date.now()).getHours() + 
           ":" + 
           new Date(Date.now()).getMinutes()
    };
     await socket.emit("send",{
        message 
    })
   }
  return (
    <div>
       <hr/>
          {
            JSON.stringify(messages)
          }
       <hr />
        <input type="text" value={messageText} onChange={(e) => {setMessageText(e.target.value)}}/> 
        <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat