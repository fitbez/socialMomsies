import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Yelp from '../util/Yelp.js';
import BusinessList from '../components/BusinessList/BusinessList.js';
import SearchBar from '../components/SearchBar/SearchBar.js';
// import Footer from "./components/Footer";
import { Row, Col} from 'react-bootstrap';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
    this.searchYelp = this.searchYelp.bind(this);
  }
  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({
        businesses: businesses
      });
    });
  }


  render() {
    if(!this.props.user) {
      return (<Redirect to="/" />)
    }
    return (

      <div className="Search" >

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
