const initialState = {
	rooms: [],
};

function lobby(state = initialState, action) {
	switch (action.type) {
		case "menuReceive":
			return { rooms: action.data };
		default:
			return state;
	}
}

export default lobby;
