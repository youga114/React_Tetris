import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Lobby from "../components/Lobby";

const LobbyContainer = () => {
	const games = useSelector((state) => state.lobby.rooms);
	const me = useSelector((state) => state.account.me);
	const dispatch = useDispatch();
	const onCreate = useCallback(() =>
		dispatch({
			type: "server/make",
			data: {
				name: prompt("방 이름을 입력하세요", ""),
				master: me,
			},
		})
	);

	return (
		<Lobby games={games} me={me} onCreate={onCreate} />
	);
};

export default LobbyContainer;
