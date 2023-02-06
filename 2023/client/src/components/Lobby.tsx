import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import GameItemContainer from "../containers/GameItemContainer";

const GameList = styled.div`
	position: absolute;
	border-style: double;
	border-color: black;
	border-width: 4px;
	background-color: white;
	width: 500px;
	height: 400px;
	top: 100px;
	left: 400px;
	overflow-y: scroll;
`;

const Greeting = styled.div`
	position: absolute;
	top: 530px;
	left: 400px;
	width: 500px;
	text-align: center;
	font-size: 30px;
`;

const CreateGameButton = styled.button`
	position: absolute;
	top: 70px;
	left: 400px;
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
		<div>
			<Link to="/tetris">
				<CreateGameButton onClick={onCreate}>
					방 만들기
				</CreateGameButton>
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
			<Greeting>{me}님 안녕하세요!</Greeting>
		</div>
	);
};

export default Lobby;
