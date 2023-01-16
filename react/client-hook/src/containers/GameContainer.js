import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Game from "../components/Game";

const GameContainer = (props) => {
	const me = useSelector((state) => state.account.me);
	const dispatch = useDispatch();
	const onJoin = useCallback(() =>
		dispatch({
			type: "server/join",
			data: {
				user: me,
				roomNum: props.gameNum,
			},
		})
	);

	return <Game {...props} onJoin={onJoin} />;
};

export default React.memo(GameContainer);
