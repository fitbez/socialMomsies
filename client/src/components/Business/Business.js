import React from 'react';
import './Business.css';
import GoogleMapReact from 'google-map-react';
import Map from '../map/Map.js';
import ScrollUpButton from "react-scroll-up-button";


const AnyReactComponent = ({text}) => <div>{text}</div>;
class Business extends React.Component {

  render() {
    return(

  <div className="container">
    <div className="container-fluid">
    </div>
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="panel-body">google map?
          <Map businesses={this.props.business}/>
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


              </div>

              {/* <GoogleMapReact defaultCenter={{lat: this.props.business.coordinates.latitude, lng: this.props.business.coordinates.longitude}} defaultZoom={11}>
                <div lat={this.props.business.coordinates.latitude} lng={this.props.business.coordinates.longitude}>

                </div>
              </GoogleMapReact> */}
            </div>
            <div class="clearfix"></div>
            <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
              <svg viewBox="0 0 32 32" >
                <path class="path1" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>
              </svg>
            </ScrollUpButton>
          </div>
        </div>
      </div>

    );
  };
};

export default Business;
