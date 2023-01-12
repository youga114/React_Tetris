import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LobbyContainer from "./containers/LobbyContainer";
import Tetris from "./components/Tetris";

const App = () => {
	return (
		<BrowserRouter>
			<div>
				<Route
					exact
					path="/"
					component={(props) => (
						<LobbyContainer {...props} />
					)}
				/>
				<Route
					path="/tetris"
					component={(props) => (
						<Tetris {...props} />
					)}
				/>
			</div>
		</BrowserRouter>
	);
};

export default App;
