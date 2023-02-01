import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameItem from "../components/GameItem";

const GameItemContainer = (props) => {
	const me = useSelector((state) => state.account.me);
	const dispatch = useDispatch();
	const onJoin = useCallback(() =>
		dispatch({
			type: "server/join",
			data: {
				name: me,
				roomNum: props.gameNum,
			},
		})
	);

	return <GameItem {...props} onJoin={onJoin} />;
};

export default React.memo(GameItemContainer);
