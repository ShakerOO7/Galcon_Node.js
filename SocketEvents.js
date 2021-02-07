const mapGen = require('./MapGenerator.js');
const roomManager = require('./RoomManager');

let IO = null;
let room = null;
let socket = null;
let ID = null;

module.exports.setIO = (_IO) => { IO = _IO; }

module.exports.setRoom = (_room) => { room = _room; }

module.exports.setSocket = (_socket) => { socket = _socket; }

module.exports.setID = (_ID) => { ID = _ID; }

module.exports.disconnected = () => { console.log('User Disconnected'); }

module.exports.welcome = { Welcome: 'Hello There!' };

module.exports.playersCountNotifyServer = () => {
    socket.emit('playersCountCB', { playersCount: roomManager.getRoomSize() });
}

module.exports.addPlayerNotifyServer = () => {
    socket.emit('mainPlayerIDCB', { mainPlayerID: ID });
    for (let id = ID - 1; id >= 0; id--) {
        socket.emit('playerIDCB', { playerID: id });
    }
    socket.broadcast.to(room).emit('playerIDCB', { playerID: ID });  // to everyone in the room except the sender
}

module.exports.attackNotifyServer = data => {
    console.log(data);
    IO.in(room).emit('AttackCB', data);                  // to everyone in the room with the sender
}

module.exports.mapNotifyServer = () => {
    console.log('map notify');
    if (roomManager.getRoomLength(room) == roomManager.getRoomSize()) {
        galaxy = mapGen.generate();
        galaxy.forEach(planet => {
            IO.in(room).emit('mapCB', planet);
        });
        console.log('map sent');
    }
}

