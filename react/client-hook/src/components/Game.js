import React, {
	Component,
	useEffect,
	useState,
} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "@emotion/styled";

const Body = styled.div`
	background-color: rgb(76, 76, 76);
	height: 100vh;
	width: 100vw;
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

// .base2 {
// 	position: absolute;
// 	border-width: 5px;
// 	border-color: blue;
// 	border-style: solid;
// 	background-color: black;
// 	width: 80px;
// 	height: 80px;
// 	left: 660px;
// 	top: 140px;
// 	overflow: hidden;
// }
// .base3 {
// 	position: absolute;
// 	border-width: 5px;
// 	border-color: blue;
// 	border-style: solid;
// 	background-color: black;
// 	width: 80px;
// 	height: 80px;
// 	left: 660px;
// 	top: 220px;
// 	overflow: hidden;
// }
// .me {
// 	position: absolute;
// 	top: 114px;
// 	left: 740px;
// 	width: 205px;
// 	height: 20px;
// 	text-align: center;
// 	font-size: 15px;
// 	background-color: white;
// 	border-style: solid;
// }
// .you1 {
// 	position: absolute;
// 	top: 16px;
// 	left: 40px;
// 	height: 20px;
// 	width: 136px;
// 	text-align: center;
// 	font-size: 15px;
// 	border-style: solid;
// 	background-color: white;
// }
// .you2 {
// 	position: absolute;
// 	top: 366px;
// 	left: 40px;
// 	height: 20px;
// 	width: 136px;
// 	text-align: center;
// 	font-size: 15px;
// 	border-style: solid;
// 	background-color: white;
// }
// .you3 {
// 	position: absolute;
// 	top: 16px;
// 	left: 210px;
// 	height: 20px;
// 	width: 136px;
// 	text-align: center;
// 	font-size: 15px;
// 	border-style: solid;
// 	background-color: white;
// }
// .you4 {
// 	position: absolute;
// 	top: 366px;
// 	left: 210px;
// 	height: 20px;
// 	width: 136px;
// 	text-align: center;
// 	font-size: 15px;
// 	border-style: solid;
// 	background-color: white;
// }
// .you5 {
// 	position: absolute;
// 	top: 366px;
// 	left: 380px;
// 	height: 20px;
// 	width: 136px;
// 	text-align: center;
// 	font-size: 15px;
// 	border-style: solid;
// 	background-color: white;
// }
// .enemy1 {
// 	position: absolute;
// 	border-width: 6px;
// 	border-color: blue;
// 	border-style: solid;
// 	background-color: black;
// 	width: 130px;
// 	height: 260px;
// 	left: 40px;
// 	top: 40px;
// 	overflow: hidden;
// }
// .enemy2 {
// 	position: absolute;
// 	border-width: 6px;
// 	border-color: blue;
// 	border-style: solid;
// 	background-color: black;
// 	width: 130px;
// 	height: 260px;
// 	left: 40px;
// 	top: 390px;
// 	overflow: hidden;
// }
// .enemy3 {
// 	position: absolute;
// 	border-width: 6px;
// 	border-color: blue;
// 	border-style: solid;
// 	background-color: black;
// 	width: 130px;
// 	height: 260px;
// 	left: 210px;
// 	top: 40px;
// 	overflow: hidden;
// }
// .enemy4 {
// 	position: absolute;
// 	border-width: 6px;
// 	border-color: blue;
// 	border-style: solid;
// 	background-color: black;
// 	width: 130px;
// 	height: 260px;
// 	left: 210px;
// 	top: 390px;
// 	overflow: hidden;
// }
// .enemy5 {
// 	position: absolute;
// 	border-width: 6px;
// 	border-color: blue;
// 	border-style: solid;
// 	background-color: black;
// 	width: 130px;
// 	height: 260px;
// 	left: 380px;
// 	top: 390px;
// 	overflow: hidden;
// }
// .start {
// 	padding: 0;
// 	position: absolute;
// 	border-width: 4px;
// 	border-style: outset;
// 	border-color: skyblue;
// 	background-color: skyblue;
// 	width: 80px;
// 	height: 30px;
// 	left: 1010px;
// 	top: 425px;
// 	overflow: hidden;
// 	text-align: center;
// 	font-size: 18px;
// }
// .exit {
// 	padding: 0;
// 	position: absolute;
// 	border-width: 4px;
// 	border-style: outset;
// 	border-color: skyblue;
// 	background-color: skyblue;
// 	width: 80px;
// 	height: 30px;
// 	left: 1110px;
// 	top: 425px;
// 	overflow: hidden;
// 	text-align: center;
// 	font-size: 18px;
// }
// .chating {
// 	text-align: left;
// 	position: absolute;
// 	background-color: rgb(212, 244, 250);
// 	width: 200px;
// 	border-style: solid;
// 	height: 200px;
// 	position: absolute;
// 	top: 140px;
// 	left: 1000px;
// 	font-size: 10px;
// 	overflow: auto;
// 	z-index: 500;
// }
// .input {
// 	position: absolute;
// 	border-style: solid;
// 	width: 170px;
// 	height: 20px;
// 	font-size: 10px;
// 	top: 342px;
// 	left: 1000px;
// 	z-index: 150;
// }
// .send {
// 	position: absolute;
// 	width: 34px;
// 	height: 25px;
// 	left: 1171px;
// 	top: 342px;
// 	font-size: 14px;
// 	color: black;
// 	text-align: center;
// 	padding: 0;
// 	z-index: 100;
// }
// .a0 {
// 	position: absolute;
// 	border-width: 2px;
// 	border-color: white;
// 	background-color: red;
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 76px;
// 	top: -19px;
// }
// .a1 {
// 	position: absolute;
// 	border-width: 2px;
// 	border-color: white;
// 	background-color: purple;
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 76px;
// 	top: -19px;
// }
// .a2 {
// 	position: absolute;
// 	border-width: 2px;
// 	border-color: white;
// 	background-color: pink;
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 76px;
// 	top: -19px;
// }
// .a3 {
// 	position: absolute;
// 	border-width: 2px;
// 	border-color: white;
// 	background-color: yellow;
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 76px;
// 	top: -19px;
// }
// .a4 {
// 	position: absolute;
// 	border-width: 2px;
// 	border-color: white;
// 	background-color: orange;
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 76px;
// 	top: -19px;
// }
// .a5 {
// 	position: absolute;
// 	border-width: 2px;
// 	border-color: white;
// 	background-color: green;
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 76px;
// 	top: -19px;
// }
// .a6 {
// 	position: absolute;
// 	border-width: 2px;
// 	border-color: white;
// 	background-color: blue;
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 76px;
// 	top: -19px;
// }
// .a0z {
// 	position: absolute;
// 	border-width: 1px;
// 	border-color: white;
// 	background-color: red;
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 76px;
// 	top: -19px;
// }
// .a1z {
// 	position: absolute;
// 	border-width: 1px;
// 	border-color: white;
// 	background-color: purple;
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 76px;
// 	top: -19px;
// }
// .a2z {
// 	position: absolute;
// 	border-width: 1px;
// 	border-color: white;
// 	background-color: pink;
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 76px;
// 	top: -19px;
// }
// .a3z {
// 	position: absolute;
// 	border-width: 1px;
// 	border-color: white;
// 	background-color: yellow;
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 76px;
// 	top: -19px;
// }
// .a4z {
// 	position: absolute;
// 	border-width: 1px;
// 	border-color: white;
// 	background-color: orange;
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 76px;
// 	top: -19px;
// }
// .a5z {
// 	position: absolute;
// 	border-width: 1px;
// 	border-color: white;
// 	background-color: green;
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 76px;
// 	top: -19px;
// }
// .a6z {
// 	position: absolute;
// 	border-width: 1px;
// 	border-color: white;
// 	background-color: blue;
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 76px;
// 	top: -19px;
// }
// .aline {
// 	position: absolute;
// 	border-width: 2px;
// 	background-color: rgb(166, 166, 166);
// 	border-style: outset;
// 	width: 15px;
// 	height: 15px;
// 	left: 0px;
// 	top: 361px;
// }
// .alinez {
// 	position: absolute;
// 	border-width: 1px;
// 	background-color: rgb(166, 166, 166);
// 	border-style: outset;
// 	width: 11px;
// 	height: 11px;
// 	left: 0px;
// 	top: 361px;
// }
// .rank {
// 	position: absolute;
// 	color: white;
// 	font-size: 80px;
// 	left: 75px;
// 	top: 135px;
// }
// .rank2 {
// 	position: absolute;
// 	color: white;
// 	font-size: 50px;
// 	left: 45px;
// 	top: 95px;
// }

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
	useEffect(() => {
		window.addEventListener(
			"keydown",
			_getkeyAndMove,
			false
		);
	}, []);

	const [text, setText] = useState("");
	const [preview, setPreview] = useState([]);
	const [preview2, setPreview2] = useState([]);
	const [rank, setRank] = useState("");
	const [blockKey, setBlockKey] = useState(1);
	const [blocks, setBlocks] = useState([]);

	let lastUserFlag = 0;
	let stateValue = 0;
	let lineupFlag = 0;
	let randomVar = Math.floor(Math.random() * 10);

	const _initialFun = () => {
		window.removeEventListener(
			"keydown",
			this.getkeyAndMove,
			false
		);
		window.addEventListener(
			"keydown",
			this._getkeyAndMove2,
			false
		);
		window.addEventListener(
			"keyup",
			this._respace,
			false
		);
		this.stateValue = 1;
		this.setState({
			blocks: this.state.blocks.splice(
				0,
				this.state.blocks.length
			),
			preview: this.state.preview.splice(
				0,
				this.state.preview.length
			),
			preview2: this.state.preview2.splice(
				0,
				this.state.preview2.length
			),
			rank: "",
			blockKey: 5,
		});
		let moment = this._makePreviewFun();
		this._nextMakeFun(
			this._makeFun(moment[0][1]),
			this._makePreviewFun(),
			this._makePreviewFun()
		);
		this.tid = setInterval(this._dropFun, 300);
	};

	const _firstFun = () => {
		let blocks = [];
		return blocks;
	};

	const _nextMakeFun = (blocks, preview, preview2) => {
		this.blockState = 0;
		this.setState({
			blocks: blocks,
			preview: preview,
			preview2: preview2,
		});
	};

	const _makeNewPreviewFun = () => {
		this._lineClear(); //한줄이 다 찼는지 확인하는 함수
		this._nextMakeFun(
			this._makeFun(this.state.preview[0][1]),
			this.state.preview2,
			this._makePreviewFun()
		);

		let length = this.state.blocks.length;
		for (let i = 0; i < length - 4; i++) {
			for (let j = length - 4; j < length; j++) {
				if (
					this.state.blocks[i][2] ===
						this.state.blocks[j][2] &&
					this.state.blocks[i][3] ===
						this.state.blocks[j][3]
				) {
					//생성된 블록이 위치한 곳에 다른 블록이 겹친다면
					this._gamesetFun(personNum);
					return;
				}
			}
		}
	};

	const _gamesetFun = (personNum) => {
		this.lastUserFlag = 0;
		this.setState({
			blocks: this._endFun(),
			rank: personNum,
		});
		window.removeEventListener(
			"keydown",
			this._getkeyAndMove2,
			false
		);
		window.removeEventListener(
			"keyup",
			this._respace,
			false
		);
		window.addEventListener(
			"keydown",
			this._getkeyAndMove,
			false
		);
		clearInterval(this.tid);
		end();
	};

	const _endFun = () => {
		let blocks = this.state.blocks;
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].push("rgb(166,166,166)");
		}
		return blocks;
	};

	const _makePreviewFun = () => {
		let block = [];
		let these = Math.floor(Math.random() * 7); //랜덤하게 2번째 미리보기의 블록을 채움
		switch (these) {
			case 0: //네모
				block.push([1, these, 19, 24]);
				block.push([2, these, 19, 43]);
				block.push([3, these, 38, 24]);
				block.push([4, these, 38, 43]);
				return block;
			case 1: //직선
				block.push([1, these, 30, 22]);
				block.push([2, these, 30, 3]);
				block.push([3, these, 30, 41]);
				block.push([4, these, 30, 60]);
				return block;
			case 2: //기억
				block.push([1, these, 20, 31]);
				block.push([2, these, 20, 12]);
				block.push([3, these, 20, 50]);
				block.push([4, these, 39, 50]);
				return block;
			case 3: //반대기억
				block.push([1, these, 20, 31]);
				block.push([2, these, 20, 12]);
				block.push([3, these, 20, 50]);
				block.push([4, these, 39, 12]);
				return block;
			case 4: //엿
				block.push([1, these, 20, 31]);
				block.push([2, these, 20, 12]);
				block.push([3, these, 20, 50]);
				block.push([4, these, 39, 31]);
				return block;
			case 5: //반대리을
				block.push([1, these, 20, 31]);
				block.push([2, these, 39, 12]);
				block.push([3, these, 20, 50]);
				block.push([4, these, 39, 31]);
				return block;
			case 6: //리을
				block.push([1, these, 20, 31]);
				block.push([2, these, 39, 50]);
				block.push([3, these, 20, 12]);
				block.push([4, these, 39, 31]);
				return block;
			default:
				return block;
		}
	};

	const _makeFun = (these) => {
		let block = this.state.blocks;
		let key = this.state.blockKey;
		switch (these) {
			case 0: //네모
				block.push([key++, these, -19, 76]);
				block.push([key++, these, -19, 95]);
				block.push([key++, these, 0, 76]);
				block.push([key++, these, 0, 95]);
				break;
			case 1: //직선
				block.push([key++, these, -19, 76]);
				block.push([key++, these, -19, 57]);
				block.push([key++, these, -19, 95]);
				block.push([key++, these, -19, 114]);
				break;
			case 2: //기억
				block.push([key++, these, -19, 76]);
				block.push([key++, these, -19, 57]);
				block.push([key++, these, -19, 95]);
				block.push([key++, these, 0, 95]);
				break;
			case 3: //반대기억
				block.push([key++, these, -19, 76]);
				block.push([key++, these, -19, 57]);
				block.push([key++, these, -19, 95]);
				block.push([key++, these, 0, 57]);
				break;
			case 4: //엿
				block.push([key++, these, -19, 76]);
				block.push([key++, these, -19, 57]);
				block.push([key++, these, -19, 95]);
				block.push([key++, these, 0, 76]);
				break;
			case 5: //반대리을
				block.push([key++, these, -19, 76]);
				block.push([key++, these, 0, 57]);
				block.push([key++, these, -19, 95]);
				block.push([key++, these, 0, 76]);
				break;
			case 6: //리을
				block.push([key++, these, -19, 76]);
				block.push([key++, these, 0, 95]);
				block.push([key++, these, -19, 57]);
				block.push([key++, these, 0, 76]);
				break;
			default:
				return;
		}
		this.setState({
			blockKey: key,
		});
		return block;
	};

	const _dropFun = () => {
		down();
		let block = blocks;
		let length = blocks.length;
		let flag = 0;
		for (let i = 0; i < length - 4; i++) {
			for (let j = length - 4; j < length; j++) {
				if (
					block[i][3] === block[j][3] &&
					block[i][2] === block[j][2] + 19
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
				if (block[i][2] + 19 >= 380) {
					flag = 1;
				}
			}
		}
		if (flag === 1) {
			this._makeNewPreviewFun();
		} else {
			for (let i = 0; i < 4; i++) {
				block[length - 1 - i][2] += 19;
			}
			this.setState({ blocks: block });
		}
	};

	const _lineClear = () => {
		let blocks = [];
		let removeBlocks = this.state.blocks;
		let length = this.state.blocks.length;
		for (let i = 0; i < length; i++) {
			blocks.push(this.state.blocks[i]);
		}

		for (let i = length - 4; i < length; i++) {
			let myTopNumber = [];
			let myTop;
			for (let j = 0; j < removeBlocks.length; j++) {
				myTop = blocks[i][2];
				if (removeBlocks[j][2] === myTop) {
					myTopNumber.push(j);
				}
			}
			if (myTopNumber.length > 9) {
				//한 줄이 꽉 차 있다면(10칸이 다 채워져 있다면)
				for (let k = 9; k >= 0; k--) {
					removeBlocks.splice(myTopNumber[k], 1); //그 줄에 있는 블록을 모두 지우고
				}
				for (
					let j = 0;
					j < removeBlocks.length;
					j++
				) {
					if (removeBlocks[j][2] < myTop) {
						removeBlocks[j][2] += 19; //지운 블록들보다 위에 있는 블록들을 밑으로 한칸씩 내림
					}
				}
				addLine();
			}
		}
		this.setState({
			blocks: removeBlocks,
		});
		updateBlocks();
	};

	const _lineupFun = () => {
		if (this.gage > personNum - 2) {
			//유저의 공격받은 gage가 방에서 살아남은 인원에 비례
			for (let i = 0; i < blocks.length - 4; i++) {
				blocks[i][2] -= 19; //현재 존재하는 블록들을 한줄씩 올림
			}
			for (let i = 0; i < 10; i++) {
				if (randomVar !== i) {
					blocks.splice(0, 0, [
						blockKey,
						"line",
						361,
						19 * i,
					]); //블록들의 정보를 보관하는 배열에 이 블록들을 앞으로 넣음

					setBlockKey(blockKey + 1);
				}
			}
			for (
				let i = blocks.length - 4;
				i < blocks.length;
				i++
			) {
				for (
					let j = 0;
					j < blocks.length - 4;
					j++
				) {
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

		setBlockKey(blockKey);
		setBlocks(blocks);
	};

	const _getkeyAndMove = (event) => {
		let keyCode;
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
	};

	const _getkeyAndMove2 = (event) => {
		let keyCode;
		let flag2 = 0;
		if (event === null) {
			keyCode = window.event.keyCode;
			window.event.preventDefault();
		} else {
			keyCode = event.keyCode;
			event.preventDefault();
		}
		let length = this.state.blocks.length;
		let blocks = this.state.blocks;
		switch (keyCode) {
			case 32: //스페이스 버튼을 활성화
				if (this.fired === false) {
					this.fired = true;
					do {
						for (
							let i = length - 4;
							i < length;
							i++
						) {
							if (blocks[i][2] >= 380 - 19) {
								//바닥까지 닿았는지 확인
								flag2 = 1;
								break;
							}
						}
						if (flag2 === 0) {
							for (
								let i = length - 4;
								i < length;
								i++
							) {
								//밑에 걸리는게 있는지 확인
								for (
									let j = 0;
									j < length - 4;
									j++
								) {
									if (
										blocks[i][3] ===
											blocks[j][3] &&
										blocks[i][2] +
											19 ===
											blocks[j][2]
									) {
										flag2 = 1;
										break;
									}
								}
							}
						}
						if (flag2 === 0) {
							//걸리는게 없다면 한칸 내려오기
							for (
								let i = length - 4;
								i < length;
								i++
							) {
								blocks[i][2] += 19;
							}
						}
					} while (flag2 === 0); //밑에 걸리는게 있을때 까지 위의 함수 반복
					this._makeNewPreviewFun();
				}
				return;
			case 37: // 왼쪽 화살표
				for (let i = length - 4; i < length; i++) {
					if (blocks[i][3] - 19 < 0) {
						//왼쪽 벽에 걸리는게 있는지 확인
						flag2 = 1;
						break;
					}
				}
				if (flag2 === 0) {
					for (
						let i = length - 4;
						i < length;
						i++
					) {
						//왼쪽에 블록이 있는지 확인
						for (
							let j = 0;
							j < length - 4;
							j++
						) {
							if (
								blocks[i][3] - 19 ===
									blocks[j][3] &&
								blocks[i][2] ===
									blocks[j][2]
							) {
								flag2 = 1;
								break;
							}
						}
					}
				}
				if (flag2 === 0) {
					//블록이 왼쪽 벽에 붙어있지 않고 왼쪽에 블록이 없다면 왼쪽으로 한칸 이동
					for (
						let i = length - 4;
						i < length;
						i++
					) {
						blocks[i][3] -= 19;
					}
				}
				this.setState({
					blocks: blocks,
				});
				return;
			case 38: // 위쪽 화살표를 활성화
				this._upKey();
				break;
			case 39: // 오른쪽 화살표를 활성화
				for (let i = length - 4; i < length; i++) {
					if (blocks[i][3] + 19 >= 190) {
						//오른쪽 벽에 걸리는게 있는지 확인
						flag2 = 1;
						break;
					}
				}
				if (flag2 === 0) {
					//오른쪽에 블록이 있는지 확인
					for (
						let i = length - 4;
						i < length;
						i++
					) {
						for (
							let j = 0;
							j < length - 4;
							j++
						) {
							if (
								blocks[i][3] + 19 ===
									blocks[j][3] &&
								blocks[i][2] ===
									blocks[j][2]
							) {
								flag2 = 1;
								break;
							}
						}
					}
				}
				if (flag2 === 0) {
					//블록이 오른쪽 벽에 붙어있지 않고 오른에 블록이 없다면 왼쪽으로 한칸 이동
					for (
						let i = length - 4;
						i < length;
						i++
					) {
						blocks[i][3] += 19;
					}
				}
				this.setState({
					blocks: blocks,
				});
				return;
			case 40: // 아래쪽 화살표를 활성화
				for (let i = length - 4; i < length; i++) {
					if (blocks[i][2] >= 380 - 19) {
						//현재 움직이는 블록이 맨밑에 있지 않은지 확인
						flag2 = 1;
						break;
					}
				}
				if (flag2 === 0) {
					for (
						let i = length - 4;
						i < length;
						i++
					) {
						for (
							let j = 0;
							j < length - 4;
							j++
						) {
							if (
								blocks[i][3] ===
									blocks[j][3] &&
								blocks[i][2] + 19 ===
									blocks[j][2]
							) {
								//현재 움직이는 블록 바로 밑칸에 다른 블록이 없는지 확인
								flag2 = 1;
								break;
							}
						}
					}
				}
				if (flag2 === 0) {
					for (
						let i = length - 4;
						i < length;
						i++
					) {
						//현재 움직이는 블록이 맽밑에 있지 않고 바로 밑칸에 다른 블록이 없다면 밑으로 한칸 이동
						blocks[i][2] += 19;
					}
				}
				this.setState({
					blocks: blocks,
				});
				return;
			default:
				break;
		}
	};

	const _upKey = () => {
		let blocks = this.state.blocks;
		let appear = blocks.length - 1;
		let these = blocks[appear][1];
		let state = this.blockState;
		if (these === 4) {
			//엿모양 돌리기
			if (state === 0) {
				blocks[appear][3] -= 19;
				blocks[appear - 1][3] -= 38;
				blocks[appear - 1][2] -= 19;
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 1][3] -= 19;
					blocks[appear - 1][2] -= 38;
					blocks[appear - 2][3] -= 38;
					blocks[appear - 2][2] -= 19;
					while (howManyRight !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 2][3] += 38;
					blocks[appear - 2][2] += 19;
					blocks[appear][3] += 19;
					blocks[appear][2] -= 38;
					while (howManyleft !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this._rightSide(blocks) === 0) {
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 2][3] += 19;
					blocks[appear - 2][2] -= 19;
					blocks[appear - 1][3] -= 19;
					blocks[appear - 1][2] -= 38;
					blocks[appear][3] -= 38;
					blocks[appear][2] -= 57;
					while (howManyleft !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
							blocks[j][3] -= 19;
						}
						howManyleft--;
					}
					while (howManyRight !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 3][2] -= 38;
					blocks[appear][3] -= 38;
					blocks[appear][2] -= 38;
					while (howManyRight !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 3][2] += 19;
					blocks[appear - 2][3] += 38;
					blocks[appear - 2][2] -= 19;
					while (howManyleft !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 1][3] -= 38;
					blocks[appear - 1][2] -= 19;
					blocks[appear - 2][3] -= 38;
					blocks[appear - 2][2] -= 19;
					while (howManyRight !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 3][2] -= 19;
					blocks[appear - 2][3] += 38;
					blocks[appear - 2][2] += 19;
					blocks[appear][3] += 38;
					blocks[appear][2] -= 38;
					while (howManyleft !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] += 19;
					}
					howManyleft++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 2][3] += 38;
					blocks[appear][2] -= 38;
					while (howManyleft !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
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
				if (this._gumsa(blocks) === 0) {
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
					for (
						let j = appear - 3;
						j <= appear;
						j++
					) {
						blocks[j][3] -= 19;
					}
					howManyRight++;
				}
				if (this._gumsa(blocks) === 0) {
					blocks[appear - 2][3] -= 38;
					blocks[appear][2] -= 38;
					while (howManyRight !== 0) {
						for (
							let j = appear - 3;
							j <= appear;
							j++
						) {
							blocks[j][3] += 19;
						}
						howManyRight--;
					}
				} else {
					state = 0;
				}
			}
		}
		this.blockState = state;
		this.setState({
			blocks: blocks,
		});
		updateBlocks();
	};

	const _gumsa = (blocks) => {
		//현재 움직이던 블록이 다른 블록들과 겹치는지 검사하는 함수
		for (let i = 0; i < blocks.length - 4; i++) {
			for (
				let j = blocks.length - 4;
				j < blocks.length;
				j++
			) {
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
		for (
			let j = blocks.length - 4;
			j < blocks.length;
			j++
		) {
			if (blocks[j][3] >= 190) {
				return 0; //넘어가면 false
			}
		}
		return 1; //넘어가지 않으면 true
	};

	const _leftSide = (blocks) => {
		//현재 움직이는 블록이 모양을 변경 했을 때 왼쪽 벽을 넘어가는지 확인하는 함수
		for (
			let j = blocks.length - 4;
			j < blocks.length;
			j++
		) {
			if (blocks[j][3] < 0) {
				return 0; //넘어가면 false
			}
		}
		return 1; //넘어가지 않으면 true
	};

	const _respace = (event) => {
		let keyCode;
		if (event == null) {
			keyCode = window.event.keyCode;
			window.event.preventDefault();
		} else {
			keyCode = event.keyCode;
			event.preventDefault();
		}
		switch (keyCode) {
			case 32: //스페이스를 떼는 버튼을 활성화
				this.fired = false;
				break;
			default:
				break;
		}
	};

	if (state === "게임중" && stateValue === 0) {
		lastUserFlag = 1;
		_initialFun();
	}
	// if (personNum === 1 && state === "대기중") {
	// 	stateValue = 0;
	// 	if (lastUserFlag === 1) {
	// 		_gamesetFun(personNum);
	// 	}
	// }
	// if (lineup !== lineupFlag) {
	// 	lineupFlag++;
	// 	_lineupFun();
	// }

	return (
		<Body>
			<MyGameWindow>
				{blocks.map((item, index) => {
					let blockStyle = {
						top: item[2],
						left: item[3],
						backgroundColor: item[4],
					};
					return (
						<div
							key={item[0]}
							className={"a" + item[1]}
							style={blockStyle}
						></div>
					);
				})}
				{<div className="rank">{rank}</div>}
			</MyGameWindow>
			<div className="base2" key="pan2">
				{preview.map((item, index) => {
					let blockStyle = {
						top: item[2],
						left: item[3],
					};
					return (
						<div
							key={"b" + item[0]}
							className={"a" + item[1]}
							style={blockStyle}
						></div>
					);
				})}
			</div>
			<div className="base3" key="pan3">
				{preview2.map((item, index) => {
					let blockStyle = {
						top: item[2],
						left: item[3],
					};
					return (
						<div
							key={"b" + item[0]}
							className={"a" + item[1]}
							style={blockStyle}
						></div>
					);
				})}
			</div>
			<div className="enemy1" key="enemy1">
				{blocks2.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={item[0]}
							className={"a" + item[1] + "z"}
							style={blockStyle}
						></div>
					);
				})}
				{<div className="rank2">{enemyRank2}</div>}
			</div>
			<div className="enemy2" key="enemy2">
				{blocks3.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={item[0]}
							className={"a" + item[1] + "z"}
							style={blockStyle}
						></div>
					);
				})}
				{<div className="rank2">{enemyRank3}</div>}
			</div>
			<div className="enemy3" key="enemy3">
				{blocks4.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={item[0]}
							className={"a" + item[1] + "z"}
							style={blockStyle}
						></div>
					);
				})}
				{<div className="rank2">{enemyRank4}</div>}
			</div>
			<div className="enemy4" key="enemy4">
				{blocks5.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={item[0]}
							className={"a" + item[1] + "z"}
							style={blockStyle}
						></div>
					);
				})}
				{<div className="rank2">{enemyRank5}</div>}
			</div>
			<div className="enemy5" key="enemy5">
				{blocks6.map((item, index) => {
					let blockStyle = {
						top: 13 * (item[2] / 19),
						left: 13 * (item[3] / 19),
						backgroundColor: item[4],
					};
					return (
						<div
							key={item[0]}
							className={"a" + item[1] + "z"}
							style={blockStyle}
						></div>
					);
				})}
				{<div className="rank2">{enemyRank6}</div>}
			</div>
			{state !== "게임중" && users[0] === me && (
				<button
					className="start"
					key="start"
					onClick={() => {
						this.stateValue = 0;
						start();
					}}
				>
					시작하기
				</button>
			)}
			{state === "대기중" ? (
				<Link to="/" onClick={leave}>
					<button className="exit">나가기</button>
				</Link>
			) : (
				<button className="exit">나가기</button>
			)}
			{users.map((user, index) => {
				if (index === 0) {
					if (user === me) {
						return (
							<div className="me" key="me">
								★{user}
							</div>
						);
					} else {
						return (
							<div
								className="you1"
								key="you1"
							>
								★{user}
							</div>
						);
					}
				} else {
					if (user === me) {
						return (
							<div className="me" key="me">
								{user}
							</div>
						);
					} else {
						if (myNum < index) {
							return (
								<div
									className={
										"you" + index
									}
									key={"you" + index}
								>
									{user}
								</div>
							);
						} else {
							return (
								<div
									className={
										"you" + (index + 1)
									}
									key={
										"you" + (index + 1)
									}
								>
									{user}
								</div>
							);
						}
					}
				}
			})}
			<div key="chating" className="chating">
				{chatings.map((chat) => {
					if (chat[1] === "join") {
						return (
							<div key={chat[0]}>
								{chat[2]}
							</div>
						);
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
			</div>
			<input
				key="input"
				ref={(el) => (this._input = el)}
				className="input"
				onChange={(e) => {
					this.setState({
						text: e.target.value,
					});
				}}
			/>
			<button
				key="send"
				className="send"
				onClick={() => {
					sendMessage(text);
					this._input.value = "";
					setText(" ");
				}}
			>
				전송
			</button>
		</Body>
	);
};

export default Game;
