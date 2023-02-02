const GET_GAMES = "GET_GAMES";

type Games = {
	gameNumber: number;
	numberOfUsers: number;
	name: string;
	master: string;
	state: string;
};

const getGames = (games: Games) => ({
	type: GET_GAMES,
	data: {
		games,
	},
});

type LobbyAction = ReturnType<typeof getGames>;

type LobbyState = {
	games: Games[];
};

const initialState: LobbyState = {
	games: [],
};

function lobby(state: LobbyState = initialState, action: LobbyAction) {
	switch (action.type) {
		case GET_GAMES:
			return { games: action.data };
		default:
			return state;
	}
}

export default lobby;
