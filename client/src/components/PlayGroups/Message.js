import React, { Component } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';

class Message extends Component {
	
	componentDidMount() {
		this.messageElement.scrollIntoView({ behaviour: 'smooth' });
	}
	
	render() {
		return (
			<div className='panel panel-default' ref={element => {this.messageElement = element}}>
				<Panel.Body style={{padding: '5px 15px 10px',}}>
					<Row bsClass='row-fluid'>
						<Col xs={2} sm={1} md={1} lg={1} style={{padding: '0px'}}>
							<img alt='' src={this.props.message.sender.image} style={{textAlign: 'center', borderRadius: '50%', height: '100%', width: 'auto',}} />
						</Col>
						<Col xs={10} sm={11} md={11} lg={11} style={{padding: '0px'}}>
							<h4>{this.props.message.sender.name}</h4><hr style={{margin: '5px',}} />
							{this.props.message.body}
						</Col>
					</Row>
				</Panel.Body>
			</div>
		);
	}
	
}
	

export { Message };