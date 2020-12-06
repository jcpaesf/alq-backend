import socket from 'socket.io';
import { Server } from 'http';

interface IUserProps {
    [key: string]: string[];
}

const users: IUserProps = {};

interface ISocketRoomProps {
    [key: string]: string;
}

const socketToRoom: ISocketRoomProps = {};

export default function socketChatConnect(server: Server) {
    const io = socket(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket: any) => {
        socket.on('join room', (roomID: any) => {
            if (users[roomID]) {
                const length = users[roomID].length;
                if (length === 4) {
                    socket.emit("room full");
                    return;
                }
                users[roomID].push(socket.id);
            } else {
                users[roomID] = [socket.id];
            }

            socketToRoom[socket.id] = roomID;

            const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

            socket.emit("all users", usersInThisRoom);
        });

        socket.on("sending signal", (payload: any) => {
            io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        });

        socket.on("returning signal", (payload: any) => {
            io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
        });

        socket.on('disconnect', () => {
            const roomID = socketToRoom[socket.id];

            let room = users[roomID];

            if (room) {
                room = room.filter(id => id !== socket.id);
                users[roomID] = room;
            }
        });
    });
}