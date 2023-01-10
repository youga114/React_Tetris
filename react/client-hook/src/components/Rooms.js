import React from "react";
import "./Rooms.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "@emotion/styled";

const Menu = styled.div`
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

const Player = styled.div`
	position: absolute;
	top: 530px;
	left: 400px;
	width: 500px;
	text-align: center;
	font-size: 30px;
`;

const MakeRoomButton = styled.button`
	position: absolute;
	top: 70px;
	left: 400px;
`;

const Room = styled.div`
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

let Rooms = () => {
	const createRoom = () => {
		var name = prompt("방 이름을 입력하세요", "");
		// this.props.onMakeFun(name,this.props.player);
		this.props.dispatch({
			type: "server/make",
			data: { name: name, master: this.props.me },
		}); //client -> server
	};

	const joinRoom = (roomNum) => {
		this.props.dispatch({
			type: "server/join",
			data: { user: this.props.me, roomNum: roomNum },
		}); //client -> server
	};

	return (
		<div>
			<Link to="/tetris">
				<MakeRoomButton onClick={createRoom}>방 만들기</MakeRoomButton>
			</Link>
			<Menu>
				{this.props.rooms.map((room) => {
					if (room.personNum < 6) {
						if (room.state === "대기중") {
							return (
								<Link
									to="/tetris"
									key={room.roomNum}
									className="textDecorationNone"
									onClick={() => this._joinFun(room.roomNum)}
								>
									<Room>
										방제 : {room.name}{" "}
										&nbsp;&nbsp;&nbsp;인원 :{" "}
										{room.personNum}/6 &nbsp;&nbsp;방장 :{" "}
										{room.master} &nbsp;&nbsp;상태 :{" "}
										{room.state}
									</Room>
								</Link>
							);
						} else {
							return (
								<Link
									to="/tetris"
									key={room.roomNum}
									className="textDecorationNone"
									onClick={() => joinRoom(room.roomNum)}
								>
									<div className="startGame">
										방제 : {room.name}{" "}
										&nbsp;&nbsp;&nbsp;인원 :{" "}
										{room.personNum}/6 &nbsp;&nbsp;방장 :{" "}
										{room.master} &nbsp;&nbsp;상태 :{" "}
										{room.state}
									</div>
								</Link>
							);
						}
					} else {
						if (room.state === "대기중") {
							return (
								<div className="textDecorationNone">
									<Room>
										방제 : {room.name}{" "}
										&nbsp;&nbsp;&nbsp;인원 :{" "}
										{room.personNum}/6 &nbsp;&nbsp;방장 :{" "}
										{room.master} &nbsp;&nbsp;상태 :{" "}
										{room.state}
									</Room>
								</div>
							);
						} else {
							return (
								<div className="textDecorationNone">
									<div className="startGame">
										방제 : {room.name}{" "}
										&nbsp;&nbsp;&nbsp;인원 :{" "}
										{room.personNum}/6 &nbsp;&nbsp;방장 :{" "}
										{room.master} &nbsp;&nbsp;상태 :{" "}
										{room.state}
									</div>
								</div>
							);
						}
					}
				})}
			</Menu>
			<Player>{this.props.me}님 안녕하세요!</Player>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		rooms: state.rooms,
		me: state.me,
	};
};

Rooms = connect(mapStateToProps)(Rooms);

export default Rooms;