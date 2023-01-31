const initialState = {
	me: prompt("아이디를 입력하세요.", ""),
	myRoom: "lobby",
};

function account(state = initialState, action) {
	switch (action.type) {
		case "createGame":
			return {
				...state,
				myRoom: action.data.myRoom,
			};
		default:
			return state;
	}
}

export default account;
