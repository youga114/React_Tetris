import { Reducer } from "react";
import { AnyAction } from "redux";

const ENTER_GAME = "ENTER_GAME";
const LEAVE_GAME = "LEAVE_GAME";

type AccountState = {
	me: string;
	roomName: string;
};

const initialState: AccountState = {
	me: prompt("아이디를 입력하세요.", "") || "",
	roomName: "lobby",
};

const account: Reducer<AccountState, AnyAction> = (
	state: AccountState = initialState,
	action: AnyAction
) => {
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
};

export default account;
