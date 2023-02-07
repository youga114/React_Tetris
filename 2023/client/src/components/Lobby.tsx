import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import GameItemContainer from "../containers/GameItemContainer";

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
	border-color: black;
	border-width: 4px;
	background-color: rgb(250, 250, 250);
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
`;

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
			<Link to="/tetris">
				<CreateGameDiv>
					<button onClick={onCreate}>방 만들기</button>
				</CreateGameDiv>
			</Link>
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
			<Greeting>ID: {me}</Greeting>
		</Body>
	);
};

export default Lobby;
