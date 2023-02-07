"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_1 = __importDefault(require("./socket"));
var PORT = 52272;
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
(0, socket_1.default)(server);
server.listen(PORT, function () { return console.log("app listening on port ".concat(PORT, "!")); });
