// frontend/src/plugins/socket.js
import { io } from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:3000");

export default socket;
