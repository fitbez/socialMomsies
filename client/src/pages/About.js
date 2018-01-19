import React from "react";
import Hero from "../components/Hero";
import googleButton from './Login/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png'
import './about.css';
const About = () =>
  <div>
    <Hero>
      <h1>SocialMomsies</h1>
      <h2>Where all MOMs are Welcome!</h2>
      <a href="http://localhost:3001/auth/google/">
          {/*<GoogleButton /> */}
          <img src={googleButton} alt="sign into Google Button" />
        </a>
    </Hero>
  </div>;

export default About;
