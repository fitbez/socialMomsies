import React, { Component } from "react";
import io from 'socket.io-client';
import { Glyphicon, Row, Col, OverlayTrigger, Popover, Panel, ListGroup, ListGroupItem, FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';
import { Message } from './Message.js';
import API from '../../util/API.js';

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
	
	isGroupOwner() {
		const ownerIds = this.state.group.owners.map(owner => owner._id);
		return (ownerIds.includes(this.props.user._id));
	}
	
	removeRequest = userId => {
		const newRequests = this.state.group.requests.filter(request => (request._id !== userId));
		const newGroup = this.state.group;
		newGroup.requests = newRequests;
		
		this.setState({group: newGroup});
	};
	
	render() {
		return [
			<ListGroup key='main-body'>
				<ListGroupItem>
					<Row>
						<Col xs={10} sm={10} md={11} lg={11}>
							<h4>{toTitleCase(this.state.group.name)}</h4>
						</Col>
						<Col xs={2} sm={2} md={1} lg={1}>
							{(this.isGroupOwner() && this.props.group.requests.length > 0) && <RequestsButton {...this.props} removeRequest={this.removeRequest} />}
						</Col>
					</Row>
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
					{this.state.messages.map((message, i) => (<Message key={i} message={message} user={this.props.user} />))}
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

const RequestsButton = props => {
	//console.log(props);
	return (
		<OverlayTrigger
			trigger="click"
			rootClose
			placement="bottom"
			overlay={
				<Popover className='container list-group' id="requests-popover">
					{props.group.requests.map(request => <Request key={request._id} group={props.group} user={request} removeRequest={props.removeRequest} />)}
				</Popover>
			}
		>
			<Button
				style={{
					float: 'right',
					borderRadius: '50%',
					lineHeight: '32px',
					padding: '2px 5px',
					fontSize: '20px',
					width: '36px',
					height: '36px',
				}}
				bsStyle='primary'
				title='Requests'
			>
				<Glyphicon style={{margin: '1px 0px'}} bsClass='fa' glyph='users' />
			</Button>
		</OverlayTrigger>
	);
};

const Request = props => (
	<ListGroupItem style={{lineHeight: '20px'}}>
		<Row>
			<Col xs={8} sm={9} md={9} lg={9} style={{padding: '0px 10px', fontSize: '16px'}}>
				<span>{props.user.name}</span>
			</Col>
			<Col xs={4} sm={3} md={3} lg={3} style={{padding: '0px 10px'}}>
				<span
					style={{float: 'left', fontSize: '20px', cursor: 'pointer', color: 'green'}}
					onClick={event => {
						props.removeRequest(props.user._id);
						API.confirmRequest(props.group._id, props.user._id);
					}}
				>
					<Glyphicon bsClass='fa' glyph='check-circle' />
				</span>
				<span
					style={{float: 'right', fontSize: '20px', cursor: 'pointer', color: 'red'}}
					onClick={event => {
						props.removeRequest(props.user._id);
						API.denyRequest(props.group._id, props.user._id);
					}}
				>
					<Glyphicon bsClass='fa' glyph='times-circle' />
				</span>
			</Col>
		</Row>
	</ListGroupItem>
);

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
}

export { PlaygroupChat };