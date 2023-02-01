import { combineReducers } from "redux";
import account from "./account";
import lobby from "./lobby";
import game from "./game";

const rootReducer = combineReducers({
	account,
	lobby,
	game,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
