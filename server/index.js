const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log(`Agent connected ${socket.id}`);

    socket.on("join_chat", (data) => {
        socket.join(data);
        console.log(`Agent ${socket.id} joined chat ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to.apply(data.chatId).emit("receive_message", data)
    });

    socket.on('disconnect', () => {
        console.log("Agent disconnected", socket.id);
    });
});

const port = 3005
server.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
