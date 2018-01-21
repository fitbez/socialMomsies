import React, { Component } from "react";
import { Link } from "react-router-dom";
import googleButton from '../../pages/Login/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png'
import "./Navbar.css";

const page = window.location.href.split('/');

class Navbar extends Component {
	
	constructor(props) {
		super(props);
	}
	
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
			<nav className="navbar navbar-default navbar-fixed-top"  ref={(element) => this.navbarElement = element}>
				<div className='container-fluid'>
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">
						<img src={"/../../images/logo3.png"}style={{width:100, height: 60, marginTop: -17}} />
						</Link>
					</div>
					{
						(page[3] !== '') &&
						<ul className="nav navbar-nav navbar-right">
							<li className={window.location.pathname === "/search" ? "active" : ""}>
								<Link to="/search">Explore</Link>
							</li>
							<li className={window.location.pathname === "/playgroup" ? "active" : ""}>
								<Link to="/playgroup">Playgroups</Link>
							</li>
							<li>
								<Link to="/">Logout</Link>
							</li>
						</ul>
					}
					{
						(page[3] === '') &&
						<ul className="nav navbar-nav navbar-right">
							<a href="http://localhost:3001/auth/google/">
								{/*<GoogleButton /> */}
								<img src={googleButton} alt="sign into Google Button" />
							</a>
						</ul>
					}
				</div>
			</nav>
		);
	}
	
}

export default Navbar;
