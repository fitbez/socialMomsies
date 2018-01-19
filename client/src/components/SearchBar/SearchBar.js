import React from 'react';
import './SearchBar.css';

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

        <div className="SearchBar-fields">
          <label>
         <select className="Search-term" term={this.state.value} onChange={this.handleTermChange}>
          <option value="">Select</option>
           <option value="Kid-Friendly Restaurants">Family-Friendly Restaurants</option>
           <option value="Splash Parks">Splash Parks</option>
           <option value="Indoor Playgrounds">Indoor Playgrounds</option>
           <option value="Outdoor Playgrounds">Outdoor Playgrounds</option>
           <option value="Museums">Museums</option>
           <option value="Kid-Activities">Kid Events</option>
           <option value="Schools">Schools</option>
           <option value="Hospitals">Hospitals</option>
         </select>
       </label>

          <input placeholder="City or Zip Code"  term={this.state.value} onChange={this.handleLocationChange} />

        </div>
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>

        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}> Search powered by Yelp</a>
        </div>

      </div>
      );
    }
}

export default SearchBar;
