/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const GameItem = ({
	gameNum,
	numberOfPeople,
	title,
	master,
	state,
	onJoin,
}: {
	gameNum: number;
	numberOfPeople: number;
	title: string;
	master: string;
	state: string;
	onJoin: () => void;
}) => {
	return (
		<LinkWrapper
			gameNum={gameNum}
			numberOfPeople={numberOfPeople}
			onJoin={onJoin}
		>
			<div css={state === "대기중" ? waitingGame : playingGame}>
				방제 : {title} &nbsp; | &nbsp;인원 : {numberOfPeople}/6 &nbsp; |
				&nbsp;방장 : {master} &nbsp; | &nbsp;{state}
			</div>
		</LinkWrapper>
	);
};
export default GameItem;

const LinkWrapper = ({
	gameNum,
	numberOfPeople,
	onJoin,
	children,
}: {
	gameNum: number;
	numberOfPeople: number;
	onJoin: () => void;
	children: JSX.Element;
}) => {
	if (numberOfPeople < 6) {
		return (
			<Link
				to="/tetris"
				key={gameNum}
				onClick={onJoin}
				style={{ textDecoration: "none" }}
			>
				{children}
			</Link>
		);
	}

	return children;
};

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
