import React, { Component } from "react";
import { Link } from "react-router-dom";
import googleButton from '../../pages/Login/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png'
import logo from './logo3.png';
import "./Navbar.css";


class Navbar extends Component {

	componentDidMount() {
		this.props.handleResize(this.navbarElement.clientHeight);

		window.addEventListener('resize', this.handleWindowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize = () => {
		this.props.handleResize(this.navbarElement.clientHeight);
	};

	render() {
		return (
			<nav className="menubar"  ref={(element) => this.navbarElement = element}>
				<div>
					<Link to="/">
						<img alt='Social Momsies' src={logo} style={{width:100, height: 60}} />
					</Link>
				</div>
				{
					(this.props.user && this.props.user._id) &&
					<ul className="nav navbar-nav navbar-right inner-nav">
						<li className={window.location.pathname === "/search" ? "active" : ""}>
							<Link to="/search">Explore</Link>
						</li>
						<li className={window.location.pathname === "/playgroup" ? "active" : ""}>
							<Link to="/playgroup">Playgroups</Link>
						</li>
						<li>
							<a href="/" className="logout" onClick={this.props.logout}>Logout</a>
						</li>
					</ul>
				}
				{
					(!this.props.user) &&
					<ul className="nav navbar-nav navbar-right inner-nav">
						<a href={window.location.hostname === 'localhost' ? "http://localhost:3001/auth/google/" :  "https://socialmomsies.herokuapp.com/auth/google/"}>
							{/*<GoogleButton />*/}
							<img src={googleButton} alt="sign into Google Button" />
						</a>
					</ul>
				}
			</nav>
		);
	}

}

export default Navbar;
