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
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id);
    });
});

const port = 3005
server.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
