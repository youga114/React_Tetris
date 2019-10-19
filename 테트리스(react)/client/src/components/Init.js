import React, { Component } from 'react';
import './Init.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Init extends Component {
  constructor(props) {
    super(props);
  }

  _makeFun = () => {
    var name=prompt('방 이름을 입력하세요','');
    // this.props.onMakeFun(name,this.props.player);
    this.props.dispatch({type:'server/make',data:{name:name,master:this.props.me}});              //client -> server
  }

  _joinFun = (roomNum) => {
    this.props.dispatch({type:'server/join',data:{user:this.props.me,roomNum:roomNum}});              //client -> server
  }

  render = () => {
    return (
      <div>
        <Link to="/tetris"><button className='roomMake' onClick={this._makeFun}>방 만들기</button></Link>
        <div className='menu'>
          {
            this.props.rooms.map((room)=>{
              if(room.personNum<6){
                if(room.state==="대기중"){
                  return(
                    <Link to="/tetris" key={room.roomNum} className='textDecorationNone' onClick={() => this._joinFun(room.roomNum)}>
                      <div className='menus'>
                        방제 : {room.name} &nbsp;&nbsp;&nbsp;인원 : {room.personNum}/6 &nbsp;&nbsp;방장 : {room.master} &nbsp;&nbsp;상태 : {room.state}
                      </div>
                    </Link>
                  )
                }
                else{
                  return(
                    <Link to="/tetris" key={room.roomNum} className='textDecorationNone' onClick={() => this._joinFun(room.roomNum)}>
                      <div className='startGame'>
                        방제 : {room.name} &nbsp;&nbsp;&nbsp;인원 : {room.personNum}/6 &nbsp;&nbsp;방장 : {room.master} &nbsp;&nbsp;상태 : {room.state}
                      </div>
                    </Link>
                  )
                }
              }
              else{
                if(room.state==="대기중"){
                  return(
                    <div className='textDecorationNone'>
                      <div className='menus'>
                        방제 : {room.name} &nbsp;&nbsp;&nbsp;인원 : {room.personNum}/6 &nbsp;&nbsp;방장 : {room.master} &nbsp;&nbsp;상태 : {room.state}
                      </div>
                    </div>
                  )
                }
                else{
                  return(
                    <div className='textDecorationNone'>
                      <div className='startGame'>
                        방제 : {room.name} &nbsp;&nbsp;&nbsp;인원 : {room.personNum}/6 &nbsp;&nbsp;방장 : {room.master} &nbsp;&nbsp;상태 : {room.state}
                      </div>
                    </div>
                  )
                }
              }
            })
          }
        </div>
        <div className='player'>
          {this.props.me}님 안녕하세요!
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    me:state.me
  };
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//     onMakeFun: (name,master) => {
//       store.dispatch({type:'server/join',data:{name:name,master:master}});
//     }
//   }
// }

Init = connect(mapStateToProps)(Init);

export default Init;