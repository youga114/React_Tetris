"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var socket = function (server) {
    var LOBBY = "lobby";
    var numberOfUsers = 0;
    var gameNumber = 0;
    var games = [];
    var users = [];
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", function (socket) {
        console.log("Socket connected: ".concat(socket.id, ", Login number: ").concat(++numberOfUsers));
        socket.on("disconnect", function () {
            console.log("Socket disconnected: ".concat(socket.id, ", Login number: ").concat(--numberOfUsers));
        });
        socket.join(LOBBY);
        io.sockets
            .to(socket.id)
            .emit("action", { type: "getGames", data: games });
        socket.on("action", function (action) {
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
                        .emit("action", { type: "getGames", data: games });
                    io.sockets.to(socket.id).emit("action", {
                        type: "enterGame",
                        data: {
                            user: [action.data.master],
                            myRoom: action.data.name,
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
                        type: "joinUser",
                        data: { users: users[i], joinPerson: action.data.user },
                    });
                    socket.broadcast
                        .in(LOBBY)
                        .emit("action", { type: "getGames", data: games });
                    io.sockets.to(socket.id).emit("action", {
                        type: "enterGame",
                        data: {
                            user: users[i],
                            myRoom: games[i].name,
                            myNum: users[i].length - 1,
                        },
                    });
                    break;
                case "server/chat":
                    socket.broadcast.in(action.data.myRoom).emit("action", {
                        type: "chat",
                        data: {
                            content: action.data.content,
                            speaker: action.data.speaker,
                        },
                    });
                    io.sockets.to(socket.id).emit("action", {
                        type: "chat",
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
                            }
                            else {
                                games[i].numberOfUsers--;
                                socket.broadcast
                                    .in(games[i].name)
                                    .emit("action", {
                                    type: "someoneExit",
                                    data: {
                                        users: users[i],
                                        exitPerson: action.data.user,
                                        someoneNum: action.data.someoneNum,
                                    },
                                });
                            }
                            io.sockets.in(LOBBY).emit("action", {
                                type: "getGames",
                                data: games,
                            });
                            io.sockets
                                .to(socket.id)
                                .emit("action", { type: "roomExit", data: "" });
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
                        type: "start",
                        data: { numberOfUsers: games[i].numberOfUsers },
                    });
                    io.sockets
                        .in(LOBBY)
                        .emit("action", { type: "getGames", data: games });
                    break;
                case "server/blocks":
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: "blocks",
                        data: {
                            blocks: action.data.blocks,
                            enemyNum: action.data.myNum,
                        },
                    });
                    break;
                case "server/gameset":
                    io.sockets
                        .to(socket.id)
                        .emit("action", { type: "gameset2" });
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: "gameset",
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
                            .emit("action", { type: "getGames", data: games });
                    }
                    break;
                case "server/gamesetTome":
                    io.sockets
                        .to(socket.id)
                        .emit("action", { type: "gamesetTome" });
                    break;
                case "server/lineup":
                    socket.broadcast.in(action.data.roomName).emit("action", {
                        type: "lineup",
                        data: { randomVar: action.data.randomVar },
                    });
                    break;
                default:
                    break;
            }
        });
    });
};
exports.default = socket;
