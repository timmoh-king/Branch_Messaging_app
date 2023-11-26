const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const papaparse = require('papaparse');
const fs = require('fs');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://branch-cs-messaging-lumjnlhej-timmoh-king.vercel.app/",
        methods: ['GET', 'POST'],
    }
});

const chatData = [];

const csvFilePath = './GeneralistRails_Project_MessageData.csv';
const csvFileContent = fs.readFileSync(csvFilePath, 'utf8');

papaparse.parse(csvFileContent, {
  header: true,
  complete: (result) => {
    result.data.forEach((row) => {
    const data = {
      chatId: row['User ID'],
      agentId: row['User ID'],
      message: row['Message Body'],
      time: row['Timestamp (UTC)'],
    };
  
    chatData.push(data);
    // io.to('some_chat_id').emit('receive_message', data);
  });
  
    console.log('CSV file reading completed.');
  },
});

const agentState = {};

io.on('connection', (socket) => {
    console.log(`Agent connected ${socket.id}`);

    socket.on("join_chat", (data) => {
        socket.join(data);
        const chatDataMessages = getRowsByChatId(data);
        agentState[socket.id] = { chatId: data, chatDataMessages, currentIndex: 0 };

        const getFirstRow = chatDataMessages[0];
        setTimeout(() => {
            io.to(socket.id).emit('receive_message', getFirstRow);
        }, 1500);
    });

    socket.on("send_message", () => {
        const { chatId, currentIndex, chatDataMessages } = agentState[socket.id];
        const nextIndex = currentIndex + 1;

        if (nextIndex < chatDataMessages.length && chatDataMessages[nextIndex].chatId === chatId) {
            const nextMessage = chatDataMessages[nextIndex];

            setTimeout(() => {
                io.to(socket.id).emit('receive_message', nextMessage);
                agentState[socket.id].currentIndex = nextIndex;
            }, 1500);
        } else {
            io.to(socket.id).emit('receive_message', { message: 'Thank you for your time' });
            socket.on('disconnect', () => { delete agentState[socket.id]; })
        }
    });

    socket.on('disconnect', () => {
        console.log("Agent disconnected", socket.id);
        delete agentState[socket.id];
    });
});

app.get('/getMessages', (req, res) => {
    res.json(chatData);
});

function getRowsByChatId(chatId) {
    return chatData.filter((row) => row.chatId === chatId);
}

const port = 3005
server.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
