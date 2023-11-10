const express = require("express");
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = [];
const connections = [];

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

app.get('/', (req, res) => {
    // Route for localhost:3000/
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // When a client connects to the server
    connections.push(socket); // Add socket details to the array
    console.log(`Connected: ${connections.length} socket(s) connected`); // Current connections count

    socket.on('disconnect', () => {
        // When a client disconnects from the server
        const index = connections.indexOf(socket);
        connections.splice(index, 1); // Delete socket details
        console.log(`Disconnected: ${connections.length} socket(s) connected`); // Current connections count
    });

    socket.on('send message', (data) => {
        console.log(data);
        io.emit('new message', { msg: data }); // Broadcast the message to all connected clients
    });
});
