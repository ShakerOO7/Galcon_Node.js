let roomno = 1;
let IO;
let roomSize = 2;

const addClient = function roomManager(io, socket) {
    IO = io;
    if (io.nsps['/'].adapter.rooms['room-' + roomno] && io.nsps['/'].adapter.rooms['room-' + roomno].length >= roomSize) {
        roomno++;
    }

    socket.join('room-' + roomno);
    return {
        room: 'room-' + roomno,
        ID: io.nsps['/'].adapter.rooms['room-' + roomno].length - 1
    };
}

function getRoomLength(room) {
    return IO.nsps['/'].adapter.rooms[room].length;
}

function setRoomSize(_roomSize) {
    roomSize = _roomSize;
}

function getRoomSize() {
    return roomSize;
}

module.exports = {
    addClient: addClient,
    getRoomLength: getRoomLength,
    setRoomSize: setRoomSize,
    getRoomSize: getRoomSize,
    roomno: 'room-' + roomno
}