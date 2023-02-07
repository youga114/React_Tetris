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
                            user: [action.data.master],
                            roomName: action.data.name,
                            myNum: 0,
                        },
                    });
                    break;
                case "server/join":
                    for (var i = 0; i < games.length; i++) {
                        if (games[i].gameNumber == action.data.gameNumber) {
                            break;
                        }
                    }
                    users[i].push({
                        name: action.data.name,
                        blocks: [],
                    });
                    games[i].numberOfUsers++;
                    socket.leave(LOBBY);
                    socket.join(games[i].name);
                    socket.broadcast.in(games[i].name).emit("action", {
                        type: JOIN_USER,
                        data: { users: users[i], joinPerson: action.data.user },
                    });
                    socket.broadcast
                        .in(LOBBY)
                        .emit("action", { type: GET_GAMES, data: games });
                    io.sockets.to(socket.id).emit("action", {
                        type: ENTER_GAME,
                        data: {
                            user: users[i],
                            roomName: games[i].name,
                            myNum: users[i].length - 1,
                        },
                    });
                    break;
                case "server/chat":
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: CHAT,
                        data: {
                            content: action.data.content,
                            speaker: action.data.speaker,
                        },
                    });
                    io.sockets.to(socket.id).emit("action", {
                        type: CHAT,
                        data: { content: action.data.content, speaker: "me" },
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
                                games[i].master = users[i][j + 1].name;
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
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: SET_BLOCKS,
                        data: {
                            userBlocks: action.data.userBlocks,
                            user: action.data.user,
                        },
                    });
                    break;
                case "server/gameset":
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: END_GAME_USER,
                        data: {
                            blocks: action.data.blocks,
                            enemyNum: action.data.myNum,
                            enemyRank: action.data.rank,
                        },
                    });
                    if (action.data.rank == 1) {
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
