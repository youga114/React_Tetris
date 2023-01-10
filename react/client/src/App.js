import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Init from './components/Init';
import Tetris from './components/Tetris';

class App extends Component {
  	constructor(props) {
    	super(props);
  	}

  	render() {
	    return (
	    	<Router>
		      	<div className="App">
			      	<Route exact path="/" component={Init}/>
			      	<Route path="/tetris" component={Tetris}/>
			    </div>
	    	</Router>
	    );
  	}
}

export default App;
