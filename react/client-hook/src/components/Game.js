/** @jsx jsx */
import React, {
	Component,
	useEffect,
	useState,
	useCallback,
	useRef,
} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/react";

const Body = styled.div`
	background-color: rgb(66, 66, 66);
	height: 100vh;
	width: 100vw;
	margin: 0px;
`;
const MyGameWindow = styled.div`
	position: absolute;
	border-width: 10px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 190px;
	height: 380px;
	left: 740px;
	top: 140px;
	overflow: hidden;
`;
const FirstPreviewWindow = styled.div`
	position: absolute;
	border-width: 5px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 80px;
	height: 80px;
	left: 660px;
	top: 140px;
	overflow: hidden;
`;
const SecondPreviewWindow = styled.div`
	position: absolute;
	border-width: 5px;
	border-color: blue;
	border-style: solid;
	background-color: black;
	width: 80px;
	height: 80px;
	left: 660px;
	top: 220px;
	overflow: hidden;
`;
const EnemyWindow1 = styled.div`
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
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
	position: absolute;
	border-style: solid;
	width: 170px;
	height: 20px;
	font-size: 10px;
	top: 342px;
	left: 1000px;
	z-index: 150;
`;
const SendButton = styled.button`
	position: absolute;
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
	position: absolute;
	border-width: 2px;
	border-color: white;
	border-style: outset;
	width: 15px;
	height: 15px;
	left: 76px;
	top: -19px;
`;
const EnemyBlockStyle = css`
	position: absolute;
	border-width: 1px;
	border-color: white;
	border-style: outset;
	width: 11px;
	height: 11px;
	left: 76px;
	top: -19px;
`;
const Ranking = styled.div`
	position: absolute;
	color: white;
	font-size: 80px;
	left: 75px;
	top: 135px;
`;
const EnemyRanking = styled.div`
	position: absolute;
	color: white;
	font-size: 50px;
	left: 45px;
	top: 95px;
`;

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

const BLOCK_SIZE = {
	WIDTH: 19,
	HEIGHT: 19,
};

let rotateQuarterCount = 0;
let blockKey = 1;
let upLineCount = 1;

const createWaitingBlock = () => {
	let blocks = [];

	switch (Math.floor(Math.random() * 7)) {
		case BLOCK_SHAPE.SQUARE:
			blocks.push([1, BLOCK_SHAPE.SQUARE, 19, 24, "red"]);
			blocks.push([2, BLOCK_SHAPE.SQUARE, 19, 43, "red"]);
			blocks.push([3, BLOCK_SHAPE.SQUARE, 38, 24, "red"]);
			blocks.push([4, BLOCK_SHAPE.SQUARE, 38, 43, "red"]);
			break;
		case BLOCK_SHAPE.LINEAR:
			blocks.push([1, BLOCK_SHAPE.LINEAR, 30, 22, "purple"]);
			blocks.push([2, BLOCK_SHAPE.LINEAR, 30, 3, "purple"]);
			blocks.push([3, BLOCK_SHAPE.LINEAR, 30, 41, "purple"]);
			blocks.push([4, BLOCK_SHAPE.LINEAR, 30, 60, "purple"]);
			break;
		case BLOCK_SHAPE.FALCI_SHAPE:
			blocks.push([1, BLOCK_SHAPE.FALCI_SHAPE, 20, 31, "pink"]);
			blocks.push([2, BLOCK_SHAPE.FALCI_SHAPE, 20, 12, "pink"]);
			blocks.push([3, BLOCK_SHAPE.FALCI_SHAPE, 20, 50, "pink"]);
			blocks.push([4, BLOCK_SHAPE.FALCI_SHAPE, 39, 50, "pink"]);
			break;
		case BLOCK_SHAPE.REVERSE_FALCI_SHAPE:
			blocks.push([1, BLOCK_SHAPE.REVERSE_FALCI_SHAPE, 20, 31, "yellow"]);
			blocks.push([2, BLOCK_SHAPE.REVERSE_FALCI_SHAPE, 20, 12, "yellow"]);
			blocks.push([3, BLOCK_SHAPE.REVERSE_FALCI_SHAPE, 20, 50, "yellow"]);
			blocks.push([4, BLOCK_SHAPE.REVERSE_FALCI_SHAPE, 39, 12, "yellow"]);
			break;
		case BLOCK_SHAPE.MOUNTINE_SHAPE:
			blocks.push([1, BLOCK_SHAPE.MOUNTINE_SHAPE, 20, 31, "orange"]);
			blocks.push([2, BLOCK_SHAPE.MOUNTINE_SHAPE, 20, 12, "orange"]);
			blocks.push([3, BLOCK_SHAPE.MOUNTINE_SHAPE, 20, 50, "orange"]);
			blocks.push([4, BLOCK_SHAPE.MOUNTINE_SHAPE, 39, 31, "orange"]);
			break;
		case BLOCK_SHAPE.BENT_UP_LINE:
			blocks.push([1, BLOCK_SHAPE.BENT_UP_LINE, 20, 31, "green"]);
			blocks.push([2, BLOCK_SHAPE.BENT_UP_LINE, 39, 12, "green"]);
			blocks.push([3, BLOCK_SHAPE.BENT_UP_LINE, 20, 50, "green"]);
			blocks.push([4, BLOCK_SHAPE.BENT_UP_LINE, 39, 31, "green"]);
			break;
		case BLOCK_SHAPE.BENT_DOWN_LINE:
			blocks.push([1, BLOCK_SHAPE.BENT_DOWN_LINE, 20, 31, "blue"]);
			blocks.push([2, BLOCK_SHAPE.BENT_DOWN_LINE, 39, 50, "blue"]);
			blocks.push([3, BLOCK_SHAPE.BENT_DOWN_LINE, 20, 12, "blue"]);
			blocks.push([4, BLOCK_SHAPE.BENT_DOWN_LINE, 39, 31, "blue"]);
			break;
		default:
			break;
	}

	return blocks;
};

const makeMainBlock = (blockID) => {
	let blocks = [];
	switch (blockID) {
		case BLOCK_SHAPE.SQUARE:
			blocks.push([blockKey++, blockID, -19, 76, "red"]);
			blocks.push([blockKey++, blockID, -19, 95, "red"]);
			blocks.push([blockKey++, blockID, 0, 76, "red"]);
			blocks.push([blockKey++, blockID, 0, 95, "red"]);
			break;
		case BLOCK_SHAPE.LINEAR:
			blocks.push([blockKey++, blockID, -19, 76, "purple"]);
			blocks.push([blockKey++, blockID, -19, 57, "purple"]);
			blocks.push([blockKey++, blockID, -19, 95, "purple"]);
			blocks.push([blockKey++, blockID, -19, 114, "purple"]);
			break;
		case BLOCK_SHAPE.FALCI_SHAPE:
			blocks.push([blockKey++, blockID, -19, 76, "pink"]);
			blocks.push([blockKey++, blockID, -19, 57, "pink"]);
			blocks.push([blockKey++, blockID, -19, 95, "pink"]);
			blocks.push([blockKey++, blockID, 0, 95, "pink"]);
			break;
		case BLOCK_SHAPE.REVERSE_FALCI_SHAPE:
			blocks.push([blockKey++, blockID, -19, 76, "yellow"]);
			blocks.push([blockKey++, blockID, -19, 57, "yellow"]);
			blocks.push([blockKey++, blockID, -19, 95, "yellow"]);
			blocks.push([blockKey++, blockID, 0, 57, "yellow"]);
			break;
		case BLOCK_SHAPE.MOUNTINE_SHAPE:
			blocks.push([blockKey++, blockID, -19, 76, "orange"]);
			blocks.push([blockKey++, blockID, -19, 57, "orange"]);
			blocks.push([blockKey++, blockID, -19, 95, "orange"]);
			blocks.push([blockKey++, blockID, 0, 76, "orange"]);
			break;
		case BLOCK_SHAPE.BENT_UP_LINE:
			blocks.push([blockKey++, blockID, -19, 76, "green"]);
			blocks.push([blockKey++, blockID, 0, 57, "green"]);
			blocks.push([blockKey++, blockID, -19, 95, "green"]);
			blocks.push([blockKey++, blockID, 0, 76, "green"]);
			break;
		case BLOCK_SHAPE.BENT_DOWN_LINE:
			blocks.push([blockKey++, blockID, -19, 76, "blue"]);
			blocks.push([blockKey++, blockID, 0, 95, "blue"]);
			blocks.push([blockKey++, blockID, -19, 57, "blue"]);
			blocks.push([blockKey++, blockID, 0, 76, "blue"]);
			break;
		default:
			break;
	}

	return blocks;
};

const isReachedBottom = (blocks) => {
	for (let i = blocks.length - 4; i < blocks.length; i++) {
		if (blocks[i][2] >= 380 - BLOCK_SIZE.HEIGHT) {
			return true;
		}
	}

	for (let i = blocks.length - 4; i < blocks.length; i++) {
		for (let j = 0; j < blocks.length - 4; j++) {
			if (
				blocks[i][3] === blocks[j][3] &&
				blocks[i][2] + BLOCK_SIZE.HEIGHT === blocks[j][2]
			) {
				return true;
			}
		}
	}

	return false;
};

const isReachedLeft = (blocks) => {
	for (let i = blocks.length - 4; i < blocks.length; i++) {
		if (blocks[i][3] - 19 < 0) {
			return true;
		}
	}

	for (let i = blocks.length - 4; i < blocks.length; i++) {
		for (let j = 0; j < blocks.length - 4; j++) {
			if (
				blocks[i][3] - 19 === blocks[j][3] &&
				blocks[i][2] === blocks[j][2]
			) {
				return true;
			}
		}
	}

	return false;
};

const isReachedRight = (blocks) => {
	for (let i = blocks.length - 4; i < blocks.length; i++) {
		if (blocks[i][3] + 19 >= 190) {
			return true;
		}
	}

	for (let i = blocks.length - 4; i < blocks.length; i++) {
		for (let j = 0; j < blocks.length - 4; j++) {
			if (
				blocks[i][3] + 19 === blocks[j][3] &&
				blocks[i][2] === blocks[j][2]
			) {
				return true;
			}
		}
	}

	return false;
};

const isReachedDown = (blocks) => {
	for (let i = blocks.length - 4; i < blocks.length; i++) {
		if (blocks[i][2] >= 380 - BLOCK_SIZE.HEIGHT) {
			return true;
		}
	}

	for (let i = blocks.length - 4; i < blocks.length; i++) {
		for (let j = 0; j < blocks.length - 4; j++) {
			if (
				blocks[i][3] === blocks[j][3] &&
				blocks[i][2] + BLOCK_SIZE.HEIGHT === blocks[j][2]
			) {
				return true;
			}
		}
	}

	return false;
};

const isOverlapped = (blocks) => {
	for (let i = 0; i < blocks.length - 4; i++) {
		for (let j = blocks.length - 4; j < blocks.length; j++) {
			if (
				blocks[j][2] === blocks[i][2] &&
				blocks[j][3] === blocks[i][3]
			) {
				return false;
			}
		}
	}
	return true;
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
	const getGameControllKeyRef = useRef();
	const gameControllKeyListener = useRef((event) => {
		getGameControllKeyRef.current(event);
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

	const initialize = () => {
		window.addEventListener(
			"keydown",
			gameControllKeyListener.current,
			false
		);

		blockKey = 1;
		rotateQuarterCount = 0;

		setRank("");
		setBlocks(makeMainBlock(createWaitingBlock()[0][1]));
		setFirstWaitingBlock(createWaitingBlock());
		setSecondWaitingBlock(createWaitingBlock());

		timeIntervalId.current = setInterval(() => {
			downBlockRef.current();
		}, 300);

		start();
	};

	const createNextBlocks = () => {
		clearFilledLine();
		rotateQuarterCount = 0;
		setBlocks([...blocks, ...makeMainBlock(firstWaitingBlock[0][1])]);
		setFirstWaitingBlock(secondWaitingBlock);
		setSecondWaitingBlock(createWaitingBlock());

		let length = blocks.length;
		for (let i = 0; i < length - 4; i++) {
			for (let j = length - 4; j < length; j++) {
				if (
					blocks[i][2] === blocks[j][2] &&
					blocks[i][3] === blocks[j][3]
				) {
					finishGame(personNum);
					return;
				}
			}
		}
	};

	const finishGame = (personNum) => {
		setRank(personNum);
		window.removeEventListener(
			"keydown",
			gameControllKeyListener.current,
			false
		);
		clearInterval(timeIntervalId.current);

		let deadBlocks = blocks.slice();
		for (let i = 0; i < deadBlocks.length; i++) {
			deadBlocks[i][4] = "rgb(166,166,166)";
		}

		end(deadBlocks);
		setBlocks(deadBlocks);
	};

	const downBlock = () => {
		let lowerdBlocks = blocks.slice();
		let length = lowerdBlocks.length;
		let flag = 0;
		for (let i = 0; i < length - 4; i++) {
			for (let j = length - 4; j < length; j++) {
				if (
					lowerdBlocks[i][3] === lowerdBlocks[j][3] &&
					lowerdBlocks[i][2] ===
						lowerdBlocks[j][2] + BLOCK_SIZE.HEIGHT
				) {
					flag = 1;
					break;
				}
			}
			if (flag === 1) {
				break;
			}
		}

		if (flag === 0) {
			for (let i = length - 4; i < length; i++) {
				if (lowerdBlocks[i][2] + BLOCK_SIZE.HEIGHT >= 380) {
					flag = 1;
				}
			}
		}

		if (flag === 1) {
			createNextBlocks();
		} else {
			for (let i = 0; i < 4; i++) {
				lowerdBlocks[length - 1 - i][2] += BLOCK_SIZE.HEIGHT;
			}
			setBlocks(lowerdBlocks);
		}

		down();
	};

	downBlockRef.current = downBlock;

	const clearFilledLine = () => {
		let clearedBlocks = blocks.slice();

		for (let i = blocks.length - 4; i < blocks.length; i++) {
			let sameHeightBlockIdx = [];
			let blockHeight = blocks[i][2];
			for (let j = 0; j < blocks.length; j++) {
				blockHeight = blocks[i][2];
				if (blocks[j][2] === blockHeight) {
					sameHeightBlockIdx.push(j);
				}
			}
			if (sameHeightBlockIdx.length > 9) {
				for (let k = 9; k >= 0; k--) {
					clearedBlocks.splice(sameHeightBlockIdx[k], 1);
				}
				for (let j = 0; j < blocks.length; j++) {
					if (blocks[j][2] < blockHeight) {
						blocks[j][2] += BLOCK_SIZE.HEIGHT;
					}
				}
				addLine();
			}
		}

		updateBlocks(clearedBlocks);
	};

	const upLine = () => {
		let emptyBlockIdx = Math.floor(Math.random() * 10);

		if (upLineCount > personNum - 2) {
			//유저의 공격받은 upLineCount가 방에서 살아남은 인원에 비례
			for (let i = 0; i < blocks.length - 4; i++) {
				blocks[i][2] -= BLOCK_SIZE.HEIGHT;
			}
			for (let i = 0; i < 10; i++) {
				if (emptyBlockIdx !== i) {
					blocks.splice(0, 0, [blockKey++, "line", 361, 19 * i]); //블록들의 정보를 보관하는 배열에 이 블록들을 앞으로 넣음
				}
			}
			for (let i = blocks.length - 4; i < blocks.length; i++) {
				for (let j = 0; j < blocks.length - 4; j++) {
					if (
						blocks[i][3] === blocks[j][3] &&
						blocks[i][2] === blocks[j][2]
					) {
						//한칸을 올라오는 순간에 현재 떨어지고 있는 블록이 곂친다면
						for (
							let k = blocks.length - 4;
							k < blocks.length;
							k++
						) {
							blocks[k][2] -= BLOCK_SIZE.HEIGHT; //현재 떨어지고 있는 블록을 한칸씩 올려버림
						}
						j -= 1;
					}
				}
			}
			upLineCount = 1;
		} else {
			upLineCount++;
		}
	};

	const getGameControllKey = (event) => {
		let keyCode = 0;
		let flag2 = 0;
		if (event === null) {
			keyCode = window.event.keyCode;
			window.event.preventDefault();
		} else {
			keyCode = event.keyCode;
			event.preventDefault();
		}

		let length = blocks.length;
		switch (keyCode) {
			case KEY_CODE.SPACE:
				while (isReachedBottom(blocks) === false) {
					for (let i = length - 4; i < length; i++) {
						blocks[i][2] += BLOCK_SIZE.HEIGHT;
					}
				}

				setBlocks(blocks.slice());
				createNextBlocks();
				break;
			case KEY_CODE.LEFT:
				if (isReachedLeft(blocks) === false) {
					for (let i = length - 4; i < length; i++) {
						blocks[i][3] -= 19;
					}

					setBlocks(blocks.slice());
				}
				break;
			case KEY_CODE.UP:
				rotateBlock();
				break;
			case KEY_CODE.RIGHT:
				if (isReachedRight(blocks) === false) {
					for (let i = length - 4; i < length; i++) {
						blocks[i][3] += 19;
					}

					setBlocks(blocks.slice());
				}
				break;
			case KEY_CODE.DOWN:
				if (isReachedDown(blocks) === false) {
					for (let i = length - 4; i < length; i++) {
						//현재 움직이는 블록이 맽밑에 있지 않고 바로 밑칸에 다른 블록이 없다면 밑으로 한칸 이동
						blocks[i][2] += BLOCK_SIZE.HEIGHT;
					}

					setBlocks(blocks.slice());
				}
				break;
			default:
				break;
		}
	};

	getGameControllKeyRef.current = getGameControllKey;

	const rotateBlock = () => {
		let lastBlockIdx = blocks.length - 1;
		let blockShape = blocks[blocks.length - 1][1];
		let rotatedBlocks = blocks.slice();

		if (blockShape === 4) {
			//엿모양 돌리기
			if (rotateQuarterCount === 0) {
				rotatedBlocks[lastBlockIdx][3] -= 19;
				rotatedBlocks[lastBlockIdx - 1][3] -= 38;
				rotatedBlocks[lastBlockIdx - 1][2] -= 19;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx][3] += 19;
					rotatedBlocks[lastBlockIdx - 1][3] += 38;
					rotatedBlocks[lastBlockIdx - 1][2] += 19;
				} else {
					rotateQuarterCount++;
				}
			} else if (rotateQuarterCount === 1) {
				let howManyRight = 0;
				rotatedBlocks[lastBlockIdx - 1][3] += 19;
				rotatedBlocks[lastBlockIdx - 1][2] += 38;
				rotatedBlocks[lastBlockIdx - 2][3] += 38;
				rotatedBlocks[lastBlockIdx - 2][2] += 19;
				if (_rightSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 1][3] -= 19;
					rotatedBlocks[lastBlockIdx - 1][2] -= 38;
					rotatedBlocks[lastBlockIdx - 2][3] -= 38;
					rotatedBlocks[lastBlockIdx - 2][2] -= 19;
					while (howManyRight !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					rotateQuarterCount++;
				}
			} else if (rotateQuarterCount === 2) {
				rotatedBlocks[lastBlockIdx - 1][3] += 19;
				rotatedBlocks[lastBlockIdx - 1][2] -= 19;
				rotatedBlocks[lastBlockIdx][3] += 38;
				rotatedBlocks[lastBlockIdx][2] -= 38;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 1][3] -= 19;
					rotatedBlocks[lastBlockIdx - 1][2] += 19;
					rotatedBlocks[lastBlockIdx][3] -= 38;
					rotatedBlocks[lastBlockIdx][2] += 38;
				} else {
					rotateQuarterCount++;
				}
			} else {
				let howManyleft = 0;
				rotatedBlocks[lastBlockIdx - 2][3] -= 38;
				rotatedBlocks[lastBlockIdx - 2][2] -= 19;
				rotatedBlocks[lastBlockIdx][3] -= 19;
				rotatedBlocks[lastBlockIdx][2] += 38;
				if (_leftSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] += 38;
					rotatedBlocks[lastBlockIdx - 2][2] += 19;
					rotatedBlocks[lastBlockIdx][3] += 19;
					rotatedBlocks[lastBlockIdx][2] -= 38;
					while (howManyleft !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					rotateQuarterCount = 0;
				}
			}
		}
		if (blockShape === 1) {
			//직선돌리기
			if (rotateQuarterCount === 0) {
				rotatedBlocks[lastBlockIdx - 2][3] += 19;
				rotatedBlocks[lastBlockIdx - 2][2] -= 19;
				rotatedBlocks[lastBlockIdx - 1][3] -= 19;
				rotatedBlocks[lastBlockIdx - 1][2] -= 38;
				rotatedBlocks[lastBlockIdx][3] -= 38;
				rotatedBlocks[lastBlockIdx][2] -= 57;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] -= 19;
					rotatedBlocks[lastBlockIdx - 2][2] += 19;
					rotatedBlocks[lastBlockIdx - 1][3] += 19;
					rotatedBlocks[lastBlockIdx - 1][2] += 38;
					rotatedBlocks[lastBlockIdx][3] += 38;
					rotatedBlocks[lastBlockIdx][2] += 57;
				} else {
					rotateQuarterCount++;
				}
			} else {
				let howManyleft = 0;
				let howManyRight = 0;
				rotatedBlocks[lastBlockIdx - 2][3] -= 19;
				rotatedBlocks[lastBlockIdx - 2][2] += 19;
				rotatedBlocks[lastBlockIdx - 1][3] += 19;
				rotatedBlocks[lastBlockIdx - 1][2] += 38;
				rotatedBlocks[lastBlockIdx][3] += 38;
				rotatedBlocks[lastBlockIdx][2] += 57;
				if (_leftSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (_rightSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] += 19;
					rotatedBlocks[lastBlockIdx - 2][2] -= 19;
					rotatedBlocks[lastBlockIdx - 1][3] -= 19;
					rotatedBlocks[lastBlockIdx - 1][2] -= 38;
					rotatedBlocks[lastBlockIdx][3] -= 38;
					rotatedBlocks[lastBlockIdx][2] -= 57;
					while (howManyleft !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] -= 19;
						}
						howManyleft--;
					}
					while (howManyRight !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					rotateQuarterCount = 0;
				}
			}
		}
		if (blockShape === 2) {
			//기억돌리기
			if (rotateQuarterCount === 0) {
				rotatedBlocks[lastBlockIdx - 1][3] -= 38;
				rotatedBlocks[lastBlockIdx - 3][2] -= 19;
				rotatedBlocks[lastBlockIdx - 1][2] += 19;
				rotatedBlocks[lastBlockIdx][3] -= 38;
				rotatedBlocks[lastBlockIdx][2] -= 38;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 3][2] += 19;
					rotatedBlocks[lastBlockIdx - 1][3] += 38;
					rotatedBlocks[lastBlockIdx - 1][2] -= 19;
					rotatedBlocks[lastBlockIdx][3] += 38;
					rotatedBlocks[lastBlockIdx][2] += 38;
				} else {
					rotateQuarterCount++;
				}
			} else if (rotateQuarterCount === 1) {
				let howManyRight = 0;
				rotatedBlocks[lastBlockIdx - 3][2] += 38;
				rotatedBlocks[lastBlockIdx][3] += 38;
				rotatedBlocks[lastBlockIdx][2] += 38;
				if (_rightSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 3][2] -= 38;
					rotatedBlocks[lastBlockIdx][3] -= 38;
					rotatedBlocks[lastBlockIdx][2] -= 38;
					while (howManyRight !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					rotateQuarterCount++;
				}
			} else if (rotateQuarterCount === 2) {
				rotatedBlocks[lastBlockIdx - 2][3] += 38;
				rotatedBlocks[lastBlockIdx - 2][2] -= 19;
				rotatedBlocks[lastBlockIdx - 1][3] += 38;
				rotatedBlocks[lastBlockIdx - 1][2] -= 19;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] -= 38;
					rotatedBlocks[lastBlockIdx - 2][2] += 19;
					rotatedBlocks[lastBlockIdx - 1][3] -= 38;
					rotatedBlocks[lastBlockIdx - 1][2] += 19;
				} else {
					rotateQuarterCount++;
				}
			} else {
				let howManyleft = 0;
				rotatedBlocks[lastBlockIdx - 3][2] -= 19;
				rotatedBlocks[lastBlockIdx - 2][3] -= 38;
				rotatedBlocks[lastBlockIdx - 2][2] += 19;
				if (_leftSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 3][2] += 19;
					rotatedBlocks[lastBlockIdx - 2][3] += 38;
					rotatedBlocks[lastBlockIdx - 2][2] -= 19;
					while (howManyleft !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					rotateQuarterCount = 0;
				}
			}
		}
		if (blockShape === 3) {
			//반대기억돌리기
			if (rotateQuarterCount === 0) {
				rotatedBlocks[lastBlockIdx - 3][2] += 19;
				rotatedBlocks[lastBlockIdx - 1][3] -= 38;
				rotatedBlocks[lastBlockIdx - 1][2] -= 19;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 3][2] -= 19;
					rotatedBlocks[lastBlockIdx - 1][3] += 38;
					rotatedBlocks[lastBlockIdx - 1][2] += 19;
				} else {
					rotateQuarterCount++;
				}
			} else if (rotateQuarterCount === 1) {
				let howManyRight = 0;
				rotatedBlocks[lastBlockIdx - 1][3] += 38;
				rotatedBlocks[lastBlockIdx - 1][2] += 19;
				rotatedBlocks[lastBlockIdx - 2][3] += 38;
				rotatedBlocks[lastBlockIdx - 2][2] += 19;
				if (_rightSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 1][3] -= 38;
					rotatedBlocks[lastBlockIdx - 1][2] -= 19;
					rotatedBlocks[lastBlockIdx - 2][3] -= 38;
					rotatedBlocks[lastBlockIdx - 2][2] -= 19;
					while (howManyRight !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					rotateQuarterCount++;
				}
			} else if (rotateQuarterCount === 2) {
				rotatedBlocks[lastBlockIdx - 3][2] -= 38;
				rotatedBlocks[lastBlockIdx][3] += 38;
				rotatedBlocks[lastBlockIdx][2] -= 38;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 3][2] += 38;
					rotatedBlocks[lastBlockIdx][3] -= 38;
					rotatedBlocks[lastBlockIdx][2] += 38;
				} else {
					rotateQuarterCount++;
				}
			} else {
				let howManyleft = 0;
				rotatedBlocks[lastBlockIdx - 3][2] += 19;
				rotatedBlocks[lastBlockIdx - 2][3] -= 38;
				rotatedBlocks[lastBlockIdx - 2][2] -= 19;
				rotatedBlocks[lastBlockIdx][3] -= 38;
				rotatedBlocks[lastBlockIdx][2] += 38;
				if (_leftSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 3][2] -= 19;
					rotatedBlocks[lastBlockIdx - 2][3] += 38;
					rotatedBlocks[lastBlockIdx - 2][2] += 19;
					rotatedBlocks[lastBlockIdx][3] += 38;
					rotatedBlocks[lastBlockIdx][2] -= 38;
					while (howManyleft !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					rotateQuarterCount = 0;
				}
			}
		}
		if (blockShape === 5) {
			//반대리을 돌리기
			if (rotateQuarterCount === 0) {
				rotatedBlocks[lastBlockIdx - 2][3] += 38;
				rotatedBlocks[lastBlockIdx][2] -= 38;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] -= 38;
					rotatedBlocks[lastBlockIdx][2] += 38;
				} else {
					rotateQuarterCount++;
				}
			} else {
				let howManyleft = 0;
				rotatedBlocks[lastBlockIdx - 2][3] -= 38;
				rotatedBlocks[lastBlockIdx][2] += 38;
				if (_leftSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] += 38;
					rotatedBlocks[lastBlockIdx][2] -= 38;
					while (howManyleft !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					rotateQuarterCount = 0;
				}
			}
		}
		if (blockShape === 6) {
			//리을 돌리기
			if (rotateQuarterCount === 0) {
				rotatedBlocks[lastBlockIdx - 2][3] -= 38;
				rotatedBlocks[lastBlockIdx][2] -= 38;
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] += 38;
					rotatedBlocks[lastBlockIdx][2] += 38;
				} else {
					rotateQuarterCount++;
				}
			} else {
				let howManyRight = 0;
				rotatedBlocks[lastBlockIdx - 2][3] += 38;
				rotatedBlocks[lastBlockIdx][2] += 38;
				if (_rightSide(rotatedBlocks) === 0) {
					for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
						rotatedBlocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (isOverlapped(rotatedBlocks) === 0) {
					rotatedBlocks[lastBlockIdx - 2][3] -= 38;
					rotatedBlocks[lastBlockIdx][2] -= 38;
					while (howManyRight !== 0) {
						for (let j = lastBlockIdx - 3; j <= lastBlockIdx; j++) {
							rotatedBlocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					rotateQuarterCount = 0;
				}
			}
		}

		updateBlocks(rotatedBlocks);
	};

	const _rightSide = (blocks) => {
		//현재 움직이는 블록이 모양을 변경 했을 때 오른쪽 벽을 넘어가는지 확인하는 함수
		for (let j = blocks.length - 4; j < blocks.length; j++) {
			if (blocks[j][3] >= 190) {
				return 0; //넘어가면 false
			}
		}
		return 1; //넘어가지 않으면 true
	};

	const _leftSide = (blocks) => {
		//현재 움직이는 블록이 모양을 변경 했을 때 왼쪽 벽을 넘어가는지 확인하는 함수
		for (let j = blocks.length - 4; j < blocks.length; j++) {
			if (blocks[j][3] < 0) {
				return 0; //넘어가면 false
			}
		}
		return 1; //넘어가지 않으면 true
	};

	return (
		<Body>
			<MyGameWindow key="1">
				{blocks.map((item, index) => {
					let blockStyle = {
						top: item[2],
						left: item[3],
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
							css={BlockStyle}
							style={blockStyle}
						/>
					);
				})}
				{<Ranking>{rank}</Ranking>}
			</MyGameWindow>
			<FirstPreviewWindow key="2">
				{firstWaitingBlock.map((item, index) => {
					let blockStyle = {
						top: item[2],
						left: item[3],
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
							css={BlockStyle}
							style={blockStyle}
						/>
					);
				})}
			</FirstPreviewWindow>
			<SecondPreviewWindow key="3">
				{secondWaitingBlock.map((item, index) => {
					let blockStyle = {
						top: item[2],
						left: item[3],
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
							css={BlockStyle}
							style={blockStyle}
						/>
					);
				})}
			</SecondPreviewWindow>
			<EnemyWindow1 key="4">
				{blocks2.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
							css={EnemyBlockStyle}
							style={blockStyle}
						/>
					);
				})}
				{<div className="rank2">{enemyRank2}</div>}
			</EnemyWindow1>
			<EnemyWindow2 key="5">
				{blocks3.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
							css={EnemyBlockStyle}
							style={blockStyle}
						/>
					);
				})}
				{<EnemyRanking>{enemyRank3}</EnemyRanking>}
			</EnemyWindow2>
			<EnemyWindow3 key="6">
				{blocks4.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
							css={EnemyBlockStyle}
							style={blockStyle}
						/>
					);
				})}
				{<EnemyRanking>{enemyRank4}</EnemyRanking>}
			</EnemyWindow3>
			<EnemyWindow4 key="7">
				{blocks5.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
							css={EnemyBlockStyle}
							style={blockStyle}
						/>
					);
				})}
				{<EnemyRanking>{enemyRank5}</EnemyRanking>}
			</EnemyWindow4>
			<EnemyWindow5 key="8">
				{blocks6.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={`${item[0]}-${index}`}
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
		</Body>
	);
};

export default Game;
