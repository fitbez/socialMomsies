import React from 'react';
import './Business.css';



class Business extends React.Component {
  render() {
    return(
    <div className="container">
  <div  className="col-sm-3">
    <div className="Card">
      <div className="card-img-top">
        <a href={this.props.business.url}>
        <img  className="card-img-top" src={this.props.business.imageSrc} alt={this.props.business.name}/>
        </a>
      </div>

        <div className="card-body col-sm-3">
        <h2 className="card-title">{this.props.business.name}</h2>
              <div className="card-text">

                <p>{this.props.business.address}</p>
                <p>{this.props.business.city}</p>
                <p>{this.props.business.zipCode} {this.props.business.state}</p>
                <h3>{this.props.business.category}</h3>
                <h3 className="rating">{this.props.business.rating} stars</h3>

                <a><span className="badge"> {this.props.business.reviewCount}</span>reviews</a>
                </div>
            </div>
        </div>
        </div>
      </div>

  );
  };
};

export default Business;
