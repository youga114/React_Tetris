import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSocketIoMiddleware from "redux-socket.io";
import { io } from "socket.io-client";
import rootReducer from "./modules";

const socketIoMiddleware = createSocketIoMiddleware(io(), "server/");

let store = createStore(rootReducer, applyMiddleware(socketIoMiddleware));

ReactDOM.render(
	<Provider store={store as any}>
		<App />
	</Provider>,
	document.getElementById("root")
);
