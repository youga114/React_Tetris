const initialState = {
	games: [],
};

function lobby(state = initialState, action) {
	switch (action.type) {
		case "getGames":
			return { games: action.data };
		default:
			return state;
	}
}

export default lobby;
