const express = require('express');
const socket = require('socket.io');
const compression = require('compression');

const roomManager = require('./RoomManager.js');
const map = require('./MapGenerator.js');
const events = require('./SocketEvents.js');

const app = express();

app.use(compression());

const server = app.listen(process.env.PORT || 3000, "192.168.1.108");

const io = socket(server);
events.setIO(io);

io.on('connection', socket => {
    events.setSocket(socket);

    console.log('User Connected');

    socket.on('disconnect', events.disconnected);

    const room_ID = roomManager.addClient(io, socket);
    events.setRoom(room_ID.room);
    events.setID(room_ID.ID);

    socket.emit('welcome', events.welcome);

    socket.on('playersCountNotifyServer', events.playersCountNotifyServer);

    socket.on('addPlayerNotifyServer', events.addPlayerNotifyServer);

    socket.on('AttackNotifyServer', events.attackNotifyServer);

    socket.on('mapNotifyServer', events.mapNotifyServer);
})



