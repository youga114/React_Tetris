import { Reducer } from "react";
import { AnyAction } from "redux";

let chatKey = 0;

const ENTER_GAME = "ENTER_GAME";
const JOIN_USER = "JOIN_USER";
const CHAT = "CHAT";
const LEAVE_USER = "LEAVE_USER";
const START = "START";
const SET_BLOCKS = "SET_BLOCKS";
const END_GAME_USER = "END_GAME_USER";
const END_GAME = "END_GAME";
const UP_LINE = "UP_LINE";

type GameState = {
	myNum: number;
	state: string;
	users: {
		name: string;
		blocks: [];
	}[];
	chatings: {
		chatingKey: string;
		name: string | null;
		text: string;
	}[];
	personNum: number;
	lineUp: number;
};

const initialState: GameState = {
	myNum: 0,
	state: "대기중",
	users: [],
	chatings: [],
	personNum: 1,
	lineUp: 0,
};

const game: Reducer<GameState, AnyAction> = (
	state: GameState = initialState,
	action: AnyAction
) => {
	switch (action.type) {
		case ENTER_GAME:
			return {
				...state,
				users: action.data.users,
				chatings: [],
				myNum: action.data.myNum,
			};
		case JOIN_USER:
			return {
				...state,
				users: action.data.users,
				chatings: [
					...state.chatings,
					{
						chatingKey: "chat" + chatKey++,
						name: null,
						text: action.data.joinPerson + "님이 입장하셨습니다.",
					},
				],
			};
		case CHAT:
			return {
				...state,
				chatings: state.chatings.concat(action.data.chatings),
			};
		case LEAVE_USER:
			if (action.data.someoneNum < state.myNum) {
				state.myNum--;
			}
			return {
				...state,
				users: action.data.users,
				chatings: [
					...state.chatings,
					{
						chatingKey: "chat" + chatKey++,
						name: null,
						text: action.data.exitPerson + "님이 퇴장하셨습니다.",
					},
				],
				myNum: state.myNum,
			};
		case START:
			return {
				...state,
				state: "게임중",
				users: [
					{
						name: action.data.name,
						blocks: [],
					},
				],
				personNum: action.data.personNum,
			};
		case SET_BLOCKS:
			let user = action.data.user;

			for (let i = 0; i < state.users.length; ++i) {
				if (user === state.users[i].name) {
					state.users[i].blocks = action.data.blocks;
					break;
				}
			}

			return state;

		case END_GAME_USER:
			return state;
		case END_GAME:
			return {
				...state,
				state: "대기중",
				personNum: --state.personNum,
			};
		case UP_LINE:
			if (state.state === "게임중") {
				return {
					...state,
					lineUp: ++state.lineUp,
				};
			}
			return state;
		default:
			return state;
	}
};

export default game;
