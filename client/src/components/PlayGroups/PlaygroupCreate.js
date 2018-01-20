import React, { Component } from "react";
// eslint-disable-next-line
import { Panel, Row, Col, Form, ListGroup, ListGroupItem, FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';

class PlaygroupCreate extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			nameInput: '',
			cityInput: '',
		};
	}
	
	onNameInputChange = event => {
		this.setState({ nameInput: event.target.value, });
	};
	
	onCityInputChange = event => {
		this.setState({ cityInput: event.target.value, });
	};
	
	render() {
		return (
			<Panel.Body style={{margin: '0px', /*background: '#dcdcdc',*/}}>
				{JSON.stringify(this.props.user)}
			</Panel.Body>
		);
	}
	
}

export { PlaygroupCreate };