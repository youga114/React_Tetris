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
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
};

let randomVar = Math.floor(Math.random() * 10);
let blockState = "";

let text = "";
let rank = "";
let blockKey = 1;

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

	const timeIntervalId = useRef(0);
	const downBlockRef = useRef();
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
			case 13: //채팅을 보낼 때 필요한 엔터키를 활성화
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

		setBlocks(_makeFun(createWaitingBlock()[0][1]));
		setFirstWaitingBlock(createWaitingBlock());
		setSecondWaitingBlock(createWaitingBlock());

		rank = "";
		blockKey = 1;

		blockState = 0;
		timeIntervalId.current = setInterval(() => {
			downBlockRef.current();
		}, 300);

		start();
	};

	const createNextBlocks = () => {
		checkFilledLine();
		blockState = 0;
		setBlocks([...blocks, ..._makeFun(firstWaitingBlock[0][1])]);
		setFirstWaitingBlock(secondWaitingBlock);
		setSecondWaitingBlock(createWaitingBlock());

		let length = blocks.length;
		for (let i = 0; i < length - 4; i++) {
			for (let j = length - 4; j < length; j++) {
				if (
					blocks[i][2] === blocks[j][2] &&
					blocks[i][3] === blocks[j][3]
				) {
					//생성된 블록이 위치한 곳에 다른 블록이 겹친다면
					finishGame(personNum);
					return;
				}
			}
		}
	};

	const finishGame = (personNum) => {
		rank = personNum;
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

	const createWaitingBlock = () => {
		let block = [];
		let these = Math.floor(Math.random() * 7); //랜덤하게 2번째 미리보기의 블록을 채움
		switch (these) {
			case 0: //네모
				block.push([1, these, 19, 24, "red"]);
				block.push([2, these, 19, 43, "red"]);
				block.push([3, these, 38, 24, "red"]);
				block.push([4, these, 38, 43, "red"]);
				break;
			case 1: //직선
				block.push([1, these, 30, 22, "purple"]);
				block.push([2, these, 30, 3, "purple"]);
				block.push([3, these, 30, 41, "purple"]);
				block.push([4, these, 30, 60, "purple"]);
				break;
			case 2: //기억
				block.push([1, these, 20, 31, "pink"]);
				block.push([2, these, 20, 12, "pink"]);
				block.push([3, these, 20, 50, "pink"]);
				block.push([4, these, 39, 50, "pink"]);
				break;
			case 3: //반대기억
				block.push([1, these, 20, 31, "yellow"]);
				block.push([2, these, 20, 12, "yellow"]);
				block.push([3, these, 20, 50, "yellow"]);
				block.push([4, these, 39, 12, "yellow"]);
				break;
			case 4: //엿
				block.push([1, these, 20, 31, "orange"]);
				block.push([2, these, 20, 12, "orange"]);
				block.push([3, these, 20, 50, "orange"]);
				block.push([4, these, 39, 31, "orange"]);
				break;
			case 5: //반대리을
				block.push([1, these, 20, 31, "green"]);
				block.push([2, these, 39, 12, "green"]);
				block.push([3, these, 20, 50, "green"]);
				block.push([4, these, 39, 31, "green"]);
				break;
			case 6: //리을
				block.push([1, these, 20, 31, "blue"]);
				block.push([2, these, 39, 50, "blue"]);
				block.push([3, these, 20, 12, "blue"]);
				block.push([4, these, 39, 31, "blue"]);
				break;
			default:
				break;
		}

		return block;
	};

	const _makeFun = (these) => {
		let block = [];
		let key = blockKey;
		switch (these) {
			case 0: //네모
				block.push([key++, these, -19, 76, "red"]);
				block.push([key++, these, -19, 95, "red"]);
				block.push([key++, these, 0, 76, "red"]);
				block.push([key++, these, 0, 95, "red"]);
				break;
			case 1: //직선
				block.push([key++, these, -19, 76, "purple"]);
				block.push([key++, these, -19, 57, "purple"]);
				block.push([key++, these, -19, 95, "purple"]);
				block.push([key++, these, -19, 114, "purple"]);
				break;
			case 2: //기억
				block.push([key++, these, -19, 76, "pink"]);
				block.push([key++, these, -19, 57, "pink"]);
				block.push([key++, these, -19, 95, "pink"]);
				block.push([key++, these, 0, 95, "pink"]);
				break;
			case 3: //반대기억
				block.push([key++, these, -19, 76, "yellow"]);
				block.push([key++, these, -19, 57, "yellow"]);
				block.push([key++, these, -19, 95, "yellow"]);
				block.push([key++, these, 0, 57, "yellow"]);
				break;
			case 4: //엿
				block.push([key++, these, -19, 76, "orange"]);
				block.push([key++, these, -19, 57, "orange"]);
				block.push([key++, these, -19, 95, "orange"]);
				block.push([key++, these, 0, 76, "orange"]);
				break;
			case 5: //반대리을
				block.push([key++, these, -19, 76, "green"]);
				block.push([key++, these, 0, 57, "green"]);
				block.push([key++, these, -19, 95, "green"]);
				block.push([key++, these, 0, 76, "green"]);
				break;
			case 6: //리을
				block.push([key++, these, -19, 76, "blue"]);
				block.push([key++, these, 0, 95, "blue"]);
				block.push([key++, these, -19, 57, "blue"]);
				block.push([key++, these, 0, 76, "blue"]);
				break;
			default:
				break;
		}
		blockKey = key;
		return block;
	};

	const downBlock = () => {
		let lowerdBlocks = blocks.slice();
		let length = lowerdBlocks.length;
		let flag = 0;
		for (let i = 0; i < length - 4; i++) {
			for (let j = length - 4; j < length; j++) {
				if (
					lowerdBlocks[i][3] === lowerdBlocks[j][3] &&
					lowerdBlocks[i][2] === lowerdBlocks[j][2] + 19
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
				if (lowerdBlocks[i][2] + 19 >= 380) {
					flag = 1;
				}
			}
		}

		if (flag === 1) {
			createNextBlocks();
		} else {
			for (let i = 0; i < 4; i++) {
				lowerdBlocks[length - 1 - i][2] += 19;
			}
			setBlocks(lowerdBlocks);
		}

		down();
	};

	downBlockRef.current = downBlock;

	const checkFilledLine = () => {
		let cloneBlocks = [];
		let length = blocks.length;
		for (let i = 0; i < length; i++) {
			cloneBlocks.push(blocks[i]);
		}

		for (let i = length - 4; i < length; i++) {
			let myTopNumber = [];
			let myTop;
			for (let j = 0; j < blocks.length; j++) {
				myTop = cloneBlocks[i][2];
				if (blocks[j][2] === myTop) {
					myTopNumber.push(j);
				}
			}
			if (myTopNumber.length > 9) {
				//한 줄이 꽉 차 있다면(10칸이 다 채워져 있다면)
				for (let k = 9; k >= 0; k--) {
					blocks.splice(myTopNumber[k], 1); //그 줄에 있는 블록을 모두 지우고
				}
				for (let j = 0; j < blocks.length; j++) {
					if (blocks[j][2] < myTop) {
						blocks[j][2] += 19; //지운 블록들보다 위에 있는 블록들을 밑으로 한칸씩 내림
					}
				}
				addLine();
			}
		}

		updateBlocks(blocks);
	};

	const upLine = () => {
		if (this.gage > personNum - 2) {
			//유저의 공격받은 gage가 방에서 살아남은 인원에 비례
			for (let i = 0; i < blocks.length - 4; i++) {
				blocks[i][2] -= 19; //현재 존재하는 블록들을 한줄씩 올림
			}
			for (let i = 0; i < 10; i++) {
				if (randomVar !== i) {
					blocks.splice(0, 0, [blockKey, "line", 361, 19 * i]); //블록들의 정보를 보관하는 배열에 이 블록들을 앞으로 넣음

					blockKey += 1;
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
							blocks[k][2] -= 19; //현재 떨어지고 있는 블록을 한칸씩 올려버림
						}
						j -= 1;
					}
				}
			}
			this.gage = 1;
		} else {
			this.gage++;
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
						blocks[i][2] += 19;
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
						blocks[i][2] += 19;
					}

					setBlocks(blocks.slice());
				}
				break;
			default:
				break;
		}
	};

	getGameControllKeyRef.current = getGameControllKey;

	const isReachedBottom = useCallback((blocks) => {
		for (let i = blocks.length - 4; i < blocks.length; i++) {
			if (blocks[i][2] >= 380 - 19) {
				return true;
			}
		}

		for (let i = blocks.length - 4; i < blocks.length; i++) {
			for (let j = 0; j < blocks.length - 4; j++) {
				if (
					blocks[i][3] === blocks[j][3] &&
					blocks[i][2] + 19 === blocks[j][2]
				) {
					return true;
				}
			}
		}

		return false;
	});

	const isReachedLeft = useCallback((blocks) => {
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
	});

	const isReachedRight = useCallback((blocks) => {
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
	});

	const isReachedDown = useCallback((blocks) => {
		for (let i = blocks.length - 4; i < blocks.length; i++) {
			if (blocks[i][2] >= 380 - 19) {
				return true;
			}
		}

		for (let i = blocks.length - 4; i < blocks.length; i++) {
			for (let j = 0; j < blocks.length - 4; j++) {
				if (
					blocks[i][3] === blocks[j][3] &&
					blocks[i][2] + 19 === blocks[j][2]
				) {
					return true;
				}
			}
		}

		return false;
	});

	const rotateBlock = () => {
		let blocks = blocks;
		let appear = blocks.length - 1;
		let these = blocks[appear][1];
		let state = blockState;
		if (these === 4) {
			//엿모양 돌리기
			if (state === 0) {
				blocks[appear][3] -= 19;
				blocks[appear - 1][3] -= 38;
				blocks[appear - 1][2] -= 19;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear][3] += 19;
					blocks[appear - 1][3] += 38;
					blocks[appear - 1][2] += 19;
				} else {
					state++;
				}
			} else if (state === 1) {
				let howManyRight = 0;
				blocks[appear - 1][3] += 19;
				blocks[appear - 1][2] += 38;
				blocks[appear - 2][3] += 38;
				blocks[appear - 2][2] += 19;
				if (this._rightSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 1][3] -= 19;
					blocks[appear - 1][2] -= 38;
					blocks[appear - 2][3] -= 38;
					blocks[appear - 2][2] -= 19;
					while (howManyRight !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					state++;
				}
			} else if (state === 2) {
				blocks[appear - 1][3] += 19;
				blocks[appear - 1][2] -= 19;
				blocks[appear][3] += 38;
				blocks[appear][2] -= 38;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 1][3] -= 19;
					blocks[appear - 1][2] += 19;
					blocks[appear][3] -= 38;
					blocks[appear][2] += 38;
				} else {
					state++;
				}
			} else {
				let howManyleft = 0;
				blocks[appear - 2][3] -= 38;
				blocks[appear - 2][2] -= 19;
				blocks[appear][3] -= 19;
				blocks[appear][2] += 38;
				if (this._leftSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] += 38;
					blocks[appear - 2][2] += 19;
					blocks[appear][3] += 19;
					blocks[appear][2] -= 38;
					while (howManyleft !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					state = 0;
				}
			}
		}
		if (these === 1) {
			//직선돌리기
			if (state === 0) {
				blocks[appear - 2][3] += 19;
				blocks[appear - 2][2] -= 19;
				blocks[appear - 1][3] -= 19;
				blocks[appear - 1][2] -= 38;
				blocks[appear][3] -= 38;
				blocks[appear][2] -= 57;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] -= 19;
					blocks[appear - 2][2] += 19;
					blocks[appear - 1][3] += 19;
					blocks[appear - 1][2] += 38;
					blocks[appear][3] += 38;
					blocks[appear][2] += 57;
				} else {
					state++;
				}
			} else {
				let howManyleft = 0;
				let howManyRight = 0;
				blocks[appear - 2][3] -= 19;
				blocks[appear - 2][2] += 19;
				blocks[appear - 1][3] += 19;
				blocks[appear - 1][2] += 38;
				blocks[appear][3] += 38;
				blocks[appear][2] += 57;
				if (this._leftSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this._rightSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] += 19;
					blocks[appear - 2][2] -= 19;
					blocks[appear - 1][3] -= 19;
					blocks[appear - 1][2] -= 38;
					blocks[appear][3] -= 38;
					blocks[appear][2] -= 57;
					while (howManyleft !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] -= 19;
						}
						howManyleft--;
					}
					while (howManyRight !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					state = 0;
				}
			}
		}
		if (these === 2) {
			//기억돌리기
			if (state === 0) {
				blocks[appear - 3][2] -= 19;
				blocks[appear - 1][3] -= 38;
				blocks[appear - 1][2] += 19;
				blocks[appear][3] -= 38;
				blocks[appear][2] -= 38;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 3][2] += 19;
					blocks[appear - 1][3] += 38;
					blocks[appear - 1][2] -= 19;
					blocks[appear][3] += 38;
					blocks[appear][2] += 38;
				} else {
					state++;
				}
			} else if (state === 1) {
				let howManyRight = 0;
				blocks[appear - 3][2] += 38;
				blocks[appear][3] += 38;
				blocks[appear][2] += 38;
				if (this._rightSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 3][2] -= 38;
					blocks[appear][3] -= 38;
					blocks[appear][2] -= 38;
					while (howManyRight !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					state++;
				}
			} else if (state === 2) {
				blocks[appear - 2][3] += 38;
				blocks[appear - 2][2] -= 19;
				blocks[appear - 1][3] += 38;
				blocks[appear - 1][2] -= 19;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] -= 38;
					blocks[appear - 2][2] += 19;
					blocks[appear - 1][3] -= 38;
					blocks[appear - 1][2] += 19;
				} else {
					state++;
				}
			} else {
				let howManyleft = 0;
				blocks[appear - 3][2] -= 19;
				blocks[appear - 2][3] -= 38;
				blocks[appear - 2][2] += 19;
				if (this._leftSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 3][2] += 19;
					blocks[appear - 2][3] += 38;
					blocks[appear - 2][2] -= 19;
					while (howManyleft !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					state = 0;
				}
			}
		}
		if (these === 3) {
			//반대기억돌리기
			if (state === 0) {
				blocks[appear - 3][2] += 19;
				blocks[appear - 1][3] -= 38;
				blocks[appear - 1][2] -= 19;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 3][2] -= 19;
					blocks[appear - 1][3] += 38;
					blocks[appear - 1][2] += 19;
				} else {
					state++;
				}
			} else if (state === 1) {
				let howManyRight = 0;
				blocks[appear - 1][3] += 38;
				blocks[appear - 1][2] += 19;
				blocks[appear - 2][3] += 38;
				blocks[appear - 2][2] += 19;
				if (this._rightSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 1][3] -= 38;
					blocks[appear - 1][2] -= 19;
					blocks[appear - 2][3] -= 38;
					blocks[appear - 2][2] -= 19;
					while (howManyRight !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					state++;
				}
			} else if (state === 2) {
				blocks[appear - 3][2] -= 38;
				blocks[appear][3] += 38;
				blocks[appear][2] -= 38;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 3][2] += 38;
					blocks[appear][3] -= 38;
					blocks[appear][2] += 38;
				} else {
					state++;
				}
			} else {
				let howManyleft = 0;
				blocks[appear - 3][2] += 19;
				blocks[appear - 2][3] -= 38;
				blocks[appear - 2][2] -= 19;
				blocks[appear][3] -= 38;
				blocks[appear][2] += 38;
				if (this._leftSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 3][2] -= 19;
					blocks[appear - 2][3] += 38;
					blocks[appear - 2][2] += 19;
					blocks[appear][3] += 38;
					blocks[appear][2] -= 38;
					while (howManyleft !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					state = 0;
				}
			}
		}
		if (these === 5) {
			//반대리을 돌리기
			if (state === 0) {
				blocks[appear - 2][3] += 38;
				blocks[appear][2] -= 38;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] -= 38;
					blocks[appear][2] += 38;
				} else {
					state++;
				}
			} else {
				let howManyleft = 0;
				blocks[appear - 2][3] -= 38;
				blocks[appear][2] += 38;
				if (this._leftSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] += 38;
					blocks[appear][2] -= 38;
					while (howManyleft !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] -= 19;
						}
						howManyleft--;
					}
				} else {
					state = 0;
				}
			}
		}
		if (these === 6) {
			//리을 돌리기
			if (state === 0) {
				blocks[appear - 2][3] -= 38;
				blocks[appear][2] -= 38;
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] += 38;
					blocks[appear][2] += 38;
				} else {
					state++;
				}
			} else {
				let howManyRight = 0;
				blocks[appear - 2][3] += 38;
				blocks[appear][2] += 38;
				if (this._rightSide(blocks) === 0) {
					for (let j = appear - 3; j <= appear; j++) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this.checkOverlapping(blocks) === 0) {
					blocks[appear - 2][3] -= 38;
					blocks[appear][2] -= 38;
					while (howManyRight !== 0) {
						for (let j = appear - 3; j <= appear; j++) {
							blocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					state = 0;
				}
			}
		}
		blockState = state;
		updateBlocks(blocks);
	};

	const checkOverlapping = (blocks) => {
		//현재 움직이던 블록이 다른 블록들과 겹치는지 검사하는 함수
		for (let i = 0; i < blocks.length - 4; i++) {
			for (let j = blocks.length - 4; j < blocks.length; j++) {
				if (
					blocks[j][2] === blocks[i][2] &&
					blocks[j][3] === blocks[i][3]
				) {
					return 0; //겹치는게 있다면 false
				}
			}
		}
		return 1; //겹치는게 없다면 true
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
				ref={(el) => (this._input = el)}
				onChange={(e) => {
					this.setState({
						text: e.target.value,
					});
				}}
			/>
			<SendButton
				onClick={() => {
					sendMessage(text);
					this._input.value = "";
					text = " ";
				}}
				key="12"
			>
				전송
			</SendButton>
		</Body>
	);
};

export default Game;
