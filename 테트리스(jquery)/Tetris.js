var http=require('http');
var express=require('express');
var socketio=require('socket.io');
 
var app=express();
app.use(express.static('public'));
var server=http.createServer(app).listen(52273,function(){
	console.log('Server Running at http://127.0.0.1:52273');
});

var io=socketio.listen(server);

var menu=[];				//현재 존재하는 방 정보를 담을 배열
var users=[];				//방에 따라 접속하는 유저를 담을 배열
var allUsers=[];			//현재 존재하는 모든 유저를 담을 배열
var allRooms=[];			//현재 존재하는 모든 방제를 담을 배열
var noName=1;				//아이디를 입력하지 않는 유저들에 대해 아이디를 구별짓기 위한 변수
var noRoom=1;				//방제를 입력하지 않는 유저들에 대해 방제를 구별짓기 위한 변수

io.sockets.on('connection',function(socket){			//소켓 연결되면 다음 함수를 실행
	socket.on("disconnect",function(){					//소켓 해제되면 다음 함수를 실행
		console.log("goodbye");
	})

	io.sockets.to(socket.id).emit('goId',{socketId:socket.id,noName:noName});			//접속한 유저의 id를 그 유저에게 전송
	noName++;
	socket.on('join',function(data){
		socket.join(data.room);							//data.room방에 접속
		io.sockets.to(data.myId).emit('menuReceive',menu);			//data.myId에게 menu배열을 담아 'menuReceive'로 소켓전송 
	})
	socket.on('roomMake',function(data){
    	allRooms.push(data.gameRoom);								//allRooms배열에 방제를 추가
		var hung={gameRoom:data.gameRoom,gamePerson:data.gamePerson,gameMaster:data.gameMaster,myId:data.myId,gaming:"대기중"};
		//menu배열에 담을 방 정보들
		users.push([data.gameMaster]);				//users배열에 방장을 추가
		menu.push(hung);							//menu배열에 방 정보를 추가
		socket.leave('init');						//'init'(대기실)방을 떠남
		socket.join(data.gameRoom);					//data.gameRoom방을 접속
		io.sockets.to(data.myId).emit('roomMake');	//data.myId에게 'roomMake'로 소켓전송
		socket.broadcast.in('init').emit('menuReceive',menu);		//대기실방에 menu배울을 담아 'menuReceive'로 소켓전송
	})
	socket.on('roomClick',function(data){
		socket.leave('init');						//'init'(대기실)방을 떠남
		socket.join(data.room);						//data.room방을 접속

		for(var i=0;i<menu.length;i++){
			if(menu[i].gameRoom==data.room){
				menu[i].gamePerson+=1;				//해당 방 인원을 1명 추가
				users[i].push(data.user);			//해당 방 users배열에 유저를 추가
				break;
			}
		}
		io.sockets.in('init').emit('menuReceive',menu);			//'init'(대기실)방에 menu배열을 담아 'menuReceive'로 소켓전송
		io.sockets.to(data.myId).emit('myOrderCheck',users[i]);		//data.myId에게 해당 방 유저들을 담아 'myOrderCheck'로 소켓전송
	})

	socket.on('myOrder',function(data){
		socket.broadcast.in(data.room).emit('addUser',data);
	})

	socket.on('exit',function(data){
		var instantUser;
		for(var i=0;i<menu.length;i++){
			if(menu[i].gameRoom==data.room){
				menu[i].gamePerson-=1;					//해당 방 인원을 1명 감소
				for(var j=0;j<users[i].length;j++){
					if(users[i][j]==data.user){
						users[i].splice(j,1);			//해당 방 users배열에 유저를 삭제
						instantUser=users[i];
						break;
					}
				}
				break;
			}
		}
		menu[i].gameMaster=users[i][0];
		for(var i=0;i<menu.length;i++){
			if(menu[i].gamePerson==0){					//현재 존재하는 방에 인원이 0명인 방이 존재한다면
				menu.splice(i,1);						//menu배열에 해당 방 정보 삭제
				allRooms.splice(i,1);					//allRooms배열에 해당 방제 삭제
				users.splice(i,1);						//users배열에 해당 방 유저들 삭제
				break;//커트
			}
		}
		socket.leave(data.room);						//data.room방을 떠남
		socket.join('init');							//'init'(대기실)방을 접속
		io.sockets.in('init').emit('menuReceive',menu);		//'init'(대기실)방에 menu를 담아 'menuReceive'로 소켓전송
		socket.broadcast.in(data.room).emit('removeUser',{user:data.user,users:instantUser});	//해당 방에 유저가 나갔다고 알림
	})

	socket.on('text',function(data){
		io.sockets.in(data.room).emit('texts',data);			//채팅창에 텍스트들을 보여줌
	})
	socket.on('start',function(room){
		for(var i=0;i<menu.length;i++){
			if(menu[i].gameRoom==room){
				menu[i].gaming="게임중";							//현재 상태를 "게임중"으로 바꿔줌
				break;
			}
		}
		io.sockets.in('init').emit('menuReceive',menu);		//'init'(대기실)방에 menu를 담아 'menuReceive'로 소켓전송
		io.sockets.in(room).emit('start');					//해당 방에 'start'로 소켓전송
	})

	socket.on('rint',function(data){
		socket.broadcast.in(data.room).emit('smart',data);	
	})

	socket.on('lineup',function(data){
		socket.broadcast.in(data.room).emit('upline',data.randomVar);	//다른사람의 블록들을 한 줄 올림
	})

	socket.on('gameset',function(data){
		io.sockets.in(data.room).emit('gameset',data.myOrder);			//게임이 끝났다는 것을 해당 방에 뿌려줌
	})

	socket.on('myRank',function(data){
		for(var i=0;i<menu.length;i++){
			if(menu[i].gameRoom==data){
				break;
			}
		}
		io.sockets.in(data).emit('myRank',users[i].length);				//유저의 총 인원을 해당방에 알려줌
	})

	socket.on('allUser',function(data){
		allUsers.push(data);
	})

	socket.on('userCheck',function(data){
		var userFlag=0;
		for(var i=0;i<allUsers.length;i++){
			if(allUsers[i]==data.user){
				userFlag=1;
				break;
			}
		}
		io.sockets.to(data.myId).emit('userCheck',userFlag);			//이미 존재하는 아이디인지 확인 후 존재하면 true, 존재하지 않으면 false를 보냄
	})

    socket.on('allRoomCheck',function(data){
		var roomFlag=0;
		for(var i=0;i<allRooms.length;i++){
			if(allRooms[i]==data.room){
				roomFlag=1;
				break;
			}
		}
		io.sockets.to(data.myId).emit('allRoomCheck',roomFlag);			//이미 존재하는 방제인지 확인 후 존재하면 true, 존재하지 않으면 false를 보냄
    })

    socket.on('getNoroom',function(data){
		io.sockets.to(data).emit('getNoroom',noRoom);					//방제를 작성하지 않는 사람이라면 noRoom을 보내고
		noRoom++;														//noRoom카운트를 하나 올림
    })

    socket.on('gameEnd',function(room){
		for(var i=0;i<menu.length;i++){
			if(menu[i].gameRoom==room){
				menu[i].gaming="대기중";						//해당 방의 상태를 "대기중"으로 바꿔줌
				break;
			}
		}
		io.sockets.in('init').emit('menuReceive',menu);		//'init'(대기실)방에 menu를 담아 'menuReceive'로 소켓전송
    })
});