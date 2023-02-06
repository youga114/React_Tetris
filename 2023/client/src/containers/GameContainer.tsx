import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import Game from "../components/Game";

const GameContainer = () => {
	const users = useSelector((state: RootState) => state.game.users);
	const me = useSelector((state: RootState) => state.account.me);
	const chatings = useSelector((state: RootState) => state.game.chatings);
	const roomName = useSelector((state: RootState) => state.account.roomName);
	const state = useSelector((state: RootState) => state.game.state);
	const personNum = useSelector((state: RootState) => state.game.personNum);

	const dispatch = useDispatch();
	const sendMessage = useCallback((text) => {
		dispatch({
			type: "server/chat",
			data: {
				speaker: me,
				content: text,
				roomName: roomName,
			},
		});
	}, []);

	const start = useCallback(() => {
		dispatch({
			type: "server/start",
			data: { roomName: roomName },
		});
	}, []);

	const leave = useCallback(() => {
		dispatch({
			type: "server/exit",
			data: {
				roomName: roomName,
				user: me,
			},
		});
	}, []);

	const end = useCallback((blocks) => {
		dispatch({
			type: "server/gameset",
			data: {
				roomName: roomName,
				blocks: blocks,
				user: me,
				rank: personNum,
			},
		});
		if (personNum === 1) {
			dispatch({
				type: "END_GAME",
				data: { rank: personNum },
			});
		}
	}, []);

	const addLine = useCallback(() => {
		dispatch({
			type: "server/lineup",
			data: {
				roomName: roomName,
				randomVar: Math.floor(Math.random() * 10),
			},
		});
	}, []);

	const updateBlocks = useCallback((blocks) => {
		dispatch({
			type: "server/blocks",
			data: {
				roomName: roomName,
				userBlocks: blocks[0],
				user: me,
			},
		});
	}, []);

	return (
		<Game
			users={users}
			me={me}
			chatings={chatings}
			state={state}
			personNum={personNum}
			sendMessage={sendMessage}
			leave={leave}
			start={start}
			end={end}
			addLine={addLine}
			updateBlocks={updateBlocks}
		/>
	);
};

export default GameContainer;
