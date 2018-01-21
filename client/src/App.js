import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
			loading: true
		};
		this.logout = this.logout.bind(this);

		axios.get('/auth/user').then(response => {
			//console.log(response.data.user);
			this.setState({user: response.data.user, loading: false});
		}).catch(err => {
			this.setState({loading: false});
			console.log(err);
		});
	}

	logout() {
		axios.post('/auth/logout').then(response => {
			console.log('logout successful');
		});
		this.setState({ user: null});
	}

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
					/>
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
