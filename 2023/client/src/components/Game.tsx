/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "./Button";

type BLOCKS = {
	key: number;
	shape: number;
	y: number;
	x: number;
	color: string;
}[];

const Game = ({
	users,
	me,
	chatings,
	state,
	numberOfUsers,
	sendMessage,
	leave,
	start,
	end,
	addLine,
	updateBlocks,
	master,
}: {
	users: {
		name: string;
		blocks: BLOCKS;
		rank: string;
	}[];
	me: string;
	chatings: {
		chatingKey: string;
		user: string | null;
		text: string;
	}[];
	state: string;
	numberOfUsers: number;
	sendMessage: (text: string) => void;
	leave: () => void;
	start: () => void;
	end: () => void;
	addLine: (upLineCount: number) => void;
	updateBlocks: (blocks: BLOCKS) => void;
	master: string;
}) => {
	const getChatingEnterKey = useRef<(event: KeyboardEvent) => void>();
	const getChatingEnterKeyListener = useCallback((event: KeyboardEvent) => {
		getChatingEnterKey.current?.(event);
	}, []);
	const inputEl = useRef<HTMLInputElement>(null);
	const [chatingInputText, setChatingInputText] = useState("");

	useEffect(() => {
		window.addEventListener("keydown", getChatingEnterKeyListener, false);
		return () => {
			window.removeEventListener(
				"keydown",
				getChatingEnterKeyListener,
				false
			);
		};
	}, []);

	getChatingEnterKey.current = useCallback(
		(event: KeyboardEvent) => {
			let keyCode = event.keyCode;

			switch (keyCode) {
				case KEY_CODE.ENTER:
					clearChatingInput();
					break;
				default:
					return;
			}
		},
		[chatingInputText]
	);

	const clearChatingInput = useCallback(() => {
		sendMessage(chatingInputText);
		setChatingInputText(" ");

		if (inputEl.current != null) {
			inputEl.current.value = "";
		}
	}, [chatingInputText]);

	const timeIntervalId = useRef<number>();
	const downBlock = useRef<() => void>();
	const [rank, setRank] = useState("");
	const [blocks, setBlocks] = useState<BLOCKS>([]);
	const [waitingBlocks, setWaitingBlocks] = useState<BLOCKS[]>([[], []]);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const hasStartedFromServer = state === "게임중" && playing === false;
		if (hasStartedFromServer) {
			gameStart();
			setPlaying(true);
		}
	}, [state]);

	const finishGame = useCallback(
		(blocks: BLOCKS) => {
			setRank(numberOfUsers.toString());
			window.removeEventListener(
				"keydown",
				gameControllKeyListener,
				false
			);
			clearInterval(timeIntervalId.current);

			for (let i = 0; i < blocks.length; i++) {
				blocks[i].color = "rgb(166,166,166)";
			}

			setPlaying(false);
			end();

			return blocks;
		},
		[end]
	);

	useEffect(() => {
		const isLastPlayer = playing === true && state === "대기중";
		if (isLastPlayer) {
			let endBlocks = blocks.map((block) => {
				return { ...block };
			});

			endBlocks.splice(-4);

			endBlocks = finishGame(endBlocks);

			updateBlocks(endBlocks);

			setBlocks(endBlocks);
		}
	}, [state]);

	const gameStart = useCallback(() => {
		window.addEventListener("keydown", gameControllKeyListener, false);

		blockKey = 1;

		setRank("");
		setBlocks(getMainBlock(createPreviewBlock()));

		let waitingBlock = [createPreviewBlock(), createPreviewBlock()];
		setWaitingBlocks(waitingBlock);

		timeIntervalId.current = setInterval(() => {
			downBlock.current?.();
		}, dropMilliseconds);
	}, []);

	downBlock.current = useCallback(() => {
		let downedBlocks = blocks.map((block) => {
			return { ...block };
		});

		for (let i = downedBlocks.length - 4; i < downedBlocks.length; i++) {
			downedBlocks[i].y += BLOCK.HEIGHT;
		}

		if (isOverd(downedBlocks) === false) {
			setBlocks(downedBlocks);

			return;
		}

		for (let i = downedBlocks.length - 4; i < downedBlocks.length; i++) {
			downedBlocks[i].y -= BLOCK.HEIGHT;
		}

		downedBlocks = clearFilledLine(downedBlocks);

		downedBlocks.push(...getMainBlock(waitingBlocks[0]));

		let waitingBlock = [waitingBlocks[1], createPreviewBlock()];
		setWaitingBlocks(waitingBlock);

		if (isOverd(downedBlocks) === true) {
			downedBlocks = finishGame(downedBlocks);
		}

		updateBlocks(downedBlocks);

		setBlocks(downedBlocks);
	}, [blocks]);

	const clearFilledLine = useCallback((blocks: BLOCKS) => {
		let cloneBlocks = blocks.map((block) => {
			return { ...block };
		});
		let clearFilledLineCount = 0;

		for (let i = cloneBlocks.length - 4; i < cloneBlocks.length; i++) {
			let sameHeightBlockIdx = [];
			let blockHeight = cloneBlocks[i].y;
			for (let j = 0; j < blocks.length; j++) {
				if (blocks[j].y === blockHeight) {
					sameHeightBlockIdx.push(j);
				}
			}
			if (sameHeightBlockIdx.length > 9) {
				for (let j = 0; j < blocks.length; j++) {
					if (blocks[j].y < blockHeight) {
						blocks[j].y += BLOCK.HEIGHT;
					}
				}
				for (let k = 9; k >= 0; k--) {
					blocks.splice(sameHeightBlockIdx[k], 1);
				}

				clearFilledLineCount++;
			}
		}

		if (clearFilledLineCount > 0) {
			addLine(clearFilledLineCount);
		}

		return blocks;
	}, []);

	const upLine = () => {
		let emptyBlockIdx = Math.floor(Math.random() * 10);

		if (upLineCount <= numberOfUsers - 2) {
			upLineCount += 1;
			return;
		}

		for (let i = 0; i < blocks.length - 4; i++) {
			blocks[i].y -= BLOCK.HEIGHT;
		}
		for (let i = 0; i < 10; i++) {
			if (emptyBlockIdx !== i) {
				blocks.splice(0, 0, {
					key: blockKey++,
					shape: BLOCK_SHAPE.DEAD,
					y: GAME_WINDOW.HEIGHT - BLOCK.HEIGHT,
					x: BLOCK.WIDTH * i,
					color: "rgb(166,166,166)",
				});
			}
		}
		for (let i = blocks.length - 4; i < blocks.length; i++) {
			for (let j = 0; j < blocks.length - 4; j++) {
				if (
					blocks[i].x === blocks[j].x &&
					blocks[i].y === blocks[j].y
				) {
					for (let k = blocks.length - 4; k < blocks.length; k++) {
						blocks[k].y -= BLOCK.HEIGHT;
					}
					j -= 1;
				}
			}
		}

		upLineCount = 1;
	};

	const getGameControllKey = useRef<(event: KeyboardEvent) => void>();
	const gameControllKeyListener = useCallback((event: KeyboardEvent) => {
		getGameControllKey.current?.(event);
	}, []);

	getGameControllKey.current = (event) => {
		let keyCode = event.keyCode;
		event.preventDefault();

		let movedBlocks = blocks.map((block) => {
			return { ...block };
		});

		switch (keyCode) {
			case KEY_CODE.SPACE:
				let downedBlocks = blocks.map((block) => {
					return { ...block };
				});

				while (isOverd(downedBlocks) === false) {
					for (
						let i = downedBlocks.length - 4;
						i < downedBlocks.length;
						i++
					) {
						downedBlocks[i].y += BLOCK.HEIGHT;
					}
				}

				for (
					let i = downedBlocks.length - 4;
					i < downedBlocks.length;
					i++
				) {
					downedBlocks[i].y -= BLOCK.HEIGHT;
				}

				downedBlocks = clearFilledLine(downedBlocks);

				downedBlocks.push(...getMainBlock(waitingBlocks[0]));

				let waitingBlock = [waitingBlocks[1], createPreviewBlock()];
				setWaitingBlocks(waitingBlock);

				if (isOverd(downedBlocks) === true) {
					downedBlocks = finishGame(downedBlocks);
				}

				updateBlocks(downedBlocks);

				setBlocks(downedBlocks);
				break;
			case KEY_CODE.LEFT:
				for (
					let i = movedBlocks.length - 4;
					i < movedBlocks.length;
					i++
				) {
					movedBlocks[i].x -= BLOCK.WIDTH;
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
					movedBlocks[i].x += BLOCK.WIDTH;
				}

				if (isOverd(movedBlocks) === true) {
					return;
				}

				setBlocks(movedBlocks);
				break;
			case KEY_CODE.DOWN:
				downBlock.current?.();
				break;
			default:
				break;
		}
	};

	const rotateBlock = useCallback(() => {
		if (blocks[blocks.length - 1].shape === BLOCK_SHAPE.SQUARE) {
			return;
		}

		let rotatedBlocks = blocks.map((block) => {
			return { ...block };
		});

		let centerX = rotatedBlocks[rotatedBlocks.length - 4].x;
		let centerY = rotatedBlocks[rotatedBlocks.length - 4].y;

		for (
			let i = rotatedBlocks.length - NUMBER_OF_BLOCKS;
			i < rotatedBlocks.length;
			++i
		) {
			const dx = rotatedBlocks[i].x - centerX;
			const dy = rotatedBlocks[i].y - centerY;
			rotatedBlocks[i].y = centerY + dx;
			rotatedBlocks[i].x = centerX - dy;
		}

		if (isOverd(rotatedBlocks) === true) {
			for (
				let i = rotatedBlocks.length - 4;
				i < rotatedBlocks.length;
				i++
			) {
				rotatedBlocks[i].x += BLOCK.WIDTH;
			}
		}

		if (isOverd(rotatedBlocks) === true) {
			for (
				let i = rotatedBlocks.length - 4;
				i < rotatedBlocks.length;
				i++
			) {
				rotatedBlocks[i].x -= BLOCK.WIDTH * 2;
			}
		}

		if (isOverd(rotatedBlocks) === true) {
			return;
		}

		updateBlocks(rotatedBlocks);

		setBlocks(rotatedBlocks);
	}, [blocks]);

	return (
		<Body>
			<Left>
				{users.map((user, index) => {
					return (
						<div css={`you${index + 1}`} key={index}>
							{user.name}
						</div>
					);
				})}
				{users.map((user, index) => {
					return (
						<EnemyWindow key={`EnemyWindow${index}`}>
							{user.blocks.map((block) => {
								let blockStyle = {
									top:
										ENEMY_BLOCK.HEIGHT *
										(block.y / BLOCK.HEIGHT),
									left:
										ENEMY_BLOCK.WIDTH *
										(block.x / BLOCK.WIDTH),
									backgroundColor: block.color,
								};
								return (
									<div
										key={block.key}
										css={EnemyBlockStyle}
										style={blockStyle}
									/>
								);
							})}
							<EnemyRanking>{user.rank}</EnemyRanking>
						</EnemyWindow>
					);
				})}
			</Left>
			<Center>
				<ColCenter>
					<PreviewWindows>
						{waitingBlocks.map((waitingBlock, index) => (
							<PreviewWindow key={index}>
								<PreviewCenter>
									{waitingBlock.map((item) => {
										let y = item.y;
										let x = item.x;

										if (item.shape === BLOCK_SHAPE.SQUARE) {
											x -= BLOCK.WIDTH / 2;
										} else if (
											item.shape === BLOCK_SHAPE.LINEAR
										) {
											x -= BLOCK.WIDTH / 2;
											y -= BLOCK.HEIGHT / 2;
										}

										let blockStyle = {
											top: y + BLOCK.HEIGHT,
											left: x,
											backgroundColor: item.color,
										};
										return (
											<div
												key={item.key}
												css={PreviewBlockStyle}
												style={blockStyle}
											/>
										);
									})}
								</PreviewCenter>
							</PreviewWindow>
						))}
					</PreviewWindows>
					<GameWindow key="1">
						{blocks.map((item) => {
							let blockStyle = {
								top: item.y,
								left: item.x,
								backgroundColor: item.color,
							};
							return (
								<div
									key={item.key}
									css={BlockStyle}
									style={blockStyle}
								/>
							);
						})}
						{<Ranking>{rank}</Ranking>}
					</GameWindow>
				</ColCenter>
			</Center>
			<Right>
				<div>
					<ChatingBox key="11">
						{chatings.map((chat) => {
							if (chat.user === null) {
								return (
									<div key={chat.chatingKey}>{chat.text}</div>
								);
							} else if (chat.user === "me") {
								return (
									<div key={chat.chatingKey}>
										{`나의 메시지 > ${chat.text}`}
									</div>
								);
							} else {
								return (
									<div key={chat.chatingKey}>
										{`${chat.user} > ${chat.text}`}
									</div>
								);
							}
						})}
					</ChatingBox>
					<ColCenter>
						<InputBox
							ref={inputEl}
							onChange={(e) => {
								setChatingInputText(e.target.value);
							}}
						/>
						<SendButton onClick={clearChatingInput} key="12">
							전송
						</SendButton>
					</ColCenter>
					<div
						style={{
							display: "flex",
							justifyContent: "end",
						}}
					>
						{state === "대기중" && master === me && (
							<div onClick={start}>
								<Button>시작하기</Button>
							</div>
						)}
						{state === "대기중" ? (
							<Link
								to="/"
								onClick={leave}
								style={{ textDecoration: "none" }}
							>
								<Button>돌아가기</Button>
							</Link>
						) : (
							<Button>돌아가기</Button>
						)}
					</div>
				</div>
			</Right>
		</Body>
	);
};

export default React.memo(Game);

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
	DEAD: 7,
};

const BLOCK = {
	WIDTH: 20,
	HEIGHT: 20,
	BORDER_WIDTH: 2,
};

const GAME_WINDOW = {
	WIDTH: BLOCK.WIDTH * 10,
	HEIGHT: BLOCK.HEIGHT * 20,
	BORDER_WIDTH: 5,
};

const PREVIEW_WINDOW = {
	WIDTH: BLOCK.WIDTH * 5,
	HEIGHT: BLOCK.HEIGHT * 4,
	BORDER_WIDTH: 4,
};

const ENEMY_BLOCK = {
	WIDTH: 13,
	HEIGHT: 13,
	BORDER_WIDTH: 1,
};

const ENEMY_WINDOW = {
	WIDTH: ENEMY_BLOCK.WIDTH * 10,
	HEIGHT: ENEMY_BLOCK.HEIGHT * 20,
	BORDER_WIDTH: 4,
};

const NUMBER_OF_BLOCKS = 4;

const Body = styled("div")`
	height: 80vh;
	width: 100%;
	margin: 5vh 0px;
	display: flex;
	justify-content: center;
`;
const Left = styled.div`
	margin: 50px 0px;
	width: 600px;
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
	&:empty {
		width: 0px;
		margin: 0px;
	}
`;
const EnemyWindow = styled.div`
	position: relative;
	border-width: ${ENEMY_WINDOW.BORDER_WIDTH}px;
	border-color: white;
	border-style: solid;
	background-color: #222;
	width: ${ENEMY_WINDOW.WIDTH}px;
	height: ${ENEMY_WINDOW.HEIGHT}px;
	overflow: hidden;
	margin: 1vh 1vw;
`;
const Center = styled.div`
	margin: 5vh 3vw;
	width: 500px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
`;
const GameWindow = styled.div`
	position: relative;
	border-width: ${GAME_WINDOW.BORDER_WIDTH}px;
	border-color: white;
	border-style: solid;
	background-color: #222;
	width: ${GAME_WINDOW.WIDTH}px;
	height: ${GAME_WINDOW.HEIGHT}px;
	overflow: hidden;
`;
const PreviewWindows = styled.div`
	position: relative;
	width: ${PREVIEW_WINDOW.WIDTH}px;
	height: ${PREVIEW_WINDOW.HEIGHT * 2 + PREVIEW_WINDOW.BORDER_WIDTH * 4}px;
	overflow: hidden;
`;
const PreviewWindow = styled.div`
	position: relative;
	border-width: ${PREVIEW_WINDOW.BORDER_WIDTH}px;
	border-color: white;
	border-style: solid;
	background-color: #222;
	width: ${PREVIEW_WINDOW.WIDTH}px;
	height: ${PREVIEW_WINDOW.HEIGHT}px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const PreviewCenter = styled.div`
	position: relative;
	left: ${BLOCK.WIDTH / 2}px;
`;
const PreviewBlockStyle = css`
	position: absolute;
	border-width: ${BLOCK.BORDER_WIDTH}px;
	border-color: white;
	border-style: outset;
	width: ${BLOCK.WIDTH - BLOCK.BORDER_WIDTH * 2}px;
	height: ${BLOCK.HEIGHT - BLOCK.BORDER_WIDTH * 2}px;
`;
const Id = styled.div`
	position: relative;
	width: 205px;
	height: 20px;
	text-align: center;
	font-size: 15px;
	background-color: white;
	border-style: solid;
`;
const Right = styled.div`
	margin: 5vh 5vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;
const ChatingBox = styled.div`
	text-align: left;
	background-color: #222;
	width: 300px;
	border-style: solid;
	border-color: #666;
	height: 200px;
	font-size: 12pt;
	overflow: auto;
	color: white;
`;
const InputBox = styled.input`
	border-style: solid;
	width: 90%;
	height: 20px;
	font-size: 10px;
`;
const SendButton = styled.button`
	position: relative;
	width: 10%;
	height: 25px;
	font-size: 14px;
	color: black;
	text-align: center;
	padding: 0;
`;
const BlockStyle = css`
	position: absolute;
	border-width: ${BLOCK.BORDER_WIDTH}px;
	border-color: white;
	border-style: outset;
	width: ${BLOCK.WIDTH - BLOCK.BORDER_WIDTH * 2}px;
	height: ${BLOCK.HEIGHT - BLOCK.BORDER_WIDTH * 2}px;
`;
const EnemyBlockStyle = css`
	position: absolute;
	border-width: ${ENEMY_BLOCK.BORDER_WIDTH}px;
	border-color: white;
	border-style: outset;
	width: ${ENEMY_BLOCK.WIDTH - ENEMY_BLOCK.BORDER_WIDTH * 2}px;
	height: ${ENEMY_BLOCK.HEIGHT - ENEMY_BLOCK.BORDER_WIDTH * 2}px;
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
const ColCenter = styled.div`
	display: flex;
	justify-content: center;
`;

let blockKey = 1;
let upLineCount = 1;
let dropMilliseconds = 300;

const createPreviewBlock: () => BLOCKS = () => {
	switch (Math.floor(Math.random() * 7)) {
		case BLOCK_SHAPE.SQUARE:
			return [
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.SQUARE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH,
					color: "red",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.SQUARE,
					y: -BLOCK.HEIGHT * 2,
					x: 0,
					color: "red",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.SQUARE,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH,
					color: "red",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.SQUARE,
					y: -BLOCK.HEIGHT,
					x: 0,
					color: "red",
				},
			];
		case BLOCK_SHAPE.LINEAR:
			return [
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.LINEAR,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH,
					color: "purple",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.LINEAR,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH * 2,
					color: "purple",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.LINEAR,
					y: -BLOCK.HEIGHT,
					x: 0,
					color: "purple",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.LINEAR,
					y: -BLOCK.HEIGHT,
					x: BLOCK.WIDTH,
					color: "purple",
				},
			];
		case BLOCK_SHAPE.FALCI_SHAPE:
			return [
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.FALCI_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH,
					color: "pink",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.FALCI_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: 0,
					color: "pink",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.FALCI_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH * 2,
					color: "pink",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.FALCI_SHAPE,
					y: -BLOCK.HEIGHT,
					x: 0,
					color: "pink",
				},
			];
		case BLOCK_SHAPE.REVERSE_FALCI_SHAPE:
			return [
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH,
					color: "yellow",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH * 2,
					color: "yellow",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: 0,
					color: "yellow",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.REVERSE_FALCI_SHAPE,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH * 2,
					color: "yellow",
				},
			];
		case BLOCK_SHAPE.MOUNTINE_SHAPE:
			return [
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.MOUNTINE_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH,
					color: "orange",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.MOUNTINE_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH * 2,
					color: "orange",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.MOUNTINE_SHAPE,
					y: -BLOCK.HEIGHT * 2,
					x: 0,
					color: "orange",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.MOUNTINE_SHAPE,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH,
					color: "orange",
				},
			];
		case BLOCK_SHAPE.BENT_UP_LINE:
			return [
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_UP_LINE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH,
					color: "green",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_UP_LINE,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH * 2,
					color: "green",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_UP_LINE,
					y: -BLOCK.HEIGHT * 2,
					x: 0,
					color: "green",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_UP_LINE,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH,
					color: "green",
				},
			];
		case BLOCK_SHAPE.BENT_DOWN_LINE:
			return [
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_DOWN_LINE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH,
					color: "blue",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_DOWN_LINE,
					y: -BLOCK.HEIGHT,
					x: 0,
					color: "blue",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_DOWN_LINE,
					y: -BLOCK.HEIGHT * 2,
					x: -BLOCK.WIDTH * 2,
					color: "blue",
				},
				{
					key: blockKey++,
					shape: BLOCK_SHAPE.BENT_DOWN_LINE,
					y: -BLOCK.HEIGHT,
					x: -BLOCK.WIDTH,
					color: "blue",
				},
			];
		default:
			return [];
	}
};

const getMainBlock = (blocks: BLOCKS) => {
	blocks.forEach((block) => {
		block.x += GAME_WINDOW.WIDTH / 2;
	});

	return blocks;
};

const isOverd = (blocks: BLOCKS) => {
	for (let i = blocks.length - 4; i < blocks.length; ++i) {
		if (
			blocks[i].y >= GAME_WINDOW.HEIGHT ||
			blocks[i].x >= GAME_WINDOW.WIDTH ||
			blocks[i].x < 0
		) {
			return true;
		}

		for (let j = 0; j < blocks.length - 4; ++j) {
			if (blocks[i].y === blocks[j].y && blocks[i].x === blocks[j].x) {
				return true;
			}
		}
	}

	return false;
};
