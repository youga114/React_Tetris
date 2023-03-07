import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import Game from "../components/Game";
import { UPDATE_UP_LINE } from "../modules/game";

const GameContainer = () => {
	const { users, chatings, state, numberOfUsers, master, upLineCount } =
		useSelector((state: RootState) => state.game);
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

	const updateUpLineCount = useCallback((upLineCount: number) => {
		dispatch({
			type: UPDATE_UP_LINE,
			data: {
				upLineCount: upLineCount,
			},
		});
	}, []);

	return (
		<Game
			users={users}
			me={me}
			chatings={chatings}
			state={state}
			numberOfUsers={numberOfUsers}
			upLineCount={upLineCount}
			sendMessage={sendMessage}
			master={master}
			leave={leave}
			start={start}
			end={end}
			addLine={addLine}
			updateBlocks={updateBlocks}
			updateUpLineCount={updateUpLineCount}
		/>
	);
};

export default React.memo(GameContainer);
