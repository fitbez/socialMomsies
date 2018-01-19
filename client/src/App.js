import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Playgroup from "./pages/Playgroup";
import About from "./pages/About";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Login from "./pages/Login/LoginForm";
import Signup from "./pages/SignupForm";

class App extends Component {

	render(props) {
		return (
			<Router>
				<div>
					<Navbar />
					<Wrapper>

					<Route exact path="/" component={About} />
					<Route exact path="/about" component={Search} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/playgroup" component={Playgroup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					</Wrapper>

				</div>
			</Router>
		);
	}
	
}

export default App;
