import React, { Component } from "react";
// eslint-disable-next-line
import { Panel, Row, Col, Form, ListGroup, ListGroupItem, FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';

class PlaygroupSearch extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			nameInput: '',
			cityInput: '',
			results: [{name: 'Playgroup 1', city: 'Arlington, VA', memberCount: 6}, {name: 'Playgroup 2', city: 'Washington, DC', memberCount: 3},],
		};
	}
	
	onNameInputChange = event => {
		this.setState({ nameInput: event.target.value, });
	};
	
	onCityInputChange = event => {
		this.setState({ cityInput: event.target.value, });
	};
	
	render() {
		return [
			<ListGroup key='input'>
				<ListGroupItem style={{padding: '0px',}}>
					<Form inline>
						<FormGroup style={{margin: '15px'}}>
							<InputGroup>
								<InputGroup.Addon>
									Name
								</InputGroup.Addon>
								<FormControl type="text" value={this.state.nameInput} onChange={this.onNameInputChange} />
							</InputGroup>
							{' '}
							<InputGroup>
								<InputGroup.Addon>
									City
								</InputGroup.Addon>
								<FormControl type="text" value={this.state.cityInput} onChange={this.onCityInputChange} />
							</InputGroup>
							<FormControl.Feedback />
							{' '}
							<Button bsStyle='primary'>Search</Button>
						</FormGroup>
					</Form>
				</ListGroupItem>
			</ListGroup>,
				
			<Panel.Body className='panel-group' key='results' style={{margin: '0px', background: '#dcdcdc',}}>
				{this.state.results.map((result, i) => <Result key={i} {...this.props} name={result.name} city={result.city} memberCount={result.memberCount || 0} />)}
			</Panel.Body>,
		];
	}
	
}

const Result = props => (
	<Panel>
		<Panel.Body>
			<Row bsClass='row-fluid'>
				<Col sm={12} md={4} lg={4}>
					<h3 style={{margin: '5px'}}>{props.name}</h3>
				</Col>
				<Col sm={6} md={2} lg={3}>
					<h4 style={{margin: '5px'}}>{props.memberCount} Member{props.memberCount !== 1 && 's'}</h4>
				</Col>
				<Col sm={6} md={3} lg={3}>
					<h4 style={{margin: '5px'}}>{props.city}</h4>
				</Col>
				<Col sm={6} smOffset={3} md={3} mdOffset={0} lg={2} lgOffset={0}>
					<Button bsStyle='primary' style={{width: '100%'}}>Request to Join</Button>
				</Col>
			</Row>
		</Panel.Body>
	</Panel>
);

export { PlaygroupSearch };