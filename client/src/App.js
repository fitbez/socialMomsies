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
		};

		axios.get('/auth/user').then(response => {
			//console.log(response.data.user);
			this.setState({user: response.data.user});
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		return (
			<Router>
				<div className='routing-div'>
					<Navbar />
					<Wrapper>

						<Route exact path="/" render={props => (<About user={this.state.user} />)} hideNavigationBar={true} />
						<Route exact path="/about" render={props => (<Search user={this.state.user} />)} />
						<Route exact path="/home" render={props => (<Home user={this.state.user} />)} />
						<Route exact path="/search" render={props => (<Search user={this.state.user} />)} />
						<Route exact path="/playgroup" render={props => (<Playgroup user={this.state.user} />)} />
						<Route exact path="/login" component={Login} />
					</Wrapper>

				</div>
			</Router>
		);
	}

};

export default App;
