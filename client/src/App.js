import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Playgroup from "./pages/Playgroup";
import About from "./pages/About";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Login from "./pages/Login/LoginForm";
import Home from "./pages/Home";
import API from './util/API.js';

//import './App.css';
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loading: true,
			navbarHeight: 0, // keeps track of the height of the navbar, which can be passed to child components
		};
		this.logout = this.logout.bind(this);

		// get the current user from the server
		API.getUser().then(response => {
			//console.log(response.data.user);
			this.setState({user: response.data.user, loading: false});
		}).catch(err => {
			this.setState({loading: false});
			console.log(err);
		});
	}

	logout() {
		API.logout().then(response => {
			console.log('logout successful');
		});
		this.setState({ user: null});
	}

	// called by the navbar
	handleNavbarResize = (navbarHeight) => {
		//console.log(this.state.navbarHeight);
		if (navbarHeight !== this.state.navbarHeight) {
			this.setState({navbarHeight: navbarHeight});
		}
	};


	render() {
		if(this.state.loading) {
			// fetching from the server to discover if the user is logged in or not
			return(<h2>Please wait</h2>)
		}
		return (
			<Router>
				<div className='routing-div'>
					<Navbar
						user={this.state.user}
						logout={this.logout}
						handleResize={this.handleNavbarResize}
					/>
					<Wrapper>
						<Route exact path="/" render={props => (<About user={this.state.user} navbarHeight={this.state.navbarHeight} />)} hideNavigationBar={true} />
						<Route exact path="/about" render={props => (<Search user={this.state.user} navbarHeight={this.state.navbarHeight} />)} />
						<Route exact path="/home" render={props => (<Home user={this.state.user} navbarHeight={this.state.navbarHeight} />)} />
						<Route exact path="/search" render={props => (<Search user={this.state.user} navbarHeight={this.state.navbarHeight} />)} />
						<Route exact path="/playgroup" render={props => (<Playgroup user={this.state.user} navbarHeight={this.state.navbarHeight} />)} />
						<Route exact path="/login" component={Login} />
					</Wrapper>

				</div>
			</Router>
		);
	}

};

export default App;
