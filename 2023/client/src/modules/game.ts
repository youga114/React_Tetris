import { AnyAction } from "redux";
import produce from "immer";

type GameState = {
	state: string;
	users: {
		name: string;
		blocks: [];
		rank: string;
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

const ENTER_GAME = "ENTER_GAME";
const JOIN_USER = "JOIN_USER";
const CHAT = "CHAT";
const LEAVE_USER = "LEAVE_USER";
const START = "START";
const SET_BLOCKS = "SET_BLOCKS";
const END_GAME_USER = "END_GAME_USER";
const UP_LINE = "UP_LINE";
const PLAYING = "PLAYING";

const initialState: GameState = {
	state: "대기중",
	users: [],
	chatings: [],
	numberOfUsers: 1,
	lineUp: 0,
	master: "",
};

let chatKey = 0;

const game = (state: GameState = initialState, action: AnyAction) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ENTER_GAME: {
				draft.users = action.data.users;
				draft.master = action.data.master;
				break;
			}
			case JOIN_USER: {
				draft.users.push(action.data.user);
				draft.chatings.push({
					chatingKey: "chat" + chatKey++,
					user: null,
					text: action.data.joinPerson + "님이 입장하셨습니다.",
				});
				break;
			}
			case CHAT: {
				draft.chatings.push({
					chatingKey: "chat" + chatKey++,
					user: action.data.user,
					text: action.data.text,
				});
				break;
			}
			case LEAVE_USER: {
				draft.chatings.push({
					chatingKey: "chat" + chatKey++,
					user: null,
					text: action.data.user + "님이 퇴장하셨습니다.",
				});
				let user = action.data.user;
				for (let i = 0; i < draft.users.length; ++i) {
					if (user === draft.users[i].name) {
						draft.users.splice(i, 1);
						break;
					}
				}

				if (draft.master !== action.data.master) {
					draft.master = action.data.master;
				}
				break;
			}
			case START: {
				draft.users.forEach((user) => {
					user.blocks = [];
					user.rank = "";
				});
				draft.state = "게임중";
				draft.numberOfUsers = action.data.numberOfUsers;
				break;
			}
			case SET_BLOCKS: {
				let user = action.data.user;
				for (let i = 0; i < draft.users.length; ++i) {
					if (user === draft.users[i].name) {
						draft.users[i].blocks = action.data.blocks;
						break;
					}
				}
				break;
			}
			case END_GAME_USER: {
				draft.numberOfUsers -= 1;

				if (draft.numberOfUsers <= 1) {
					draft.state = "대기중";
				}

				let user = action.data.user;
				for (let i = 0; i < draft.users.length; ++i) {
					if (user === draft.users[i].name) {
						draft.users[i].rank = action.data.rank;
						break;
					}
				}
				break;
			}
			case UP_LINE: {
				if (draft.state === "게임중") {
					draft.lineUp += 1;
				}
				break;
			}
			case PLAYING: {
				draft.state = "게임중";
				break;
			}
			default: {
				break;
			}
		}
	});
};

export default game;

export const playing = () => {
	return {
		type: PLAYING,
	};
};
