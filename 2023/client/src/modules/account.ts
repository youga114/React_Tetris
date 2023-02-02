export const ENTER_GAME = "ENTER_GAME";
const LEAVE_GAME = "LEAVE_GAME";

const enterGame = (roomName: string) => ({
	type: ENTER_GAME,
	data: {
		roomName,
	},
});

type AccountAction = ReturnType<typeof enterGame>;

type AccountState = {
	me: string;
	roomName: string;
};

const initialState: AccountState = {
	me: prompt("아이디를 입력하세요.", "") || "",
	roomName: "lobby",
};

function account(
	state: AccountState = initialState,
	action: AccountAction
): AccountState {
	switch (action.type) {
		case ENTER_GAME:
			return {
				...state,
				roomName: action.data.roomName,
			};
		case LEAVE_GAME:
			return {
				...state,
				roomName: "lobby",
			};
		default:
			return state;
	}
}

export default account;
