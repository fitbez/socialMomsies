import React from 'react';
import yelp from './yelp.png';
import './SearchBar.css';
import { Row, Col} from 'react-bootstrap';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  sortByOptions = {

    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'

  };

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(sortByArgument) {
    this.setState({
      sortBy: sortByArgument
    });
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleSearch(event) {
    this.props.search(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
    return <li className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}  key={sortByOptionValue}>{sortByOption}</li>;
    });
  }

    render() {
      return(

      <div className="SearchBar">

        <Row>
          <Col md={4}>

              <div className="SearchBar-fields">
                <label>
               <select className="Search-term" term={this.state.value} onChange={this.handleTermChange}>
                <option value="">Select Activity </option>
                 <option value="Playgrounds">Playgrounds</option>
                 <option value="Splash Parks">Splash Parks</option>
                 <option value="Kid-Friendly Restaurants">Restaurants</option>
                 <option value="Libraries">Libraries</option>
                 <option value="Museums">Museums</option>
                 <option value="Kid-Activities">Kid Events</option>
                 <option value="Schools">Schools</option>
                 <option value="Hospitals">Hospitals</option>
               </select>
             </label>
              <label>
             <select  className="Search-fields" term={this.state.location} onChange={this.handleLocationChange}>
              <option value="">Select city</option>
               <option value="Arlington">Arlington, Va</option>
               <option value="20011">Washington, DC</option>
               <option value="New York">New York</option>
               <option value="Los Angeles">Los Angeles, Ca</option>
             </select>
            </label>
              </div>
              <div className="SearchBar-sort-options">
                <ul class>
                  {this.renderSortByOptions()}
                </ul>
              </div>
              <div className="SearchBar-submit">
                <a onClick={this.handleSearch}> Search powered by
                 <img src={yelp} style={{width:70,height:55}} alt="Yelp" /></a>
              </div>
        </Col>
        <Col md={8}>
                  <div>
                
                  </div>
        </Col>
  </Row>
</div>
      );
    }
}

export default SearchBar;
