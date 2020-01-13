import React, { Component } from 'react';
import { Media } from 'react-bootstrap';

class Message extends Component {
	
	componentDidMount() {
		this.messageElement.scrollIntoView({ behaviour: 'smooth' });
	}
	
	render() {
		return (
			
			<div
				className='media panel panel-default'
				ref={element => {this.messageElement = element}}
			>
				{!this.isCurrentUser() && <Media.Right style={{padding: '10px'}}>{this.senderImage}</Media.Right>}
				<Media.Body className='panel-body'>
					<Media.Heading style={{/*textAlign: (!this.isCurrentUser() ? 'left' : 'right'),*/}}>{this.props.message.sender.name}</Media.Heading>
					<hr style={{margin: '5px',}} />
					<p style={{marginBottom: '0px'}}>{this.props.message.body}</p>
				</Media.Body>
				{this.isCurrentUser() && <Media.Left style={{padding: '10px'}}>{this.senderImage}</Media.Left>}
			</div>
		);
	}
	
	isCurrentUser() {
		return this.props.user._id === this.props.message.sender._id;
	}
	
	senderImage = <img alt='' src={this.props.message.sender.image} width={50} height={50} style={{diplay: 'block', borderRadius: '50%',}} />;
	
}
	

export { Message };