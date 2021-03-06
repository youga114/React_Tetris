import React, { Component } from 'react';
import './Tetris.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Tetris extends Component {
  constructor(props) {
    super(props);

    window.addEventListener('keydown',this._getkeyAndMove,false);

    this.stateValue=0;
    this.tid=0;
    this.fired=false;
    this.blockState=0;
    this.lastUserFlag=0;
    this.lineupFlag=0;
    this.gage=1;

    this.state = {
      text:"",
      blocks: this.props.blocks,
      preview: [],
      preview2: [],
      rank:"",
      blockKey:5
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.state==="게임중"&&this.stateValue===0){
      this.lastUserFlag=1;
      this._initialFun();
    }
    if(nextProps.personNum===1&&nextProps.state==="대기중"){
      this.stateValue=0;
      if(this.lastUserFlag===1){
        this._gamesetFun(nextProps.personNum);
      }
    }
    if(nextProps.lineup!==this.lineupFlag){
      this.lineupFlag++;
      this._lineupFun();
    }
  }

  componentDidUpdate = () => {
    this._chat.scrollTop = this._chat.scrollHeight;
  }

  _chatFun = () => {
    this.props.dispatch({type:'server/speak',data:{speaker:this.props.me,content:this.state.text,myRoom:this.props.myRoom}});              //client -> server
    this._input.value="";
    this.setState({
      text:" "
    })
  }

  _exitFun = () => {
    this.props.dispatch({type:'server/exit',data:{roomName:this.props.myRoom,user:this.props.me,someoneNum:this.props.myNum}});              //client -> server
  }

  _startFun = () => {
    this.stateValue=0;
    this.props.dispatch({type:'server/start',data:{roomName:this.props.myRoom}});              //client -> server
  }

  _initialFun= () => {
    window.removeEventListener('keydown',this.getkeyAndMove,false);
    window.addEventListener('keydown',this._getkeyAndMove2,false);
    window.addEventListener('keyup',this._respace,false);
    this.stateValue=1;
    this.setState({
      blocks: this.state.blocks.splice(0,this.state.blocks.length),
      preview: this.state.preview.splice(0,this.state.preview.length),
      preview2: this.state.preview2.splice(0,this.state.preview2.length),
      rank:"",
      blockKey:5,
    })
    let moment=this._makePreviewFun();
    this._nextMakeFun(this._makeFun(moment[0][1]),this._makePreviewFun(),this._makePreviewFun());
    this.tid=setInterval(this._dropFun,300);
  }

  _firstFun = () => {
    let blocks=[];
    return blocks; 
  }

  _nextMakeFun = (blocks,preview,preview2) => {
    this.blockState=0;
    this.setState({
      blocks:blocks,
      preview:preview,
      preview2:preview2
    });
  }

  _makeNewPreviewFun = () => {
    this._lineClear();                    //한줄이 다 찼는지 확인하는 함수
    this._nextMakeFun(this._makeFun(this.state.preview[0][1]),this.state.preview2,this._makePreviewFun());

    let length=this.state.blocks.length;
    for(let i=0;i<length-4;i++){              
      for(let j=length-4;j<length;j++){
        if(this.state.blocks[i][2]===this.state.blocks[j][2]&&this.state.blocks[i][3]===this.state.blocks[j][3]){                 //생성된 블록이 위치한 곳에 다른 블록이 겹친다면
          this._gamesetFun(this.props.personNum);
          return;
        }
      }
    }
  }

  _gamesetFun = (personNum) => {
    this.lastUserFlag=0;
    this.setState({
      blocks:this._endFun(),
      rank: personNum
    })
    window.removeEventListener('keydown',this._getkeyAndMove2,false);
    window.removeEventListener('keyup',this._respace,false);
    window.addEventListener('keydown',this._getkeyAndMove,false);
    clearInterval(this.tid);
    this.props.dispatch({type:'server/gameset',data:{roomName:this.props.myRoom,blocks:this.state.blocks,myNum:this.props.myNum,rank:personNum}});              //client -> server
    if(this.props.personNum===1){
      this.props.dispatch({type:'server/gamesetTome',data:{rank:personNum}});              //client -> server
    }
  }

  _endFun = () => {
    let blocks=this.state.blocks;
    for(let i=0;i<blocks.length;i++){
        blocks[i].push("rgb(166,166,166)");
    }
   return blocks; 
  }

  _makePreviewFun = () => {
    let block=[];
    let these=Math.floor(Math.random()*7);          //랜덤하게 2번째 미리보기의 블록을 채움
    switch(these){
      case 0:           //네모
        block.push([1,these,19,24]);
        block.push([2,these,19,43]);
        block.push([3,these,38,24]);
        block.push([4,these,38,43]);
        return block;
      case 1:           //직선
        block.push([1,these,30,22]);
        block.push([2,these,30,3]);
        block.push([3,these,30,41]);
        block.push([4,these,30,60]);
        return block;
      case 2:           //기억
        block.push([1,these,20,31]);
        block.push([2,these,20,12]);
        block.push([3,these,20,50]);
        block.push([4,these,39,50]);
        return block;
      case 3:           //반대기억
        block.push([1,these,20,31]);
        block.push([2,these,20,12]);
        block.push([3,these,20,50]);
        block.push([4,these,39,12]);
        return block;
      case 4:           //엿
        block.push([1,these,20,31]);
        block.push([2,these,20,12]);
        block.push([3,these,20,50]);
        block.push([4,these,39,31]);
        return block;
      case 5:           //반대리을
        block.push([1,these,20,31]);
        block.push([2,these,39,12]);
        block.push([3,these,20,50]);
        block.push([4,these,39,31]);
        return block;
      case 6:           //리을
        block.push([1,these,20,31]);
        block.push([2,these,39,50]);
        block.push([3,these,20,12]);
        block.push([4,these,39,31]);
        return block;
      default:
        return block;
    }
  }

  _makeFun = (these) => {
    let block=this.state.blocks;
    let key=this.state.blockKey;
    switch(these){
      case 0:           //네모
        block.push([key++,these,-19,76]);
        block.push([key++,these,-19,95]);
        block.push([key++,these,0,76]);
        block.push([key++,these,0,95]);
        break;
      case 1:           //직선
        block.push([key++,these,-19,76]);
        block.push([key++,these,-19,57]);
        block.push([key++,these,-19,95]);
        block.push([key++,these,-19,114]);
        break;
      case 2:           //기억
        block.push([key++,these,-19,76]);
        block.push([key++,these,-19,57]);
        block.push([key++,these,-19,95]);
        block.push([key++,these,0,95]);
        break;
      case 3:           //반대기억
        block.push([key++,these,-19,76]);
        block.push([key++,these,-19,57]);
        block.push([key++,these,-19,95]);
        block.push([key++,these,0,57]);
        break;
      case 4:           //엿
        block.push([key++,these,-19,76]);
        block.push([key++,these,-19,57]);
        block.push([key++,these,-19,95]);
        block.push([key++,these,0,76]);
        break;
      case 5:           //반대리을
        block.push([key++,these,-19,76]);
        block.push([key++,these,0,57]);
        block.push([key++,these,-19,95]);
        block.push([key++,these,0,76]);
        break;
      case 6:           //리을
        block.push([key++,these,-19,76]);
        block.push([key++,these,0,95]);
        block.push([key++,these,-19,57]);
        block.push([key++,these,0,76]);
        break;
      default:
        return;
    }
    this.setState({
      blockKey:key
    });
    return block;
  }

  _dropFun = () => {
    this.props.dispatch({type:'server/blocks',data:{roomName:this.props.myRoom,blocks:this.state.blocks,myNum:this.props.myNum}});              //client -> server
    let block=this.state.blocks;
    let length=this.state.blocks.length;
    let flag=0;
    for(let i=0;i<length-4;i++){
      for(let j=length-4;j<length;j++){
        if(block[i][3]===block[j][3]&&block[i][2]===block[j][2]+19){
          flag=1;
          break;
        }
      }
      if(flag===1){
        break;
      }
    }
    if(flag===0){
      for(let i=length-4;i<length;i++){
        if(block[i][2]+19>=380){
          flag=1;
        }
      }
    }
    if(flag===1){
      this._makeNewPreviewFun();
    }
    else{
      for(let i=0;i<4;i++){
        block[length-1-i][2]+=19;
      }
      this.setState({blocks:block});
    }
  }

  _lineClear = () => {
    let randomVar=Math.floor(Math.random()*10);           //부서진 라인이 있다면 공격을 하기 위해 비운 위치를 저장하는 변수
    let blocks=[];
    let removeBlocks=this.state.blocks;
    let length=this.state.blocks.length;
    for(let i=0;i<length;i++){
        blocks.push(this.state.blocks[i]);
    }

    for(let i=length-4;i<length;i++){
      let myTopNumber=[];
      let myTop;
      for(let j=0;j<removeBlocks.length;j++){
        myTop=blocks[i][2];
        if(removeBlocks[j][2]===myTop){
          myTopNumber.push(j);
        }
      }
      if(myTopNumber.length>9){           //한 줄이 꽉 차 있다면(10칸이 다 채워져 있다면)
        for(let k=9;k>=0;k--){
          removeBlocks.splice(myTopNumber[k],1);            //그 줄에 있는 블록을 모두 지우고
        }
        for(let j=0;j<removeBlocks.length;j++){
          if(removeBlocks[j][2]<myTop){
            removeBlocks[j][2]+=19; //지운 블록들보다 위에 있는 블록들을 밑으로 한칸씩 내림
          }
        }
        this.props.dispatch({type:'server/lineup',data:{roomName:this.props.myRoom,randomVar:randomVar}});              //client -> server
      }
    }
    this.setState({
      blocks:removeBlocks
    })
    this.props.dispatch({type:'server/blocks',data:{roomName:this.props.myRoom,blocks:this.state.blocks,myNum:this.props.myNum}});              //client -> server
  }

  _lineupFun = () => {
    let blocks=this.state.blocks;
    let blockKey=this.state.blockKey;
    if(this.gage>this.props.personNum-2){                //유저의 공격받은 gage가 방에서 살아남은 인원에 비례
        for(let i=0;i<blocks.length-4;i++){
            blocks[i][2]-=19;    //현재 존재하는 블록들을 한줄씩 올림
        }
        for(let i=0;i<10;i++){
            if(this.props.randomVar!==i){
                blocks.splice(0,0,[blockKey++,"line",361,19*i]);         //블록들의 정보를 보관하는 배열에 이 블록들을 앞으로 넣음
            }
        }
        for(let i=blocks.length-4;i<blocks.length;i++){
            for(let j=0;j<blocks.length-4;j++){
                if(blocks[i][3]===blocks[j][3]&&blocks[i][2]===blocks[j][2]){                         //한칸을 올라오는 순간에 현재 떨어지고 있는 블록이 곂친다면
                    for(let k=blocks.length-4;k<blocks.length;k++){
                        blocks[k][2]-=19;      //현재 떨어지고 있는 블록을 한칸씩 올려버림
                    }
                    j-=1;
                }
            }
        }
        this.gage=1;
    }
    else{
        this.gage++;
    }
    this.setState({
      blockKey:blockKey,
      blocks:blocks
    });
  }

  _getkeyAndMove = (event) => {
    let keyCode; 
    if(event == null){
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    }
    else{
        keyCode = event.keyCode; 
    }
    switch(keyCode){ 
      case 13:                        //채팅을 보낼 때 필요한 엔터키를 활성화
        this._chatFun();
        break; 
      default:
        return;
    }
  }

  _getkeyAndMove2 = (event) => {
    let keyCode;
    let flag2=0;
    if(event === null){
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    }
    else{
        keyCode = event.keyCode; 
        event.preventDefault();
    }
    let length=this.state.blocks.length;
    let blocks=this.state.blocks;
    switch(keyCode){
      case 32:      //스페이스 버튼을 활성화
        if(this.fired===false){
          this.fired=true;
          do{
            for(let i=length-4;i<length;i++){
              if(blocks[i][2]>=380-19){     //바닥까지 닿았는지 확인
                flag2=1;
                break;
              }
            }
            if(flag2===0){
              for(let i=length-4;i<length;i++){              //밑에 걸리는게 있는지 확인
                for(let j=0;j<length-4;j++){
                  if(blocks[i][3]===blocks[j][3]&&blocks[i][2]+19===blocks[j][2]){
                    flag2=1;
                    break;
                  }
                }
               }
            }
            if(flag2===0){                 //걸리는게 없다면 한칸 내려오기
              for(let i=length-4;i<length;i++){
                blocks[i][2]+=19;
              }
            }
          }while(flag2===0)          //밑에 걸리는게 있을때 까지 위의 함수 반복
          this._makeNewPreviewFun();
        }
        return;
      case 37:      // 왼쪽 화살표
        for(let i=length-4;i<length;i++){
          if(blocks[i][3]-19<0){      //왼쪽 벽에 걸리는게 있는지 확인
            flag2=1;
            break;
          }
        }
        if(flag2===0){
          for(let i=length-4;i<length;i++){            //왼쪽에 블록이 있는지 확인
            for(let j=0;j<length-4;j++){
              if(blocks[i][3]-19===blocks[j][3]&&blocks[i][2]===blocks[j][2]){
                flag2=1;
                break;
              }
            }
          }
        }
        if(flag2===0){                   //블록이 왼쪽 벽에 붙어있지 않고 왼쪽에 블록이 없다면 왼쪽으로 한칸 이동
          for(let i=length-4;i<length;i++){
            blocks[i][3]-=19;
          }
        }
        this.setState({
          blocks:blocks
        })
        return;
      case 38:      // 위쪽 화살표를 활성화
        this._upKey();
        break; 
      case 39:    // 오른쪽 화살표를 활성화
        for(let i=length-4;i<length;i++){
          if(blocks[i][3]+19>=190){      //오른쪽 벽에 걸리는게 있는지 확인
            flag2=1;
            break;
          }
        }
        if(flag2===0){             //오른쪽에 블록이 있는지 확인
          for(let i=length-4;i<length;i++){
            for(let j=0;j<length-4;j++){
              if(blocks[i][3]+19===blocks[j][3]&&blocks[i][2]===blocks[j][2]){
                flag2=1;
                break;
              }
            }
          }
        }
        if(flag2===0){                   //블록이 오른쪽 벽에 붙어있지 않고 오른에 블록이 없다면 왼쪽으로 한칸 이동
          for(let i=length-4;i<length;i++){
            blocks[i][3]+=19;
          }
        }
        this.setState({
          blocks:blocks
        })
        return;
      case 40:      // 아래쪽 화살표를 활성화
        for(let i=length-4;i<length;i++){
          if(blocks[i][2]>=380-19){           //현재 움직이는 블록이 맨밑에 있지 않은지 확인
            flag2=1;
            break;
          }
        }
        if(flag2===0){
          for(let i=length-4;i<length;i++){
            for(let j=0;j<length-4;j++){
              if(blocks[i][3]===blocks[j][3]&&blocks[i][2]+19===blocks[j][2]){          //현재 움직이는 블록 바로 밑칸에 다른 블록이 없는지 확인
                flag2=1;
                break;
              }
            }
          }
        }
        if(flag2===0){
          for(let i=length-4;i<length;i++){                //현재 움직이는 블록이 맽밑에 있지 않고 바로 밑칸에 다른 블록이 없다면 밑으로 한칸 이동
            blocks[i][2]+=19;
          }
        }
        this.setState({
          blocks:blocks
        })
        return;
      default:
        break;
    }
  }

  _upKey = () => {
    let blocks=this.state.blocks;
    let appear=blocks.length-1;
    let these=blocks[appear][1];
    let state=this.blockState;
    if(these===4){                       //엿모양 돌리기
      if(state===0){
        blocks[appear][3]-=19;
        blocks[appear-1][3]-=38;
        blocks[appear-1][2]-=19;
        if(this._gumsa(blocks)===0){
          blocks[appear][3]+=19;
          blocks[appear-1][3]+=38;
          blocks[appear-1][2]+=19;
        }
        else{
          state++;
        }
      }
      else if(state===1){
        let howManyRight=0;
        blocks[appear-1][3]+=19;
        blocks[appear-1][2]+=38;
        blocks[appear-2][3]+=38;
        blocks[appear-2][2]+=19;
        if(this._rightSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]-=19;
          }
          howManyRight++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-1][3]-=19;
          blocks[appear-1][2]-=38;
          blocks[appear-2][3]-=38;
          blocks[appear-2][2]-=19;
          while(howManyRight!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]+=19;
            }
            howManyRight--;
          }
        }
        else{
          state++;
        }
      }
      else if(state===2){
        blocks[appear-1][3]+=19;
        blocks[appear-1][2]-=19;
        blocks[appear][3]+=38;
        blocks[appear][2]-=38;
        if(this._gumsa(blocks)===0){
          blocks[appear-1][3]-=19;
          blocks[appear-1][2]+=19;
          blocks[appear][3]-=38;
          blocks[appear][2]+=38;
        }
        else{
          state++;
        }
      }
      else{
        let howManyleft=0;
        blocks[appear-2][3]-=38;
        blocks[appear-2][2]-=19;
        blocks[appear][3]-=19;
        blocks[appear][2]+=38;
        if(this._leftSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]+=19;
          }
          howManyleft++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]+=38;
          blocks[appear-2][2]+=19;
          blocks[appear][3]+=19;
          blocks[appear][2]-=38;
          while(howManyleft!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]-=19;
            }
            howManyleft--;
          }
        }
        else{
          state=0;
        }
      }
    }
    if(these===1){                     //직선돌리기
      if(state===0){
        blocks[appear-2][3]+=19;
        blocks[appear-2][2]-=19;
        blocks[appear-1][3]-=19;
        blocks[appear-1][2]-=38;
        blocks[appear][3]-=38;
        blocks[appear][2]-=57;
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]-=19;
          blocks[appear-2][2]+=19;
          blocks[appear-1][3]+=19;
          blocks[appear-1][2]+=38;
          blocks[appear][3]+=38;
          blocks[appear][2]+=57;
        }
        else{
          state++;
        }
      }
      else{
        let howManyleft=0;
        let howManyRight=0;
        blocks[appear-2][3]-=19;
        blocks[appear-2][2]+=19;
        blocks[appear-1][3]+=19;
        blocks[appear-1][2]+=38;
        blocks[appear][3]+=38;
        blocks[appear][2]+=57;
        if(this._leftSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]+=19;
          }
          howManyleft++;
        }
        if(this._rightSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]-=19;
          }
          howManyRight++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]+=19;
          blocks[appear-2][2]-=19;
          blocks[appear-1][3]-=19;
          blocks[appear-1][2]-=38;
          blocks[appear][3]-=38;
          blocks[appear][2]-=57;
          while(howManyleft!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]-=19;
            }
            howManyleft--;
          }
          while(howManyRight!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]+=19;
            }
            howManyRight--;
          }
        }
        else{
          state=0;
        }
      }
    }
    if(these===2){                       //기억돌리기
      if(state===0){
        blocks[appear-3][2]-=19;
        blocks[appear-1][3]-=38;
        blocks[appear-1][2]+=19;
        blocks[appear][3]-=38;
        blocks[appear][2]-=38;
        if(this._gumsa(blocks)===0){
          blocks[appear-3][2]+=19;
          blocks[appear-1][3]+=38;
          blocks[appear-1][2]-=19;
          blocks[appear][3]+=38;
          blocks[appear][2]+=38;
        }
        else{
          state++;
        }
      }
      else if(state===1){
        let howManyRight=0;
        blocks[appear-3][2]+=38;
        blocks[appear][3]+=38;
        blocks[appear][2]+=38;
        if(this._rightSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]-=19;
          }
          howManyRight++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-3][2]-=38;
          blocks[appear][3]-=38;
          blocks[appear][2]-=38;
          while(howManyRight!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]+=19;
            }
            howManyRight--;
          }
        }
        else{
          state++;
        }
      }
      else if(state===2){
        blocks[appear-2][3]+=38; 
        blocks[appear-2][2]-=19;
        blocks[appear-1][3]+=38;
        blocks[appear-1][2]-=19;
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]-=38; 
          blocks[appear-2][2]+=19;
          blocks[appear-1][3]-=38;
          blocks[appear-1][2]+=19;
        }
        else{
          state++;
        }
      }
      else{
        let howManyleft=0;
        blocks[appear-3][2]-=19;
        blocks[appear-2][3]-=38;
        blocks[appear-2][2]+=19; 
        if(this._leftSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]+=19;
          }
          howManyleft++;
        }
        if(this._gumsa(blocks)===0){
        blocks[appear-3][2]+=19;
        blocks[appear-2][3]+=38;
        blocks[appear-2][2]-=19; 
          while(howManyleft!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]-=19;
            }
            howManyleft--;
          }
        }
        else{
          state=0;
        }
      }
    }
    if(these===3){                       //반대기억돌리기
      if(state===0){
        blocks[appear-3][2]+=19;
        blocks[appear-1][3]-=38;
        blocks[appear-1][2]-=19;
        if(this._gumsa(blocks)===0){
          blocks[appear-3][2]-=19;
          blocks[appear-1][3]+=38;
          blocks[appear-1][2]+=19;
        }
        else{
          state++;
        }
      }
      else if(state===1){
        let howManyRight=0;
        blocks[appear-1][3]+=38;
        blocks[appear-1][2]+=19;
        blocks[appear-2][3]+=38;
        blocks[appear-2][2]+=19;
        if(this._rightSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]-=19;
          }
          howManyRight++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-1][3]-=38;
          blocks[appear-1][2]-=19;
          blocks[appear-2][3]-=38;
          blocks[appear-2][2]-=19;
          while(howManyRight!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]+=19;
            }
            howManyRight--;
          }
        }
        else{
          state++;
        }
      }
      else if(state===2){
        blocks[appear-3][2]-=38;
        blocks[appear][3]+=38;
        blocks[appear][2]-=38;
        if(this._gumsa(blocks)===0){
        blocks[appear-3][2]+=38;
        blocks[appear][3]-=38;
        blocks[appear][2]+=38;
        }
        else{
          state++;
        }
      }
      else{
        let howManyleft=0;
        blocks[appear-3][2]+=19;
        blocks[appear-2][3]-=38;
        blocks[appear-2][2]-=19;
        blocks[appear][3]-=38;
        blocks[appear][2]+=38;
        if(this._leftSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]+=19;
          }
          howManyleft++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-3][2]-=19;
          blocks[appear-2][3]+=38;
          blocks[appear-2][2]+=19;
          blocks[appear][3]+=38;
          blocks[appear][2]-=38;
          while(howManyleft!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]-=19;
            }
            howManyleft--;
          }
        }
        else{
          state=0;
        }
      }
    }
    if(these===5){                     //반대리을 돌리기
      if(state===0){
        blocks[appear-2][3]+=38;
        blocks[appear][2]-=38;
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]-=38;
          blocks[appear][2]+=38;
        }
        else{
          state++;
        }
      }
      else{
        let howManyleft=0;
        blocks[appear-2][3]-=38;
        blocks[appear][2]+=38;
        if(this._leftSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]+=19;
          }
          howManyleft++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]+=38;
          blocks[appear][2]-=38;
          while(howManyleft!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]-=19;
            }
            howManyleft--;
          }
        }
        else{
          state=0;
        }
      }
    }
    if(these===6){                     //리을 돌리기
      if(state===0){
        blocks[appear-2][3]-=38;
        blocks[appear][2]-=38;
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]+=38;
          blocks[appear][2]+=38;
        }
        else{
          state++;
        }
      }
      else{
        let howManyRight=0;
        blocks[appear-2][3]+=38;
        blocks[appear][2]+=38;
        if(this._rightSide(blocks)===0){
          for(let j=appear-3;j<=appear;j++){
            blocks[j][3]-=19;
          }
          howManyRight++;
        }
        if(this._gumsa(blocks)===0){
          blocks[appear-2][3]-=38;
          blocks[appear][2]-=38;
          while(howManyRight!==0){
            for(let j=appear-3;j<=appear;j++){
              blocks[j][3]+=19;
            }
            howManyRight--;
          }
        }
        else{
          state=0;
        }
      }
    }
    this.blockState=state;
    this.setState({
      blocks:blocks
    })
    this.props.dispatch({type:'server/blocks',data:{roomName:this.props.myRoom,blocks:this.state.blocks,myNum:this.props.myNum}});              //client -> server
  }

  _gumsa = (blocks) => {                 //현재 움직이던 블록이 다른 블록들과 겹치는지 검사하는 함수
    for(let i=0;i<blocks.length-4;i++){
      for(let j=blocks.length-4;j<blocks.length;j++){
        if(blocks[j][2]===blocks[i][2]&&blocks[j][3]===blocks[i][3]){
          return 0;                   //겹치는게 있다면 false
        }
      }
    }
    return 1;                         //겹치는게 없다면 true
  }

  _rightSide = (blocks) => {               //현재 움직이는 블록이 모양을 변경 했을 때 오른쪽 벽을 넘어가는지 확인하는 함수
    for(let j=blocks.length-4;j<blocks.length;j++){
      if(blocks[j][3]>=190){
        return 0;                     //넘어가면 false
      }
    }
    return 1;                         //넘어가지 않으면 true
  }

  _leftSide = (blocks) => {               //현재 움직이는 블록이 모양을 변경 했을 때 왼쪽 벽을 넘어가는지 확인하는 함수
    for(let j=blocks.length-4;j<blocks.length;j++){
      if(blocks[j][3]<0){
        return 0;                     //넘어가면 false
      }
    }
    return 1;                         //넘어가지 않으면 true
  }

  _respace = (event) => {
    let keyCode;
    if(event == null){
      keyCode = window.event.keyCode;
      window.event.preventDefault();
    }
    else{
      keyCode = event.keyCode; 
      event.preventDefault();
    }
    switch(keyCode){
      case 32:      //스페이스를 떼는 버튼을 활성화
        this.fired=false;
        break;
      default:
        break;
    }
  }

  render(){
    return (
      <div className="body">
        <div className="base" key="pan">
          {
            this.state.blocks.map((item,index)=>{
              let blockStyle = {
                top:item[2],
                left:item[3],
                backgroundColor:item[4]
              }
              return(
                <div key={item[0]} className={'a'+item[1]} style={blockStyle}></div>
              )
            })
          }
          {
            <div className="rank">{this.state.rank}</div>
          }
        </div>
        <div className="base2" key="pan2">
          {
            this.state.preview.map((item,index)=>{
              let blockStyle = {
                top:item[2],
                left:item[3]
              }
              return(
                <div key={"b"+item[0]} className={'a'+item[1]} style={blockStyle}></div>
              )
            })
          }
        </div>
        <div className="base3" key="pan3">
          {
            this.state.preview2.map((item,index)=>{
              let blockStyle = {
                top:item[2],
                left:item[3]
              }
              return(
                <div key={"b"+item[0]} className={'a'+item[1]} style={blockStyle}></div>
              )
            })
          }
        </div>
        <div className="enemy1" key="enemy1">
          {
            this.props.blocks2.map((item,index)=>{
              let blockStyle = {
                top:13*(item[2]/19),
                left:13*(item[3]/19),
                backgroundColor:item[4]
              }
              return(
                <div key={item[0]} className={'a'+item[1]+'z'} style={blockStyle}></div>
              )
            })
          }
          {
            <div className="rank2">{this.props.enemyRank2}</div>
          }
        </div>
        <div className="enemy2" key="enemy2">
          {
            this.props.blocks3.map((item,index)=>{
              let blockStyle = {
                top:13*(item[2]/19),
                left:13*(item[3]/19),
                backgroundColor:item[4]
              }
              return(
                <div key={item[0]} className={'a'+item[1]+'z'} style={blockStyle}></div>
              )
            })
          }
          {
            <div className="rank2">{this.props.enemyRank3}</div>
          }
        </div>
        <div className="enemy3" key="enemy3">
          {
            this.props.blocks4.map((item,index)=>{
              let blockStyle = {
                top:13*(item[2]/19),
                left:13*(item[3]/19),
                backgroundColor:item[4]
              }
              return(
                <div key={item[0]} className={'a'+item[1]+'z'} style={blockStyle}></div>
              )
            })
          }
          {
            <div className="rank2">{this.props.enemyRank4}</div>
          }
        </div>
        <div className="enemy4" key="enemy4">
          {
            this.props.blocks5.map((item,index)=>{
              let blockStyle = {
                top:13*(item[2]/19),
                left:13*(item[3]/19),
                backgroundColor:item[4]
              }
              return(
                <div key={item[0]} className={'a'+item[1]+'z'} style={blockStyle}></div>
              )
            })
          }
          {
            <div className="rank2">{this.props.enemyRank5}</div>
          }
        </div>
        <div className="enemy5" key="enemy5">
          {
            this.props.blocks6.map((item,index)=>{
              let blockStyle = {
                top:13*(item[2]/19),
                left:13*(item[3]/19),
                backgroundColor:item[4]
              }
              return(
                <div key={item[0]} className={'a'+item[1]+'z'} style={blockStyle}></div>
              )
            })
          }
          {
            <div className="rank2">{this.props.enemyRank6}</div>
          }
        </div>
        {this.props.state!=="게임중"&&(this.props.users[0]===this.props.me)&&<button className="start" key="start" onClick={()=>this._startFun()}>시작하기</button>}
        {
          this.props.state==="대기중" ?
            <Link to="/" onClick={() => this._exitFun()}><button className="exit">나가기</button></Link> :
            <button className="exit">나가기</button>
        }
        {
          this.props.users.map((user,index)=>{
            if(index===0){
              if(user===this.props.me){
                return(
                  <div className="me" key="me">
                    ★{user}
                  </div>
                )
              }
              else{
                return(
                  <div className="you1" key="you1">
                    ★{user}
                  </div>
                )
              }
            }
            else{
              if(user===this.props.me){
                return(
                  <div className="me" key="me">
                    {user}
                  </div>
                )
              }
              else{
                if(this.props.myNum<index){
                  return(
                    <div className={"you"+index} key={"you"+index}>
                      {user}
                    </div>
                  )
                }
                else{
                  return(
                    <div className={"you"+(index+1)} key={"you"+(index+1)}>
                      {user}
                    </div>
                  )
                }
              }
            }
          })
        }
        <div key="chating" className="chating" ref={(el)=>this._chat=el}>
          {
            this.props.chatings.map((chat) => {
              if(chat[1]==="join"){
                return (
                  <div key={chat[0]}>
                    {chat[2]}
                  </div>
                )
              }
              else if(chat[1]==="me"){
                return (
                  <div key={chat[0]}>
                    {this.props.me}>{chat[2]}
                  </div>
                )
              }
              else{
                return (
                  <div key={chat[0]}>
                    {chat[1]}>{chat[2]}
                  </div>
                )
              }
            })
          }
        </div>
        <input key="input" ref={(el) => this._input=el} className="input" onChange={e=>{
          this.setState({text:e.target.value});
        }}/>
        <button key="send" className="send" onClick={() => this._chatFun()}>전송</button>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.users,
    me: state.me,
    chatings: state.chatings,
    myRoom: state.myRoom,
    myNum: state.myNum,
    state: state.state,
    personNum: state.personNum,
    blocks: state.blocks,
    blocks2: state.blocks2,
    blocks3: state.blocks3,
    blocks4: state.blocks4,
    blocks5: state.blocks5,
    blocks6: state.blocks6,
    enemyRank2: state.enemyRank2,
    enemyRank3: state.enemyRank3,
    enemyRank4: state.enemyRank4,
    enemyRank5: state.enemyRank5,
    enemyRank6: state.enemyRank6,
    blockKey:state.blockKey,
    lineup:state.lineup,
    randomVar:state.randomVar
  };
}

Tetris = connect(mapStateToProps)(Tetris);

export default Tetris;