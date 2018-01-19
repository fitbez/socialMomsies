import React, { Component } from "react";
import io from 'socket.io-client';
import { FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';
import { Message } from './Message.js';

class PlaygroupChat extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			messages: [],
			messageInput: '',
			group: props.group,
		};
		
		this.socket = io('/playgroups');
	}
	
	componentWillReceiveProps(nextProps) {
		if (this.state.group !== nextProps.group) {
			this.socket.emit('join group', nextProps.group);
			this.setState({ group: nextProps.group, messages: [], });
		}
	}
	
	componentDidMount() {
		this.socket.emit('join group', this.state.group);
		
		this.socket.on('chat message', (messageData) => {
			this.setState({ messages: this.state.messages.concat(messageData.message) });
		});
	}
	
	sendMessage = () => {
		this.socket.emit('new message', this.state.group, this.state.messageInput);
		
		this.setState({ messageInput: '', });
	};
	
	onMessageInputChange = event => {
		this.setState({ messageInput: event.target.value, });
	};
	
	render() {
		return (
			<div>
				{ this.state.messages.map( (message, i) => (<Message key={i} messageBody={message} /> )) }
				
				<FormGroup>
						<InputGroup>
							<FormControl type="text" id="messageInput" value={this.state.messageInput} onChange={this.onMessageInputChange} />
							<InputGroup.Button>
								<Button bsStyle='primary' onClick={this.sendMessage}>Send</Button>
							</InputGroup.Button>
						</InputGroup>
					<FormControl.Feedback />
				</FormGroup>
			</div>
		);
	}
	
}

export { PlaygroupChat };