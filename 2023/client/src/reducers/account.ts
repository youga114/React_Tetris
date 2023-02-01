const initialState = {
	me: prompt("아이디를 입력하세요.", ""),
	roomName: "lobby",
};

function account(state = initialState, action) {
	switch (action.type) {
		case "enterGame":
			return {
				...state,
				roomName: action.data.roomName,
			};
		default:
			return state;
	}
}

export default account;
