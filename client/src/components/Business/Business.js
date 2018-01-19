import React from 'react';
import './Business.css';
// import GoogleMapReact from 'google-map-react';
import Map from '../map/Map.js';

// const AnyReactComponent = ({text}) => <div>{text}</div>;
class Business extends React.Component {

  render() {
<<<<<<< HEAD
    console.log(this.props.business);
    return (
      <div className="container">
        <div className="container-fluid"></div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <div className="panel-body">
              google map?
              <Map businesses={this.props.business}/>

              <div className="responsive">
                <div className="gallery">
                  <a target="_blank" href={this.props.business.url}>
                    <img src={this.props.business.imageSrc} alt={this.props.business.name}/>
                  </a>
                  <div className="desc">
                    <h3>{this.props.business.name}
                    </h3>
                    <h4>Business category: {this.props.business.category}</h4>
                    <h5>Business Phone: {this.props.business.phone}</h5>
                    <h2>{this.props.business.rating}/5 stars</h2>
                    <p className="badge">{this.props.business.reviewCount}
                      reviews</p>
                    <p>{this.props.business.address} {this.props.business.city}</p>
                    <p>
                      {this.props.business.state}
                      {this.props.business.zipCode}</p>
                  </div>
                </div>
=======
    return(

  <div className="container">
    <div className="container-fluid">
    </div>
    <div className="panel panel-danger">
      <div className="panel-heading">
        <div className="panel-body">google map?
          <div className="responsive">
            <div className="gallery">
                <a target="_blank" href={this.props.business.url}>
                  <img src={this.props.business.imageSrc} alt={this.props.business.name}/>
                </a>
                    <div className="desc">
                    <h3>{this.props.business.name} </h3>
                      <h5>Business category: {this.props.business.category}</h5>
                      <h5>Business Phone: {this.props.business.phone}</h5>

                      <h2>{this.props.business.rating} stars</h2>
                      <p className="badge">{this.props.business.reviewCount} reviews</p>
                      <p>{this.props.business.address} {this.props.business.city}</p>
                      <p> {this.props.business.state} {this.props.business.zipCode}</p>
                    </div>
            </div>
>>>>>>> d62fd0750862eb92c55442e2a8aa49c8858c0f3b

              </div>

              {/* <GoogleMapReact defaultCenter={{lat: this.props.business.coordinates.latitude, lng: this.props.business.coordinates.longitude}} defaultZoom={11}>
                <div lat={this.props.business.coordinates.latitude} lng={this.props.business.coordinates.longitude}>

                </div>
              </GoogleMapReact> */}
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>

    );
  };
};

export default Business;
