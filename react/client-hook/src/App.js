import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Rooms from "./components/Rooms";
import Tetris from "./components/Tetris";

const App = () => {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Rooms} />
			<Route path="/tetris" component={Tetris} />
		</BrowserRouter>
	);
};

export default App;
