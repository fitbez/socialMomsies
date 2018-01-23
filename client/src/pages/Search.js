import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Yelp from '../util/Yelp.js';
import BusinessList from '../components/BusinessList/BusinessList.js';
import SearchBar from '../components/SearchBar/SearchBar.js';
// import Footer from "./components/Footer";
import { Row, Col, Alert } from 'react-bootstrap';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
			alert: null,
    };
    this.searchYelp = this.searchYelp.bind(this);
  }
  searchYelp(term, location, sortBy) {
		if (!term || term.trim().length < 1 || !location || location.trim().length < 1) {
			this.setState({alert: 'Please select an activity and location!'});
			
			return;
		}
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({
        businesses: (businesses || []),
				alert: null,
      });
    });
  }


  render() {
    if(!this.props.user) {
      return (<Redirect to="/" />)
    }
    return (
      <div className="Search" >
				{this.state.alert && <Alert style={{top: (this.props.navbarHeight + 10 + 'px')}} id='search-alert' bsStyle="danger">{this.state.alert}</Alert>}
				
				<Row style={{paddingTop: this.props.navbarHeight + 'px',}}>
					<Col sm={4} md={4}>
						<SearchBar search={this.searchYelp}/>
					</Col>
					<Col sm={8} md={8}>
						<BusinessList businesses={this.state.businesses} />
					</Col>
				</Row>
			</div>
    );
  }
}

export default Search;
