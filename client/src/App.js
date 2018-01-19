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

const App = () => {
  axios.get('/auth/user').then(user => {
    console.log(user);
  }).catch(err => {console.log(err);});

  return (
		<Router>
			<div>
				<Navbar />
				<Wrapper>

				<Route exact path="/" component={About} />
				<Route exact path="/about" component={Search} />
				<Route exact path="/home" render={props => (<Home {...props} test-prop='adawdd' />)} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/playgroup" component={Playgroup} />
				<Route exact path="/login" component={Login} />
				</Wrapper>

			</div>
		</Router>
	);
};

export default App;
