import React from 'react';
import './Business.css';
// import GoogleMapReact from 'google-map-react';
import Map from '../map/Map.js';
//import  Col from "../../components/Col";
//import Row  from "../../components/Row";
//import ScrollUpButton from "react-scroll-up-button";
import { Media } from 'react-bootstrap';
// const AnyReactComponent = ({text}) => <div>{text}</div>;
class Business extends React.Component {
  render() {
    return(

    <div className="results">
    <Media>
  <Media.Left>
    {/* <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" /> */}
    <a  target="_blank" href={this.props.business.url}>
      {/* <img style={ {width: "200px", height: "100%" }} src={this.props.business.imageSrc} alt={this.props.business.name}/> */}
      <img width={250} height={250} src={this.props.business.imageSrc} alt={this.props.business.name}/>
    </a>
  </Media.Left>
  <Media.Body>
    <Media.Heading><h3 className="title">{this.props.business.name} </h3></Media.Heading>
    <div className="desc">
      {/* <h3>{this.props.business.name} </h3> */}
      <h5>Business category: {this.props.business.category}</h5>
      <h5>Business Phone: {this.props.business.phone}</h5>
      <h6  className="badge">{this.props.business.reviewCount} reviews {this.props.business.rating} stars </h6>
      <h6>{this.props.business.address} {this.props.business.city}</h6>
      <h6> {this.props.business.state} {this.props.business.zipCode}</h6>
    </div>
  </Media.Body>
  <Media.Right>
    {/* <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" /> */}
<div>
   <Map businesses={this.props.business}/>
</div>
  </Media.Right>
</Media>
</div>




    );
  };
};
export default Business;
