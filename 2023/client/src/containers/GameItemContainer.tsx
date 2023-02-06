import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameItem from "../components/GameItem";
import { RootState } from "../modules";

const GameItemContainer = (props: {
	gameNum: number;
	numberOfPeople: number;
	title: string;
	master: string;
	state: string;
}) => {
	const me = useSelector((state: RootState) => state.account.me);
	const dispatch = useDispatch();
	const onJoin = useCallback(() => {
		dispatch({
			type: "server/join",
			data: {
				name: me,
				roomNum: props.gameNum,
			},
		});
	}, []);

	return <GameItem {...props} onJoin={onJoin} />;
};

export default React.memo(GameItemContainer);
