/** @jsx jsx */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/react";
import backgroundImage from "../img/background.jpg";

const KEY_CODE = {
	ENTER: 13,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
};

const BLOCK_SHAPE = {
	SQUARE: 0,
	LINEAR: 1,
	FALCI_SHAPE: 2,
	REVERSE_FALCI_SHAPE: 3,
	MOUNTINE_SHAPE: 4,
	BENT_UP_LINE: 5,
	BENT_DOWN_LINE: 6,
};

const BLOCK = {
	WIDTH: 20,
	HEIGHT: 20,
	BORDER_WIDTH: 2,
};

const GAME_WINDOW = {
	LEFT: 740,
	TOP: 140,
	WIDTH: BLOCK.WIDTH * 10,
	HEIGHT: BLOCK.HEIGHT * 20,
	BORDER_WIDTH: 10,
};

const PREVIEW_WINDOW = {
	WIDTH: BLOCK.WIDTH * 4,
	HEIGHT: BLOCK.HEIGHT * 4,
	BORDER_WIDTH: 5,
};

const NUMBER_OF_BLOCKS = 4;

const Body = styled.div`
	height: 100vh;
	width: 100vw;
	margin: 0px;
	background-image: url(${backgroundImage});
	background-size: cover;
`;
const TetrisTemplate = styled.div`
	width: 512px;
	margin-left: auto;
	margin-right: auto;
	margin-top: auto;
`;
const GameWindow = styled.div`
	position: relative;
	border-width: ${GAME_WINDOW.BORDER_WIDTH}px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: ${GAME_WINDOW.WIDTH}px;
	height: ${GAME_WINDOW.HEIGHT}px;
	left: ${GAME_WINDOW.LEFT}px;
	top: ${GAME_WINDOW.TOP}px;
	overflow: hidden;
`;
const FirstPreviewWindow = styled.div`
	position: relative;
	border-width: ${PREVIEW_WINDOW.BORDER_WIDTH}px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: ${PREVIEW_WINDOW.WIDTH}px;
	height: ${PREVIEW_WINDOW.HEIGHT}px;
	left: ${GAME_WINDOW.LEFT -
	(PREVIEW_WINDOW.WIDTH + 2 * PREVIEW_WINDOW.BORDER_WIDTH)}px;
	top: ${GAME_WINDOW.TOP}px;
	overflow: hidden;
`;
const SecondPreviewWindow = styled.div`
	position: relative;
	border-width: ${PREVIEW_WINDOW.BORDER_WIDTH}px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: ${PREVIEW_WINDOW.WIDTH}px;
	height: ${PREVIEW_WINDOW.HEIGHT}px;
	left: ${GAME_WINDOW.LEFT -
	(PREVIEW_WINDOW.WIDTH + 2 * PREVIEW_WINDOW.BORDER_WIDTH)}px;
	top: ${GAME_WINDOW.TOP +
	(PREVIEW_WINDOW.HEIGHT + 2 * PREVIEW_WINDOW.BORDER_WIDTH)}px;
	overflow: hidden;
`;
const EnemyWindow1 = styled.div`
	position: relative;
	border-width: 6px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 130px;
	height: 260px;
	left: 40px;
	top: 40px;
	overflow: hidden;
`;
const EnemyWindow2 = styled.div`
	position: relative;
	border-width: 6px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 130px;
	height: 260px;
	left: 40px;
	top: 390px;
	overflow: hidden;
`;
const EnemyWindow3 = styled.div`
	position: absolute;
	border-width: 6px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 130px;
	height: 260px;
	left: 210px;
	top: 40px;
	overflow: hidden;
`;
const EnemyWindow4 = styled.div`
	position: relative;
	border-width: 6px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 130px;
	height: 260px;
	left: 210px;
	top: 390px;
	overflow: hidden;
`;
const EnemyWindow5 = styled.div`
	position: relative;
	border-width: 6px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 130px;
	height: 260px;
	left: 380px;
	top: 390px;
	overflow: hidden;
`;
const Id = styled.div`
	position: relative;
	top: 114px;
	left: 740px;
	width: 205px;
	height: 20px;
	text-align: center;
	font-size: 15px;
	background-color: white;
	border-style: solid;
`;
const You1 = styled.div`
	position: relative;
	top: 16px;
	left: 40px;
	height: 20px;
	width: 136px;
	text-align: center;
	font-size: 15px;
	border-style: solid;
	background-color: white;
`;
const You2 = css`
	position: relative;
	top: 366px;
	left: 40px;
	height: 20px;
	width: 136px;
	text-align: center;
	font-size: 15px;
	border-style: solid;
	background-color: white;
`;
const You3 = css`
	position: relative;
	top: 16px;
	left: 210px;
	height: 20px;
	width: 136px;
	text-align: center;
	font-size: 15px;
	border-style: solid;
	background-color: white;
`;
const You4 = css`
	position: relative;
	top: 366px;
	left: 210px;
	height: 20px;
	width: 136px;
	text-align: center;
	font-size: 15px;
	border-style: solid;
	background-color: white;
`;
const You5 = css`
	position: relative;
	top: 366px;
	left: 380px;
	height: 20px;
	width: 136px;
	text-align: center;
	font-size: 15px;
	border-style: solid;
	background-color: white;
`;
const StartButton = styled.button`
	padding: 0;
	position: relative;
	border-width: 4px;
	border-style: outset;
	border-color: skyblue;
	background-color: skyblue;
	width: 80px;
	height: 30px;
	left: 1010px;
	top: 425px;
	overflow: hidden;
	text-align: center;
	font-size: 18px;
`;
const ExitButton = styled.button`
	padding: 0;
	position: relative;
	border-width: 4px;
	border-style: outset;
	border-color: skyblue;
	background-color: skyblue;
	width: 80px;
	height: 30px;
	left: 1110px;
	top: 425px;
	overflow: hidden;
	text-align: center;
	font-size: 18px;
`;
const ChatingBox = styled.div`
	text-align: left;
	position: relative;
	background-color: rgb(212, 244, 250);
	width: 200px;
	border-style: solid;
	height: 200px;
	position: absolute;
	top: 140px;
	left: 1000px;
	font-size: 10px;
	overflow: auto;
	z-index: 500;
`;
const InputBox = styled.input`
	position: relative;
	border-style: solid;
	width: 170px;
	height: 20px;
	font-size: 10px;
	top: 342px;
	left: 1000px;
	z-index: 150;
`;
const SendButton = styled.button`
	position: relative;
	width: 34px;
	height: 25px;
	left: 1171px;
	top: 342px;
	font-size: 14px;
	color: black;
	text-align: center;
	padding: 0;
	z-index: 100;
`;
const BlockStyle = css`
	position: relative;
	border-width: ${BLOCK.BORDER_WIDTH}px;
	border-color: white;
	border-style: outset;
	width: ${BLOCK.WIDTH - BLOCK.BORDER_WIDTH * 2}px;
	height: ${BLOCK.HEIGHT - BLOCK.BORDER_WIDTH * 2}px;
	left: 76px;
	top: -19px;
`;
const EnemyBlockStyle = css`
	position: relative;
	border-width: 1px;
	border-color: white;
	border-style: outset;
	width: 11px;
	height: 11px;
	left: 76px;
	top: -19px;
`;
const Ranking = styled.div`
	position: relative;
	color: white;
	font-size: 80px;
	left: 75px;
	top: 135px;
`;
const EnemyRanking = styled.div`
	position: relative;
	color: white;
	font-size: 50px;
	left: 45px;
	top: 95px;
`;

let blockKey = 1;
let upLineCount = 1;
let dropMilliseconds = 300;

const createPreviewBlock = () => {
	const PREVIEW_WINDOW_CENTER_X = PREVIEW_WINDOW.WIDTH / 2;
	const PREVIEW_WINDOW_CENTER_Y = PREVIEW_WINDOW.HEIGHT / 2;

	switch (Math.floor(Math.random() * 7)) {
		case BLOCK_SHAPE.SQUARE:
			return [
				[
					blockKey++,
					BLOCK_SHAPE.SQUARE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"red",
				],
				[
					blockKey++,
					BLOCK_SHAPE.SQUARE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"red",
				],
				[
					blockKey++,
					BLOCK_SHAPE.SQUARE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"red",
				],
				[
					blockKey++,
					BLOCK_SHAPE.SQUARE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"red",
				],
			];
		case BLOCK_SHAPE.LINEAR:
			return [
				[
					blockKey++,
					BLOCK_SHAPE.LINEAR,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"purple",
				],
				[
					blockKey++,
					BLOCK_SHAPE.LINEAR,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"purple",
				],
				[
					blockKey++,
					BLOCK_SHAPE.LINEAR,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X,
					"purple",
				],
				[
					blockKey++,
					BLOCK_SHAPE.LINEAR,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X + BLOCK.WIDTH,
					"purple",
				],
			];
		case BLOCK_SHAPE.FALCI_SHAPE:
			return [
				[
					blockKey++,
					BLOCK_SHAPE.FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"pink",
				],
				[
					blockKey++,
					BLOCK_SHAPE.FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X,
					"pink",
				],
				[
					blockKey++,
					BLOCK_SHAPE.FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"pink",
				],
				[
					blockKey++,
					BLOCK_SHAPE.FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X,
					"pink",
				],
			];
		case BLOCK_SHAPE.REVERSE_FALCI_SHAPE:
			return [
				[
					blockKey++,
					BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"yellow",
				],
				[
					blockKey++,
					BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"yellow",
				],
				[
					blockKey++,
					BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X,
					"yellow",
				],
				[
					blockKey++,
					BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"yellow",
				],
			];
		case BLOCK_SHAPE.MOUNTINE_SHAPE:
			return [
				[
					blockKey++,
					BLOCK_SHAPE.MOUNTINE_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"orange",
				],
				[
					blockKey++,
					BLOCK_SHAPE.MOUNTINE_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"orange",
				],
				[
					blockKey++,
					BLOCK_SHAPE.MOUNTINE_SHAPE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X,
					"orange",
				],
				[
					blockKey++,
					BLOCK_SHAPE.MOUNTINE_SHAPE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"orange",
				],
			];
		case BLOCK_SHAPE.BENT_UP_LINE:
			return [
				[
					blockKey++,
					BLOCK_SHAPE.BENT_UP_LINE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"green",
				],
				[
					blockKey++,
					BLOCK_SHAPE.BENT_UP_LINE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"green",
				],
				[
					blockKey++,
					BLOCK_SHAPE.BENT_UP_LINE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X,
					"green",
				],
				[
					blockKey++,
					BLOCK_SHAPE.BENT_UP_LINE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"green",
				],
			];
		case BLOCK_SHAPE.BENT_DOWN_LINE:
			return [
				[
					blockKey++,
					BLOCK_SHAPE.BENT_DOWN_LINE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"blue",
				],
				[
					blockKey++,
					BLOCK_SHAPE.BENT_DOWN_LINE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X,
					"blue",
				],
				[
					blockKey++,
					BLOCK_SHAPE.BENT_DOWN_LINE,
					PREVIEW_WINDOW_CENTER_Y - BLOCK.HEIGHT,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH * 2,
					"blue",
				],
				[
					blockKey++,
					BLOCK_SHAPE.BENT_DOWN_LINE,
					PREVIEW_WINDOW_CENTER_Y,
					PREVIEW_WINDOW_CENTER_X - BLOCK.WIDTH,
					"blue",
				],
			];
		default:
			return [];
	}
};

const getMainBlock = (blocks) => {
	blocks.forEach((block) => {
		block[3] += GAME_WINDOW.WIDTH / 2 - PREVIEW_WINDOW.WIDTH / 2;
		block[2] -= PREVIEW_WINDOW.HEIGHT / 2;
	});

	return blocks;
};

const isOverd = (blocks) => {
	for (let i = blocks.length - 4; i < blocks.length; ++i) {
		if (
			blocks[i][2] >= BLOCK.HEIGHT * 20 ||
			blocks[i][3] >= BLOCK.WIDTH * 10 ||
			blocks[i][3] < 0
		) {
			return true;
		}

		for (let j = 0; j < blocks.length - 4; ++j) {
			if (
				blocks[i][2] === blocks[j][2] &&
				blocks[i][3] === blocks[j][3]
			) {
				return true;
			}
		}
	}

	return false;
};

const Game = ({
	users,
	me,
	chatings,
	myNum,
	state,
	personNum,
	lineup,
	blocks2,
	blocks3,
	blocks4,
	blocks5,
	blocks6,
	enemyRank2,
	enemyRank3,
	enemyRank4,
	enemyRank5,
	enemyRank6,
	sendMessage,
	leave,
	start,
	end,
	down,
	addLine,
	updateBlocks,
}) => {
	const [blocks, setBlocks] = useState([]);
	const [firstWaitingBlock, setFirstWaitingBlock] = useState([]);
	const [secondWaitingBlock, setSecondWaitingBlock] = useState([]);
	const [chatingInputText, setChatingInputText] = useState("");
	const [rank, setRank] = useState("");

	const timeIntervalId = useRef(0);
	const downBlockRef = useRef();
	const inputEl = useRef(null);
	const getGameControllKey = useRef();
	const gameControllKeyListener = useRef((event) => {
		getGameControllKey.current(event);
	});

	useEffect(() => {
		window.addEventListener("keydown", getChatingEnterKey, false);
		return () => {
			window.removeEventListener("keydown", getChatingEnterKey, false);
		};
	}, []);

	const getChatingEnterKey = useCallback((event) => {
		let keyCode = 0;
		if (event == null) {
			keyCode = window.event.keyCode;
			window.event.preventDefault();
		} else {
			keyCode = event.keyCode;
		}
		switch (keyCode) {
			case KEY_CODE.ENTER:
				sendMessage();
				break;
			default:
				return;
		}
	});

	const initialize = useCallback(() => {
		window.addEventListener(
			"keydown",
			gameControllKeyListener.current,
			false
		);

		blockKey = 1;

		setRank("");
		setBlocks(getMainBlock(createPreviewBlock()));
		setFirstWaitingBlock(createPreviewBlock());
		setSecondWaitingBlock(createPreviewBlock());

		timeIntervalId.current = setInterval(() => {
			downBlockRef.current();
		}, dropMilliseconds);

		start();
	});

	const downBlock = useCallback(() => {
		for (let i = blocks.length - 4; i < blocks.length; i++) {
			blocks[i][2] += BLOCK.HEIGHT;
		}

		if (isOverd(blocks) === false) {
			setBlocks(blocks.map((block) => block.slice()));

			return true;
		}

		for (let i = blocks.length - 4; i < blocks.length; i++) {
			blocks[i][2] -= BLOCK.HEIGHT;
		}

		clearFilledLine();

		blocks.push(...getMainBlock(firstWaitingBlock));

		setBlocks(blocks.map((block) => block.slice()));
		setFirstWaitingBlock(secondWaitingBlock);
		setSecondWaitingBlock(createPreviewBlock());

		if (isOverd(blocks) === true) {
			finishGame();
		}

		down();

		return false;
	}, [blocks]);

	downBlockRef.current = downBlock;

	const clearFilledLine = useCallback(() => {
		let cloneBlocks = blocks.map((block) => block.slice());

		for (let i = cloneBlocks.length - 4; i < cloneBlocks.length; i++) {
			let sameHeightBlockIdx = [];
			let blockHeight = cloneBlocks[i][2];
			for (let j = 0; j < blocks.length; j++) {
				if (blocks[j][2] === blockHeight) {
					sameHeightBlockIdx.push(j);
				}
			}
			if (sameHeightBlockIdx.length > 9) {
				for (let j = 0; j < blocks.length; j++) {
					if (blocks[j][2] < blockHeight) {
						blocks[j][2] += BLOCK.HEIGHT;
					}
				}
				for (let k = 9; k >= 0; k--) {
					blocks.splice(sameHeightBlockIdx[k], 1);
				}
			}
		}

		setBlocks(blocks.map((block) => block.slice()));
		addLine();
		updateBlocks(blocks.map((block) => block.slice()));
	}, [blocks]);

	const finishGame = useCallback(() => {
		setRank(personNum);
		window.removeEventListener(
			"keydown",
			gameControllKeyListener.current,
			false
		);
		clearInterval(timeIntervalId.current);

		for (let i = 0; i < blocks.length; i++) {
			blocks[i][4] = "rgb(166,166,166)";
		}

		setBlocks(blocks.map((block) => block.slice()));

		end(blocks.map((block) => block.slice()));
	}, [blocks]);

	const upLine = () => {
		let emptyBlockIdx = Math.floor(Math.random() * 10);

		if (upLineCount <= personNum - 2) {
			upLineCount += 1;
			return;
		}

		for (let i = 0; i < blocks.length - 4; i++) {
			blocks[i][2] -= BLOCK.HEIGHT;
		}
		for (let i = 0; i < 10; i++) {
			if (emptyBlockIdx !== i) {
				blocks.splice(0, 0, [
					blockKey++,
					"line",
					GAME_WINDOW.HEIGHT - BLOCK.HEIGHT,
					BLOCK.WIDTH * i,
					"rgb(166,166,166)",
				]);
			}
		}
		for (let i = blocks.length - 4; i < blocks.length; i++) {
			for (let j = 0; j < blocks.length - 4; j++) {
				if (
					blocks[i][3] === blocks[j][3] &&
					blocks[i][2] === blocks[j][2]
				) {
					for (let k = blocks.length - 4; k < blocks.length; k++) {
						blocks[k][2] -= BLOCK.HEIGHT;
					}
					j -= 1;
				}
			}
		}

		upLineCount = 1;
	};

	getGameControllKey.current = (event) => {
		let keyCode = 0;
		if (event === null) {
			keyCode = window.event.keyCode;
			window.event.preventDefault();
		} else {
			keyCode = event.keyCode;
			event.preventDefault();
		}

		let movedBlocks = blocks.map((block) => block.slice());

		switch (keyCode) {
			case KEY_CODE.SPACE:
				while (downBlock());
				break;
			case KEY_CODE.LEFT:
				for (
					let i = movedBlocks.length - 4;
					i < movedBlocks.length;
					i++
				) {
					movedBlocks[i][3] -= BLOCK.WIDTH;
				}

				if (isOverd(movedBlocks) === true) {
					return;
				}

				setBlocks(movedBlocks);
				break;
			case KEY_CODE.UP:
				rotateBlock();
				break;
			case KEY_CODE.RIGHT:
				for (
					let i = movedBlocks.length - 4;
					i < movedBlocks.length;
					i++
				) {
					movedBlocks[i][3] += BLOCK.WIDTH;
				}

				if (isOverd(movedBlocks) === true) {
					return;
				}

				setBlocks(movedBlocks);
				break;
			case KEY_CODE.DOWN:
				downBlock();
				break;
			default:
				break;
		}
	};

	const rotateBlock = useCallback(() => {
		if (blocks[blocks.length - 1][1] === BLOCK_SHAPE.SQUARE) {
			return;
		}

		let rotatedBlocks = blocks.map((block) => block.slice());

		let centerX = rotatedBlocks[rotatedBlocks.length - 4][3];
		let centerY = rotatedBlocks[rotatedBlocks.length - 4][2];

		for (
			let i = rotatedBlocks.length - NUMBER_OF_BLOCKS;
			i < rotatedBlocks.length;
			++i
		) {
			const dx = rotatedBlocks[i][3] - centerX;
			const dy = rotatedBlocks[i][2] - centerY;
			rotatedBlocks[i][2] = centerY + dx;
			rotatedBlocks[i][3] = centerX - dy;
		}

		if (isOverd(rotatedBlocks) === true) {
			for (
				let i = rotatedBlocks.length - 4;
				i < rotatedBlocks.length;
				i++
			) {
				rotatedBlocks[i][3] += BLOCK.WIDTH;
			}
		}

		if (isOverd(rotatedBlocks) === true) {
			for (
				let i = rotatedBlocks.length - 4;
				i < rotatedBlocks.length;
				i++
			) {
				rotatedBlocks[i][3] -= BLOCK.WIDTH * 2;
			}
		}

		if (isOverd(rotatedBlocks) === true) {
			return;
		}

		setBlocks(rotatedBlocks);
		updateBlocks(rotatedBlocks);
	}, [blocks]);

	return (
		<Body>
			<TetrisTemplate>
				<GameWindow key="1">
					{blocks.map((item) => {
						let blockStyle = {
							top: item[2],
							left: item[3],
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={BlockStyle}
								style={blockStyle}
							/>
						);
					})}
					{<Ranking>{rank}</Ranking>}
				</GameWindow>
				<FirstPreviewWindow key="2">
					{firstWaitingBlock.map((item) => {
						let blockStyle = {
							top: item[2],
							left: item[3],
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={BlockStyle}
								style={blockStyle}
							/>
						);
					})}
				</FirstPreviewWindow>
				<SecondPreviewWindow key="3">
					{secondWaitingBlock.map((item) => {
						let blockStyle = {
							top: item[2],
							left: item[3],
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={BlockStyle}
								style={blockStyle}
							/>
						);
					})}
				</SecondPreviewWindow>
				<EnemyWindow1 key="4">
					{blocks2.map((item) => {
						let blockStyle = {
							top: 13 * (item[2] / 19),
							left: 13 * (item[3] / 19),
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={EnemyBlockStyle}
								style={blockStyle}
							/>
						);
					})}
					{<div className="rank2">{enemyRank2}</div>}
				</EnemyWindow1>
				<EnemyWindow2 key="5">
					{blocks3.map((item) => {
						let blockStyle = {
							top: 13 * (item[2] / 19),
							left: 13 * (item[3] / 19),
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={EnemyBlockStyle}
								style={blockStyle}
							/>
						);
					})}
					{<EnemyRanking>{enemyRank3}</EnemyRanking>}
				</EnemyWindow2>
				<EnemyWindow3 key="6">
					{blocks4.map((item) => {
						let blockStyle = {
							top: 13 * (item[2] / 19),
							left: 13 * (item[3] / 19),
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={EnemyBlockStyle}
								style={blockStyle}
							/>
						);
					})}
					{<EnemyRanking>{enemyRank4}</EnemyRanking>}
				</EnemyWindow3>
				<EnemyWindow4 key="7">
					{blocks5.map((item) => {
						let blockStyle = {
							top: 13 * (item[2] / 19),
							left: 13 * (item[3] / 19),
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={EnemyBlockStyle}
								style={blockStyle}
							/>
						);
					})}
					{<EnemyRanking>{enemyRank5}</EnemyRanking>}
				</EnemyWindow4>
				<EnemyWindow5 key="8">
					{blocks6.map((item) => {
						let blockStyle = {
							top: 13 * (item[2] / 19),
							left: 13 * (item[3] / 19),
							backgroundColor: item[4],
						};
						return (
							<div
								key={item[0]}
								css={EnemyBlockStyle}
								style={blockStyle}
							/>
						);
					})}
					{<EnemyRanking>{enemyRank6}</EnemyRanking>}
				</EnemyWindow5>
				{state !== "게임중" && users[0] === me && (
					<StartButton onClick={initialize}>시작하기</StartButton>
				)}
				{state === "대기중" ? (
					<Link to="/" onClick={leave}>
						<ExitButton>돌아가기</ExitButton>
					</Link>
				) : (
					<ExitButton key="9">돌아가기</ExitButton>
				)}
				{users.map((user, index) => {
					if (index === 0) {
						if (user === me) {
							return <Id key="10">★{user}</Id>;
						} else {
							return <You1 key="10">★{user}</You1>;
						}
					} else {
						if (user === me) {
							return <Id key="10">{user}</Id>;
						} else {
							if (myNum < index) {
								return (
									<div css={`you${index}`} key="10">
										{user}
									</div>
								);
							} else {
								return (
									<div css={`you${index + 1}`} key="10">
										{user}
									</div>
								);
							}
						}
					}
				})}
				<ChatingBox key="11">
					{chatings.map((chat) => {
						if (chat[1] === "join") {
							return <div key={chat[0]}>{chat[2]}</div>;
						} else if (chat[1] === "me") {
							return (
								<div key={chat[0]}>
									{me}>{chat[2]}
								</div>
							);
						} else {
							return (
								<div key={chat[0]}>
									{chat[1]}>{chat[2]}
								</div>
							);
						}
					})}
				</ChatingBox>
				<InputBox
					ref={inputEl}
					onChange={(e) => setChatingInputText(e.target.value)}
				/>
				<SendButton
					onClick={() => {
						sendMessage(chatingInputText);
						inputEl.value = "";
						setChatingInputText(" ");
					}}
					key="12"
				>
					전송
				</SendButton>
				<a href="https://kr.freepik.com/free-vector/arizona-night-desert-landscape-natural-wild-west-background-with-coyote-pack-silhouettes-run-on-through-cacti-and-rocks-under-cloudy-sky-with-full-moon-shining-game-scene-cartoon-vector-illustration_21050353.htm#query=game%20background&position=3&from_view=keyword">
					작가 upklyak
				</a>{" "}
				출처 Freepik
			</TetrisTemplate>
		</Body>
	);
};

export default Game;
