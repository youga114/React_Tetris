import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import GameItemContainer from "../containers/GameItemContainer";
import Button from "./Button";

const Lobby = ({
	games,
	me,
	onCreate,
}: {
	games: {
		gameNumber: number;
		numberOfUsers: number;
		name: string;
		master: string;
		state: string;
	}[];
	me: string;
	onCreate: () => void;
}) => {
	return (
		<Body>
			<CreateGameDiv>
				<Link
					to="/tetris"
					style={{ textDecoration: "none" }}
					onClick={onCreate}
				>
					<Button>게임 생성하기</Button>
				</Link>
			</CreateGameDiv>
			<GameList>
				{games.map((game) => (
					<GameItemContainer
						key={game.gameNumber}
						gameNum={game.gameNumber}
						numberOfPeople={game.numberOfUsers}
						title={game.name}
						master={game.master}
						state={game.state}
					/>
				))}
			</GameList>
			{/* <Greeting>ID: {me}</Greeting> */}
		</Body>
	);
};

export default Lobby;

const Body = styled.div`
	height: 100vh;
	width: 100vw;
	margin: 0;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const GameList = styled.div`
	border-style: double;
	border-color: white;
	border-width: 4px;
	background-color: #222;
	opacity: 0.8;
	width: 500px;
	height: 70%;
	overflow-y: scroll;
`;

const Greeting = styled.div`
	width: 500px;
	text-align: center;
	font-size: 30px;
	color: yellow;
`;

const CreateGameDiv = styled.div`
	justify-content: flex-start;
	width: 500px;
	margin: 5px;
	display: flex;
`;
