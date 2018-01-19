import React, { Component } from 'react';
import { Panel, } from 'react-bootstrap';

class Message extends Component {
	
	componentDidMount() {
		this.messageElement.scrollIntoView({ behaviour: 'smooth' });
	}
	
	render() {
		return (
			<div className='panel panel-default' ref={element => {this.messageElement = element}}>
				<Panel.Body>{this.props.messageBody}</Panel.Body>
			</div>
		);
	}
	
}
	

export { Message };