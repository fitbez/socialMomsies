import React, { Component } from "react";
import io from 'socket.io-client';
import { Panel, ListGroup, ListGroupItem, FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';
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
			this.socket.emit('join group', nextProps.group._id);
			this.setState({ group: nextProps.group, messages: [], });
		}
	}
	
	componentDidMount() {
		this.socket.emit('join group', this.state.group._id);
		
		this.socket.on('chat message', (messageData) => {
			try {
				this.setState({ messages: this.state.messages.concat(messageData.message) });
			} catch (err) {
				
			}
		});
		
		this.socket.on('old messages', messages => {
			//console.log(messages);
			try {
				this.setState({ messages: messages });
			} catch (err) {
				
			}
		});
		
		const top = this.messagesElement.getBoundingClientRect().top + window.scrollY;
		const panelHeight = Math.max((window.innerHeight - top) - 90, 200);
		if (this.state.height !== panelHeight) {
			this.setState({height: panelHeight});
		}
		
		window.addEventListener('resize', this.handleResize);
	}
	
	componentWillUnmount() {
		this.socket.close();
		
		window.removeEventListener('resize', this.handleResize);
	}
	
	sendMessage = () => {
		if (this.state.messageInput && this.state.messageInput.length && this.state.messageInput.trim().length > 0) {
			this.socket.emit('new message', this.state.group._id, {
				body: this.state.messageInput.trim(),
				sender: this.props.user,
			});
			this.setState({ messageInput: '', });
		}
	};
	
	onMessageInputChange = event => {
		this.setState({ messageInput: event.target.value, });
	};
	
	handleResize = () => {
		if (this.state.windowHeight !== window.innerHeight) {
			if (this.messagesElement) {
					const top = this.messagesElement.getBoundingClientRect().top + window.scrollY;
					const panelHeight = Math.max((window.innerHeight - top) - 90, 200);
					this.setState({windowHeight: window.innerHeight, height: panelHeight});
			} else {
				this.setState({windowHeight: window.innerHeight});
			}
		}
	};
	
	render() {
		return [
			<ListGroup key='main-body'>
				<ListGroupItem>
					<h4>{this.state.group.name}</h4>
				</ListGroupItem>
				
				<div className='list-group-item panel-group'
					style={{
						height: this.state.height + 'px',
						padding: '10px 15px',
						overflowY: 'scroll',
						background: '#dcdcdc',
					}}
					ref={(element) => this.messagesElement = element}
				>
					{this.state.messages.map((message, i) => (<Message key={i} message={message} />))}
				</div>
			</ListGroup>,
				
			<Panel.Body key='input' style={{padding: '0px',}}>
				<FormGroup style={{margin: '10px 15px'}}>
						<InputGroup>
							<FormControl type="text" id="messageInput" value={this.state.messageInput} onChange={this.onMessageInputChange} />
							<InputGroup.Button>
								<Button bsStyle='primary' onClick={this.sendMessage}>Send</Button>
							</InputGroup.Button>
						</InputGroup>
					<FormControl.Feedback />
				</FormGroup>
			</Panel.Body>,
		];
	}
	
}

export { PlaygroupChat };