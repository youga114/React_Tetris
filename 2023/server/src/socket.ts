import http from "http";
import { Server } from "socket.io";

const ENTER_GAME = "ENTER_GAME";
const LEAVE_GAME = "LEAVE_GAME";
const GET_GAMES = "GET_GAMES";
const JOIN_USER = "JOIN_USER";
const CHAT = "CHAT";
const LEAVE_USER = "LEAVE_USER";
const START = "START";
const SET_BLOCKS = "SET_BLOCKS";
const END_GAME_USER = "END_GAME_USER";
const UP_LINE = "UP_LINE";

const socket = (server: http.Server) => {
    const LOBBY = "lobby";

    let numberOfUsers = 0;
    let gameNumber = 0;
    let games: {
        gameNumber: number;
        numberOfUsers: number;
        name: string;
        master: string;
        state: string;
    }[] = [];
    let users: {
        name: string;
        blocks: [];
        rank: string;
    }[][] = [];

    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log(
            `Socket connected: ${socket.id}, Login number: ${++numberOfUsers}`
        );

        socket.on("disconnect", function () {
            console.log(
                `Socket disconnected: ${
                    socket.id
                }, Login number: ${--numberOfUsers}`
            );
        });

        socket.join(LOBBY);
        io.sockets
            .to(socket.id)
            .emit("action", { type: GET_GAMES, data: games });

        socket.on("action", (action) => {
            switch (action.type) {
                case "server/createGame":
                    games.push({
                        name: action.data.name,
                        numberOfUsers: 1,
                        master: action.data.master,
                        gameNumber: gameNumber++,
                        state: "대기중",
                    });
                    users.push([
                        {
                            name: action.data.master,
                            blocks: [],
                            rank: "",
                        },
                    ]);
                    socket.leave(LOBBY);
                    socket.join(action.data.name);
                    socket.broadcast
                        .in(LOBBY)
                        .emit("action", { type: GET_GAMES, data: games });
                    io.sockets.to(socket.id).emit("action", {
                        type: ENTER_GAME,
                        data: {
                            users: [],
                            roomName: action.data.name,
                            master: action.data.master,
                        },
                    });
                    break;
                case "server/join":
                    for (var i = 0; i < games.length; i++) {
                        if (games[i].gameNumber == action.data.gameNumber) {
                            break;
                        }
                    }
                    io.sockets.to(socket.id).emit("action", {
                        type: ENTER_GAME,
                        data: {
                            users: users[i],
                            roomName: games[i].name,
                            master: games[i].master,
                        },
                    });
                    users[i].push({
                        name: action.data.name,
                        blocks: [],
                        rank: "",
                    });
                    games[i].numberOfUsers++;
                    socket.leave(LOBBY);
                    socket.join(games[i].name);
                    socket.broadcast.in(games[i].name).emit("action", {
                        type: JOIN_USER,
                        data: {
                            user: users[i][users[i].length - 1],
                            joinPerson: action.data.name,
                        },
                    });
                    socket.broadcast
                        .in(LOBBY)
                        .emit("action", { type: GET_GAMES, data: games });
                    break;
                case "server/chat":
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: CHAT,
                        data: {
                            text: action.data.text,
                            user: action.data.user,
                        },
                    });
                    io.sockets.to(socket.id).emit("action", {
                        type: CHAT,
                        data: { text: action.data.text, user: "me" },
                    });
                    break;
                case "server/exit":
                    for (var i = 0; i < games.length; i++) {
                        if (games[i].name == action.data.roomName) {
                            break;
                        }
                    }
                    for (var j = 0; j < users[i].length; j++) {
                        if (users[i][j].name == action.data.user) {
                            if (users[i][j].name == games[i].master) {
                                if (users[i].length > j + 1) {
                                    games[i].master = users[i][j + 1].name;
                                }
                            }
                            users[i].splice(j, 1);
                            socket.leave(games[i].name);
                            socket.join(LOBBY);
                            if (users[i].length == 0) {
                                users.splice(i, 1);
                                games.splice(i, 1);
                            } else {
                                games[i].numberOfUsers--;
                                socket.broadcast
                                    .in(games[i].name)
                                    .emit("action", {
                                        type: LEAVE_USER,
                                        data: {
                                            users: users[i],
                                            exitPerson: action.data.user,
                                            someoneNum: action.data.someoneNum,
                                        },
                                    });
                            }
                            io.sockets.in(LOBBY).emit("action", {
                                type: GET_GAMES,
                                data: games,
                            });
                            io.sockets
                                .to(socket.id)
                                .emit("action", { type: LEAVE_GAME, data: "" });
                            break;
                        }
                    }
                    break;
                case "server/start":
                    for (var i = 0; i < games.length; i++) {
                        if (games[i].name == action.data.roomName) {
                            games[i].state = "게임중";
                            break;
                        }
                    }
                    io.sockets.in(action.data.roomName).emit("action", {
                        type: START,
                        data: { numberOfUsers: games[i].numberOfUsers },
                    });
                    io.sockets
                        .in(LOBBY)
                        .emit("action", { type: GET_GAMES, data: games });
                    break;
                case "server/blocks":
                    for (var i = 0; i < games.length; i++) {
                        if (games[i].name == action.data.roomName) {
                            break;
                        }
                    }

                    for (var j = 0; j < users[i].length; j++) {
                        if (users[i][j].name == action.data.user) {
                            users[i][j].blocks = action.data.blocks;
                            break;
                        }
                    }

                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: SET_BLOCKS,
                        data: {
                            blocks: action.data.blocks,
                            user: action.data.user,
                        },
                    });
                    break;
                case "server/gameset":
                    io.sockets.in(action.data.roomName).emit("action", {
                        type: END_GAME_USER,
                        data: {
                            user: action.data.user,
                            rank: action.data.rank,
                        },
                    });
                    if (action.data.rank <= 1) {
                        for (var i = 0; i < games.length; i++) {
                            if (games[i].name == action.data.roomName) {
                                games[i].state = "대기중";
                                break;
                            }
                        }
                        io.sockets
                            .in(LOBBY)
                            .emit("action", { type: GET_GAMES, data: games });
                    }
                    break;
                case "server/lineup":
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: UP_LINE,
                        data: { randomVar: action.data.randomVar },
                    });
                    break;
                default:
                    break;
            }
        });
    });
};

export default socket;
