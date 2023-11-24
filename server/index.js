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
    console.log(`User connected ${socket.id}`);

    socket.on("join_chat", (data) => {
        socket.join(data);
        console.log(`User ${socket.id} joined chat ${data}`);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    });
});

const port = 3005
server.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
