import React, { Component } from "react";
import io from 'socket.io-client';
import { Grid, Row, Col, DropdownButton, MenuItem, Form, FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';
import { Message } from '../components/PlayGroups';

class Playgroup extends Component {
	
	state = {
		messages: [],
		messageInput: '',
	};
	
	socket = io();
	
	componentDidMount() {
		this.socket.on('chat message', (messageData) => {
			this.setState({ messages: this.state.messages.concat(messageData.message) });
		});
	}
	
	sendMessage = () => {
		this.socket.emit('new message', this.state.messageInput);
		
		this.setState({ messageInput: '', });
	};
	
	onMessageInputChange = event => {
		this.setState({ messageInput: event.target.value, });
	};
	
  render(props) {
    return (
      <Grid>
				<Row style={{padding: '20px 0px'}}>
				
					<Col md={8}>
						<Form componentClass="fieldset" inline>
							<DropdownButton bsStyle='primary' title='My Groups' id='playgroupSelect'>
								<MenuItem eventKey='1'>Group 1</MenuItem>
								<MenuItem eventKey='2'>Group 2</MenuItem>
								<MenuItem eventKey='3'>Group 3</MenuItem>
							</DropdownButton>{' '}
							<FormGroup controlId="playgroupSearch">
								<InputGroup>
									<InputGroup.Addon>Find Playgroups</InputGroup.Addon>
									<FormControl type="text" placeholder="Search"/>
								</InputGroup>
								<FormControl.Feedback />
							</FormGroup>
						</Form>
					</Col>
					<Col md={3} mdOffset={1}>
						<Button bsStyle="primary" style={{width: '100%'}}>Create a Playgroup</Button>
					</Col>
				
				</Row>
        <Row>
					<Col>
						{ this.state.messages.map( message => (<Message key={message} messageBody={message} /> )) }
						
						<Form componentClass="fieldset">
							<FormGroup>
									<InputGroup>
										<FormControl type="text" id="messageInput" value={this.state.messageInput} onChange={this.onMessageInputChange} />
										<InputGroup.Button>
											<Button bsStyle='primary' onClick={this.sendMessage}>Send</Button>
										</InputGroup.Button>
									</InputGroup>
								<FormControl.Feedback />
							</FormGroup>
						</Form>
						
					</Col>
				</Row>
      </Grid>
    );
  }
	
}

export default Playgroup;
