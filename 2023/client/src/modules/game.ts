import { ENTER_GAME } from "./account";

let chatKey = 0;

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

function reducer(state: GameState = initialState, action): GameState {
	switch (action.type) {
		case ENTER_GAME:
			return {
				...state,
				users: action.data.user,
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
						name: me,
						blocks: [],
					},
				],
				personNum: action.data.personNum,
			};
		case SET_BLOCKS:
			let user = action.data.user;

			state.blocks.forEach((block) => {});

			if (enemyNum === 0) {
				return {
					...state,
					blocks2: action.data.blocks,
				};
			} else if (enemyNum === 1) {
				return {
					...state,
					blocks3: action.data.blocks,
				};
			} else if (enemyNum === 2) {
				return {
					...state,
					blocks4: action.data.blocks,
				};
			} else if (enemyNum === 3) {
				return {
					...state,
					blocks5: action.data.blocks,
				};
			} else if (enemyNum === 4) {
				return {
					...state,
					blocks6: action.data.blocks,
				};
			} else {
				return state;
			}
		case END_GAME_USER:
			enemyNum = action.data.enemyNum;
			if (enemyNum > state.myNum) {
				enemyNum--;
			}
			if (state.personNum < 3) {
				if (enemyNum === 0) {
					return {
						...state,
						blocks2: action.data.blocks,
						enemyRank2: action.data.enemyRank,
						personNum: --state.personNum,
						state: "대기중",
					};
				} else if (enemyNum === 1) {
					return {
						...state,
						blocks3: action.data.blocks,
						enemyRank3: action.data.enemyRank,
						personNum: --state.personNum,
						state: "대기중",
					};
				} else if (enemyNum === 2) {
					return {
						...state,
						blocks4: action.data.blocks,
						enemyRank4: action.data.enemyRank,
						personNum: --state.personNum,
						state: "대기중",
					};
				} else if (enemyNum === 3) {
					return {
						...state,
						blocks5: action.data.blocks,
						enemyRank5: action.data.enemyRank,
						personNum: --state.personNum,
						state: "대기중",
					};
				} else if (enemyNum === 4) {
					return {
						...state,
						blocks6: action.data.blocks,
						enemyRank6: action.data.enemyRank,
						personNum: --state.personNum,
						state: "대기중",
					};
				} else {
					return state;
				}
			} else {
				if (enemyNum === 0) {
					return {
						...state,
						blocks2: action.data.blocks,
						enemyRank2: action.data.enemyRank,
						personNum: --state.personNum,
					};
				} else if (enemyNum === 1) {
					return {
						...state,
						blocks3: action.data.blocks,
						enemyRank3: action.data.enemyRank,
						personNum: --state.personNum,
					};
				} else if (enemyNum === 2) {
					return {
						...state,
						blocks4: action.data.blocks,
						enemyRank4: action.data.enemyRank,
						personNum: --state.personNum,
					};
				} else if (enemyNum === 3) {
					return {
						...state,
						blocks5: action.data.blocks,
						enemyRank5: action.data.enemyRank,
						personNum: --state.personNum,
					};
				} else if (enemyNum === 4) {
					return {
						...state,
						blocks6: action.data.blocks,
						enemyRank6: action.data.enemyRank,
						personNum: --state.personNum,
					};
				} else {
					return state;
				}
			}
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
					lineup: ++state.lineup,
					randomVar: action.data.randomVar,
				};
			}
			return state;
		default:
			return state;
	}
}

export default reducer;
