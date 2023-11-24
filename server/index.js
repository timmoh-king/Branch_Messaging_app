const express = require('express');
const http = require('http');
const cors = require('cors');


const app = express();
app.use(cors());

const server = http.createServer(app);

const port = 3005
server.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
