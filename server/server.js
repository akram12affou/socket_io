import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app); 

server.listen(3001, () => {
    const io = new Server(server, {
        cors: {
            origin: "*" ,
            methods: ["GET", "POST"] 
        }
    });
    io.on("connection", (socket) => {
        socket.on("join_room" , (data) => {
            socket.join(data)
        })
            socket.on("send" , (data) => {
                socket.to(data.room).emit("receive_message" , data) 
        })
      
    })
});
