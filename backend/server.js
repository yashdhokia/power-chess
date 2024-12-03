const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Chess } = require("chess.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL of the Vue.js app
    methods: ["GET", "POST"],
  },
});

const chess = new Chess();
let player = {};
let currentPlayer = 'w';
// Handle client connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id + chess.turn());
    if(!player.white){
        player.white = socket.id;
        socket.emit("playerRole", 'w');
    }
    else if(!player.black){
        player.black = socket.id;
        socket.emit("playerRole", 'b');
    }
    else {
        io.emit("spectator");
    }

    socket.on("disconnect", () => {
        if(socket.id === player.white)
            delete player.white;
        else if(socket.id === player.black)          
            delete player.black;
    })

    socket.on("move", (move) => {
        try{
            if(chess.turn() == 'w' && socket.id !== player.white) return;
            if(chess.turn() == 'b' && socket.id !== player.black) return;
            const result = chess.move(move);
            console.log(result);
            if(result){
                currentPlayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen());
            } else {
                console.log("Invalid Move");
                socket.emit("Invalid Move", move);
            }
        } catch (err) {
            console.log(err);
            socket.emit("Invalid Move :", move);
        }
    })
});

server.listen(3000, () => {
  console.log("Socket.IO server running at http://localhost:3000");
});
