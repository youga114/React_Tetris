import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import rootReducer from "./reducers";

const socketIoMiddleware = createSocketIoMiddleware(
	io(),
	"server/"
);

let store = applyMiddleware(socketIoMiddleware)(
	createStore
)(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
