import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Login from "./components/Login/LoginForm";
import Signup from "./components/SignupForm";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
      <Route exact path="/" component={About} />
      <Route exact path="/about" component={About} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      </Wrapper>
      <Footer />
    </div>
  </Router>;

export default App;
