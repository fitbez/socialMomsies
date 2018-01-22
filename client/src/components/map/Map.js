import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from '../Marker/Marker.js'
import "./map.css"

const myStyle = {
 // initially any map object has left top corner at lat lng coordinates
 // it’s on you to set object origin to 0,0 coordinates
 position: "absolute",
 width: 20,
 height: 20,
 left: -10,
 top: -10,

 border: "5px solid #f44336",
 borderRadius: 20,
 backgroundColor: "white",
 textAlign: "center",
 color: "#3f51b5",
 fontSize: 16,
 fontWeight: "bold",
 padding: 4
}

const AnyReactComponent = ({ text }) => <div style={myStyle}>{ text }</div>;
// console.log(this.props)

class Map extends React.Component {

  static defaultProps = {
    center: {lat: 59.95, lng: 30.33 },
    zoom: 9
  }
render() {
  console.log(this.props.businesses.latitude)
  console.log(this.props.businesses.longitude)
  console.log(this.props)
  this.props.center.lat = this.props.businesses.latitude;
  this.props.center.lng = this.props.businesses.longitude;

  (this.props.businesses) ?  (console.log('NO!!z')) : (console.log(this.props.businesses, '*&&&&***&&&***&&*##############'))
    return (
  <div>
      <div className='google-map' style={{width: '250px', height: '250px'}}>
        <GoogleMapReact
        bootstrapURLKeys={{
              key: 'AIzaSyB-vMgJZYsKwFTWUFc6VeRMYnuzScV-m9U'
          }}

          defaultCenter={ {lat: this.props.businesses.latitude, lng: this.props.businesses.longitude }}
           defaultZoom={this.props.zoom}>

          <AnyReactComponent
            lat={ this.props.businesses.latitude }
            lng={ this.props.businesses.longitude }
            text={ "" }
          />
        </GoogleMapReact>
      </div>
  </div>
    )
  }
}

export default Map;
