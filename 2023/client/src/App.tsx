import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LobbyContainer from "./containers/LobbyContainer";
import Game from "./containers/GameContainer";

const App = () => {
	return (
		<BrowserRouter>
			<div>
				<Route
					exact
					path="/"
					component={(props: any) => <LobbyContainer {...props} />}
				/>
				<Route
					path="/tetris"
					component={(props: any) => <Game {...props} />}
				/>
			</div>
		</BrowserRouter>
	);
};

export default App;
