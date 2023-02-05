import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Game from "../components/Game";

const GameContainer = () => {
	const users = useSelector((state) => state.game.users);
	const me = useSelector((state) => state.account.me);
	const chatings = useSelector((state) => state.game.chatings);
	const roomName = useSelector((state) => state.account.roomName);
	const myNum = useSelector((state) => state.game.myNum);
	const state = useSelector((state) => state.game.state);
	const personNum = useSelector((state) => state.game.personNum);
	const blocks = useSelector((state) => state.game.blocks);
	const blocks2 = useSelector((state) => state.game.blocks2);
	const blocks3 = useSelector((state) => state.game.blocks3);
	const blocks4 = useSelector((state) => state.game.blocks4);
	const blocks5 = useSelector((state) => state.game.blocks5);
	const blocks6 = useSelector((state) => state.game.blocks6);
	const enemyRank2 = useSelector((state) => state.game.enemyRank2);
	const enemyRank3 = useSelector((state) => state.game.enemyRank3);
	const enemyRank4 = useSelector((state) => state.game.enemyRank4);
	const enemyRank5 = useSelector((state) => state.game.enemyRank5);
	const enemyRank6 = useSelector((state) => state.game.enemyRank6);
	const blockKey = useSelector((state) => state.game.blockKey);
	const lineup = useSelector((state) => state.game.lineup);
	const randomVar = useSelector((state) => state.game.randomVar);

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
				someoneNum: myNum,
			},
		});
	}, []);

	const end = useCallback(() => {
		dispatch({
			type: "server/gameset",
			data: {
				roomName: roomName,
				blocks: blocks,
				myNum: myNum,
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

	const down = useCallback(() => {
		dispatch({
			type: "server/blocks",
			data: {
				roomName: roomName,
				blocks: blocks,
				myNum: myNum,
			},
		});
	}, []);

	const addLine = useCallback(() => {
		dispatch({
			type: "server/lineup",
			data: {
				roomName: roomName,
				randomVar: randomVar,
			},
		});
	}, []);

	const updateBlocks = useCallback(() => {
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
			roomName={roomName}
			myNum={myNum}
			state={state}
			personNum={personNum}
			blocks={blocks}
			blocks2={blocks2}
			blocks3={blocks3}
			blocks4={blocks4}
			blocks5={blocks5}
			blocks6={blocks6}
			enemyRank2={enemyRank2}
			enemyRank3={enemyRank3}
			enemyRank4={enemyRank4}
			enemyRank5={enemyRank5}
			enemyRank6={enemyRank6}
			sendMessage={sendMessage}
			leave={leave}
			start={start}
			end={end}
			down={down}
			addLine={addLine}
			updateBlocks={updateBlocks}
		/>
	);
};

export default GameContainer;
