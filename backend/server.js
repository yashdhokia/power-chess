import { Chess } from "chess.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL of the Vue.js app
    methods: ["GET", "POST"],
  },
});

let chess;
let player = {};
let currentPlayer = "w";
// Handle client connection
io.on("connection", (socket) => {
  chess = new Chess();
  console.log("A user connected:", socket.id + chess.turn());
  if (!player.white) {
    player.white = socket.id;
    socket.emit("playerRole", "w");
  } else if (!player.black) {
    player.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    io.emit("spectator");
  }

  socket.on("disconnect", () => {
    if (socket.id === player.white) delete player.white;
    else if (socket.id === player.black) delete player.black;
  });

  socket.on("move", (move) => {
    try {
      console.log(move);
      if (chess.turn() == "w" && socket.id !== player.white) return;
      if (chess.turn() == "b" && socket.id !== player.black) return;
      const result = chess.move(move, {verbose : true});
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move, result);
        io.emit("boardState", chess.ascii());
      } else {
        console.log("Invalid Move");
        socket.emit("Invalid Move", move);
      }
    } catch (err) {
      console.log(err);
      socket.emit("Invalid Move :", move);
    }
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running at http://localhost:3000");
});
