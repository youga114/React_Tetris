import { Reducer } from "react";
import { AnyAction } from "redux";

const GET_GAMES = "GET_GAMES";

type Games = {
	gameNumber: number;
	numberOfUsers: number;
	name: string;
	master: string;
	state: string;
};

type LobbyState = {
	games: Games[];
};

const initialState: LobbyState = {
	games: [],
};

const lobby: Reducer<LobbyState, AnyAction> = (
	state: LobbyState = initialState,
	action: AnyAction
) => {
	switch (action.type) {
		case GET_GAMES:
			return { games: action.data };
		default:
			return state;
	}
};

export default lobby;
