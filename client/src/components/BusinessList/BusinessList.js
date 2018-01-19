import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business.js';
// import Map from '../map/Map.js';

// import GoogleMapReact from 'google-map-react'




class BusinessList extends React.Component {
  render() {
    console.log(this.props)

    console.log(this.props.businesses);

    return (
  <div className='outermap'>

    {/* <div style={{width: '100%', height: '400px'}}> */}

    {/* </div> */}
    <div className="BusinessList">
      {/* <Map business={this.props.business}/> */}
      {
        this.props.businesses.map(business => {
          return <Business key={business.id} business={business} />;

        })
      }
    </div>
  </div>
    );
  }
};

export default BusinessList;
