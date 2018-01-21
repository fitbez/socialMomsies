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
import axios from 'axios';

//import './App.css';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			user: null,
			navbarHeight: 0, // keeps track of the height of the navbar, which can be passed to child components
		};
		
		// get the current user from the server
		axios.get('/auth/user').then(response => {
			//console.log(response.data.user);
			this.setState({user: response.data.user});
		}).catch(err => {
			console.log(err);
		});
	}
	
	// called by the navbar
	handleNavbarResize = (navbarHeight) => {
		//console.log(this.state.navbarHeight);
		if (navbarHeight !== this.state.navbarHeight) {
			this.setState({navbarHeight: navbarHeight});
		}
	};
	
	// we want it here, so it's only on the homepage you don't want it? yes sorry can we just keep the image as you did before change my mind
	render() {
		return (
			<Router>
				<div className='routing-div'>
					<Navbar handleResize={this.handleNavbarResize} />
					<Wrapper>
						<Route exact path="/" render={props => (<About user={this.state.user} />)} hideNavigationBar={true} />
						<Route exact path="/about" render={props => (<Search user={this.state.user} />)} />
						<Route exact path="/home" render={props => (<Home user={this.state.user} />)} />
						<Route exact path="/search" render={props => (<Search user={this.state.user} />)} />
						<Route exact path="/playgroup" render={props => (<Playgroup user={this.state.user} navbarHeight={this.state.navbarHeight} />)} />
						<Route exact path="/login" component={Login} />
					</Wrapper>

				</div>
			</Router>
		);
	}

};

export default App;
