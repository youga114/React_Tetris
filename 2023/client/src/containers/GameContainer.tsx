import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import Game from "../components/Game";

const GameContainer = () => {
	const { users, chatings, state, numberOfUsers, master } = useSelector(
		(state: RootState) => state.game
	);
	const { me, roomName } = useSelector((state: RootState) => state.account);

	const dispatch = useDispatch();
	const sendMessage = useCallback(
		(text: string) => {
			dispatch({
				type: "server/chat",
				data: {
					user: me,
					text: text,
					roomName: roomName,
				},
			});
		},
		[roomName]
	);

	const start = useCallback(() => {
		dispatch({
			type: "server/start",
			data: { roomName: roomName },
		});
	}, [roomName]);

	const leave = useCallback(() => {
		dispatch({
			type: "server/exit",
			data: {
				roomName: roomName,
				user: me,
			},
		});
	}, [roomName]);

	const end = useCallback(() => {
		dispatch({
			type: "server/gameset",
			data: {
				roomName: roomName,
				user: me,
				rank: numberOfUsers,
			},
		});
	}, [roomName, numberOfUsers]);

	const addLine = useCallback(
		(upLineCount) => {
			dispatch({
				type: "server/lineup",
				data: {
					roomName: roomName,
					randomVar: Math.floor(Math.random() * 10),
					upLineCount: upLineCount,
				},
			});
		},
		[roomName]
	);

	const updateBlocks = useCallback(
		(
			blocks: {
				key: number;
				shape: number;
				y: number;
				x: number;
				color: string;
			}[]
		) => {
			dispatch({
				type: "server/blocks",
				data: {
					roomName: roomName,
					blocks: blocks,
					user: me,
				},
			});
		},
		[roomName]
	);

	return (
		<Game
			users={users}
			me={me}
			chatings={chatings}
			state={state}
			numberOfUsers={numberOfUsers}
			sendMessage={sendMessage}
			leave={leave}
			start={start}
			end={end}
			addLine={addLine}
			updateBlocks={updateBlocks}
			master={master}
		/>
	);
};

export default React.memo(GameContainer);
