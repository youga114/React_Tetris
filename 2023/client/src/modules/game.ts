import { AnyAction } from "redux";
import produce from "immer";

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
	return produce(state, (draft) => {
		switch (action.type) {
			case ENTER_GAME:
				draft.users = action.data.users;
				draft.master = action.data.master;
				break;
			case JOIN_USER:
				draft.users = action.data.users;
				draft.chatings.push({
					chatingKey: "chat" + chatKey++,
					user: null,
					text: action.data.joinPerson + "님이 입장하셨습니다.",
				});
				break;
			case CHAT:
				draft.chatings.push(...state.chatings, {
					chatingKey: "chat" + chatKey++,
					user: action.data.user,
					text: action.data.text,
				});
				break;
			case LEAVE_USER:
				draft.users = action.data.users;
				draft.chatings.push({
					chatingKey: "chat" + chatKey++,
					user: null,
					text: action.data.exitPerson + "님이 퇴장하셨습니다.",
				});
				break;
			case START:
				draft.state = "게임중";
				draft.numberOfUsers = action.data.numberOfUsers;
				break;
			case SET_BLOCKS:
				let user = action.data.user;
				for (let i = 0; i < draft.users.length; ++i) {
					if (user === draft.users[i].name) {
						draft.users[i].blocks = action.data.blocks;
						break;
					}
				}
				break;
			case END_GAME_USER:
				break;
			case END_GAME:
				draft.state = "대기중";
				draft.numberOfUsers -= 1;
				break;
			case UP_LINE:
				if (draft.state === "게임중") {
					draft.lineUp += 1;
				}
				break;
			default:
				break;
		}
	});
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
