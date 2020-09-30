import React, { Component } from 'react';
import Layout from './containers/Layout/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Aux from './hoc/Auks/Auks'
import {
	Route,
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom';
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer'
import About from './containers/About/About'
class App extends Component {
	state = {
		showSideDrawer: false,
	};
	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};
	sideDrawerOpenHandler = () => {
		this.setState({ showSideDrawer: true });
	};
	

	render() {
		return (
			<Router>
			<Aux>
				<Toolbar clicked={this.sideDrawerOpenHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>

				<Switch>
					<Route path="/about" component={About}/>
					<Route
						path="/"
						exact
						component={Layout} />
				</Switch>
			</Aux>
		</Router>
			
		);
	}
}

export default App;
