import React, { Component } from "react";
import io from 'socket.io-client';
import { FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';
import { Message } from './Message.js';

class PlaygroupChat extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			windowHeight: window.innerHeight,
			height: 0,
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
			try {
				this.setState({ messages: this.state.messages.concat(messageData.message) });
			} catch (err) {
				
			}
		});
		
		const top = this.messagesElement.getBoundingClientRect().top + window.scrollY;
		const panelHeight = Math.max((window.innerHeight - top) - 125, 200);
		if (this.state.height !== panelHeight) {
			this.setState({height: panelHeight});
		}
		
		window.addEventListener('resize', this.handleResize);
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	
	sendMessage = () => {
		this.socket.emit('new message', this.state.group, this.state.messageInput);
		
		this.setState({ messageInput: '', });
	};
	
	onMessageInputChange = event => {
		this.setState({ messageInput: event.target.value, });
	};
	
	handleResize = () => {
		if (this.state.windowHeight !== window.innerHeight) {
			if (this.messagesElement) {
					const top = this.messagesElement.getBoundingClientRect().top + window.scrollY;
					const panelHeight = Math.max((window.innerHeight - top) - 125, 200);
					this.setState({windowHeight: window.innerHeight, height: panelHeight});
			} else {
				this.setState({windowHeight: window.innerHeight});
			}
		}
	};
	
	render() {
		return (
			<div>
				<h4>{this.state.group}</h4><hr />
				
				<div
					style={{height: this.state.height + 'px', overflowY: 'scroll'}}
					ref={(element) => this.messagesElement = element}
				>
					{ this.state.messages.map( (message, i) => (<Message key={i} messageBody={message} /> )) }
				</div><br />
				
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