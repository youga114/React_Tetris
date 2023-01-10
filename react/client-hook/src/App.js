import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Rooms from "./components/Rooms";
import Tetris from "./components/Tetris";

const App = () => {
	return (
		<BrowserRouter>
			<Fragment>
				<Route exact path="/" component={Rooms} />
				<Route path="/tetris" component={Tetris} />
			</Fragment>
		</BrowserRouter>
	);
};

export default App;
