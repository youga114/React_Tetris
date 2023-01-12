import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const waitingGame = css`
	text-align: left;
	padding: 10px;
	margin: 10px;
	border-width: 2px;
	border-style: solid;
	border-color: navy;
	color: black;
	background-color: rgb(212, 244, 250);
	&:hover {
		background-color: rgb(146, 255, 255);
	}
`;

const playingGame = css`
	text-align: left;
	padding: 10px;
	margin: 10px;
	border-width: 2px;
	border-style: solid;
	border-color: navy;
	color: black;
	background-color: rgb(255, 216, 216);
	&:hover {
		background-color: rgb(242, 200, 200);
	}
`;

const LinkWrapper = ({
	gameNum,
	numberOfPeople,
	onJoin,
	children,
}) => {
	if (numberOfPeople >= 6) {
		return (
			<Link
				to="/tetris"
				key={gameNum}
				onClick={onJoin(gameNum)}
			>
				{children}
			</Link>
		);
	}

	return children;
};

const Game = ({
	gameNum,
	numberOfPeople,
	title,
	master,
	state,
	onJoin,
}) => {
	return (
		<LinkWrapper
			gameNum={gameNum}
			numberOfPeople={numberOfPeople}
			onJoin={onJoin}
		>
			<div
				css={
					state === "대기중"
						? waitingGame
						: playingGame
				}
			>
				방제 : {title} &nbsp;&nbsp;&nbsp;인원 :{" "}
				{numberOfPeople}/6 &nbsp;&nbsp;방장 :{" "}
				{master} &nbsp;&nbsp;상태 : {state}
			</div>
		</LinkWrapper>
	);
};
export default Game;
