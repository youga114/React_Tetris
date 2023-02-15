import { AnyAction } from "redux";

type GameState = {
	state: string;
	users: {
		name: string;
		blocks: [];
	}[];
	chatings: {
		chatingKey: string;
		user: string | null;
		text: string;
	}[];
	numberOfUsers: number;
	lineUp: number;
	master: string;
};

const initialState: GameState = {
	state: "대기중",
	users: [],
	chatings: [],
	numberOfUsers: 1,
	lineUp: 0,
	master: "",
};

const game = (state: GameState = initialState, action: AnyAction) => {
	switch (action.type) {
		case ENTER_GAME:
			return {
				...state,
				users: action.data.users,
				master: action.data.master,
			};
		case JOIN_USER:
			return {
				...state,
				users: action.data.users,
				chatings: [
					...state.chatings,
					{
						chatingKey: "chat" + chatKey++,
						user: null,
						text: action.data.joinPerson + "님이 입장하셨습니다.",
					},
				],
			};
		case CHAT:
			return {
				...state,
				chatings: [
					...state.chatings,
					{
						chatingKey: "chat" + chatKey++,
						user: action.data.user,
						text: action.data.text,
					},
				],
			};
		case LEAVE_USER:
			return {
				...state,
				users: action.data.users,
				chatings: [
					...state.chatings,
					{
						chatingKey: "chat" + chatKey++,
						user: null,
						text: action.data.exitPerson + "님이 퇴장하셨습니다.",
					},
				],
			};
		case START:
			return {
				...state,
				state: "게임중",
				numberOfUsers: action.data.numberOfUsers,
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
				numberOfUsers: --state.numberOfUsers,
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
