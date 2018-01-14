import React, { Component } from "react";
import Yelp from '../util/Yelp.js';
import BusinessList from '../components/BusinessList/BusinessList.js';
import SearchBar from '../components/SearchBar/SearchBar.js';



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
    return (
      <div className="App">

        <SearchBar search={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default Search;
