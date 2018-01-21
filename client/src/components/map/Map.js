import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from '../Marker/Marker.js'
import "./map.css"
const AnyReactComponent = ({ text }) => <div>{ text }</div>;
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
  <div className="col-8">
      <div className='google-map'>
        hello here
        <GoogleMapReact
          defaultCenter={this.props.center}
           defaultZoom={this.props.zoom}>

          <AnyReactComponent
            lat={ this.props.businesses.latitude }
            lng={ this.props.businesses.longitude }
            text={ 'HELLLLLLLLOOOOOOOOO' }
          />
        </GoogleMapReact>
      </div>
  </div>
    )
  }
}

export default Map;
