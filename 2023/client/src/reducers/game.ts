let chatKey = 0;

function insertItem(array, action) {
	let newArray = array.slice();
	newArray.splice(newArray.length, 0, [
		"chat" + chatKey++,
		action.data.speaker,
		action.data.content,
	]);
	return newArray;
}

const initialState = {
	users: [],
	chatings: [],
	myNum: 0,
	state: "대기중",
	personNum: 1,
	// blocks: [],
	// blocks2: [],
	// blocks3: [],
	// blocks4: [],
	// blocks5: [],
	// blocks6: [],
	// enemyRank2: "",
	// enemyRank3: "",
	// enemyRank4: "",
	// enemyRank5: "",
	// enemyRank6: "",
	gameset: 1,
	lineup: 0,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "getGames":
			return { ...state, rooms: action.data };
		case "enterGame":
			return {
				...state,
				users: action.data.user,
				chatings: [],
				myNum: action.data.myNum,
			};
		case "joinUser":
			let chatContent = state.chatings;
			chatContent.push([
				"chat" + chatKey++,
				"join",
				action.data.joinPerson + "님이 입장하셨습니다.",
			]);
			return {
				...state,
				users: action.data.users,
				chatings: chatContent,
			};
		case "chat":
			return {
				...state,
				chatings: insertItem(state.chatings, action),
			};
		case "someoneExit":
			if (action.data.someoneNum < state.myNum) {
				state.myNum--;
			}
			var chatContent2 = state.chatings;
			chatContent2.push([
				"chat" + chatKey++,
				"join",
				action.data.exitPerson + "님이 퇴장하셨습니다.",
			]);
			return {
				...state,
				users: action.data.users,
				chatings: chatContent2,
				myNum: state.myNum,
			};
		case "roomExit":
			return {
				...state,
				users: [],
				chatings: [],
				roomName: "lobby",
			};
		case "start":
			return {
				...state,
				state: "게임중",
				personNum: action.data.personNum,
				// enemyRank2: "",
				// enemyRank3: "",
				// enemyRank4: "",
				// enemyRank5: "",
				// enemyRank6: "",
				blocks: [],
				// blocks2: [],
				// blocks3: [],
				// blocks4: [],
				// blocks5: [],
				// blocks6: [],
				gameset: 0,
			};
		case "blocks":
			let enemyNum = action.data.enemyNum;
			if (enemyNum > state.myNum) {
				enemyNum--;
			}
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
		case "gameset":
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
		case "gameset2":
			return { ...state, gameset: 1 };
		case "gamesetTome":
			return {
				...state,
				state: "대기중",
				personNum: --state.personNum,
			};
		case "lineup":
			if (state.gameset === 0) {
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
