import express from "express";
import http from "http";
import socket from "./socket";

const PORT = 52272;

const app = express();
const server = http.createServer(app);

socket(server);
server.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
