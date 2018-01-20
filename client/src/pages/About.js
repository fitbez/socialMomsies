import React from "react";
import googleButton from './Login/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png'
import './about.css';
const About = (props) =>
  <div className="About">

		<h1>Social Momsies</h1>
		<h2>Where all Moms are Welcome!</h2>

		<a href="http://localhost:3001/auth/google/">
			{/*<GoogleButton /> */}
			<img src={googleButton} alt="sign into Google Button" />
		</a>
  </div>;

export default About;
