import React, { Component } from "react";
// eslint-disable-next-line
import { Panel, Row, Col, Form, ListGroup, ListGroupItem, FormGroup, InputGroup, FormControl, Button, } from 'react-bootstrap';
import API from '../../util/API.js';

const states = [
	{name: 'Alabama',									abbreviation: 'AL'},
	{name: 'Alaska',									abbreviation: 'AK'},
	{name: 'Arizona',									abbreviation: 'AZ'},
	{name: 'Arkansas',								abbreviation: 'AR'},
	{name: 'California',							abbreviation: 'CA'},
	{name: 'Colorado',								abbreviation: 'CO'},
	{name: 'Connecticut',							abbreviation: 'CT'},
	{name: 'Delaware',								abbreviation: 'DE'},
	{name: 'District of Columbia',		abbreviation: 'DC'},
	{name: 'Florida',									abbreviation: 'FL'},
	{name: 'Georgia',									abbreviation: 'GA'},
	{name: 'Hawaii',									abbreviation: 'HI'},
	{name: 'Idaho',										abbreviation: 'ID'},
	{name: 'Illinois',								abbreviation: 'IL'},
	{name: 'Indiana',									abbreviation: 'IN'},
	{name: 'Iowa',										abbreviation: 'IA'},
	{name: 'Kansas',									abbreviation: 'KS'},
	{name: 'Kentucky',								abbreviation: 'KY'},
	{name: 'Louisiana',								abbreviation: 'LA'},
	{name: 'Maine',										abbreviation: 'ME'},
	{name: 'Maryland',								abbreviation: 'MD'},
	{name: 'Massachusetts',						abbreviation: 'MA'},
	{name: 'Michigan',								abbreviation: 'MI'},
	{name: 'Minnesota',								abbreviation: 'MN'},
	{name: 'Mississippi',							abbreviation: 'MS'},
	{name: 'Missouri',								abbreviation: 'MO'},
	{name: 'Montana',									abbreviation: 'MT'},
	{name: 'Nebraska',								abbreviation: 'NE'},
	{name: 'Nevada',									abbreviation: 'NV'},
	{name: 'New Hampshire',						abbreviation: 'NH'},
	{name: 'New Jersey',							abbreviation: 'NJ'},
	{name: 'New Mexico',							abbreviation: 'NM'},
	{name: 'New York',								abbreviation: 'NY'},
	{name: 'North Carolina',					abbreviation: 'NC'},
	{name: 'North Dakota',						abbreviation: 'ND'},
	{name: 'Ohio',										abbreviation: 'OH'},
	{name: 'Oklahoma',								abbreviation: 'OK'},
	{name: 'Oregon',									abbreviation: 'OR'},
	{name: 'Pennsylvania',						abbreviation: 'PA'},
	{name: 'Rhode Island',						abbreviation: 'RI'},
	{name: 'South Carolina',					abbreviation: 'SC'},
	{name: 'South Dakota',						abbreviation: 'SD'},
	{name: 'Tennessee',								abbreviation: 'TN'},
	{name: 'Texas',										abbreviation: 'TX'},
	{name: 'Utah',										abbreviation: 'UT'},
	{name: 'Vermont',									abbreviation: 'VT'},
	{name: 'Virginia',								abbreviation: 'VA'},
	{name: 'Washington',							abbreviation: 'WA'},
	{name: 'West Virginia',						abbreviation: 'WV'},
	{name: 'Wisconsin',								abbreviation: 'WI'},
	{name: 'Wyoming',									abbreviation: 'WY'},
];

class PlaygroupSearch extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			nameInput: '',
			cityInput: '',
			stateInput: '',
			results: [],
		};
		
		API.findPlaygroups().then(res => {
			res.data.forEach(result => {
				result.memberCount = (result.owners.length + result.members.length);
				result.hasJoined = (
					result.owners.map(owner => owner._id).includes(props.user._id) ||
					result.members.map(member => member._id).includes(props.user._id) ||
					result.requests.map(requester => requester._id).includes(props.user._id) ||
					props.user.invites.map(invite => invite._id).includes(result._id)
				);
			});
			this.setState({results: res.data});
		}).catch(err => {
			this.setState({results: []});
		});
	}
	
	onNameInputChange = event => {
		this.setState({ nameInput: event.target.value, });
	};
	
	onCityInputChange = event => {
		this.setState({ cityInput: event.target.value, });
	};
	
	onStateInputChange = event => {
		this.setState({ stateInput: event.target.value, });
	};
	
	handleFormSubmit = event => {
		event.preventDefault();
		
		const { nameInput, cityInput, stateInput } = this.state;
		if ((nameInput.trim().length > 0 || (cityInput.trim().length > 0 && stateInput.trim().length > 0) || stateInput.trim().length > 0) ||
		(stateInput.trim().length === 0 && cityInput.trim().length === 0 && nameInput.trim().length === 0)) {
			API.findPlaygroups(nameInput, cityInput, stateInput).then(res => {
				//console.log(res.data);
				res.data.forEach(result => {
					result.memberCount = (result.owners.length + result.members.length);
					result.hasJoined = (
						result.owners.map(owner => owner._id).includes(this.props.user._id) ||
						result.members.map(member => member._id).includes(this.props.user._id) ||
						result.requests.map(requester => requester._id).includes(this.props.user._id) ||
						this.props.user.invites.map(invite => invite._id).includes(result._id)
					);
				});
				
				this.setState({results: res.data});
			}).catch(err => {
				this.setState({results: []});
			});
		}
	};
	
	markJoined = groupId => {
		const newResults = this.state.results.map(result => {
			if (result._id === groupId) result.hasJoined = true;
			return result;
		});
		
		this.setState({results: newResults});
	};
	
	render() {
		return [
			<ListGroup key='input'>
				<ListGroupItem style={{padding: '0px',}}>
					<Form inline onSubmit={this.handleFormSubmit}>
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
							{' '}
							<InputGroup>
								<InputGroup.Addon>
									State
								</InputGroup.Addon>
								<FormControl
									componentClass={props => <select  value={this.state.stateInput} onChange={this.onStateInputChange} className='form-control'>{props.children}</select>}
									title="State"
								>
									<option value={''} key={0}>select</option>
									<option disabled key={'break'} value={null}></option>
									{states.map(state => <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>)}
								</FormControl>
							</InputGroup>
							{' '}
							<Button bsStyle='primary' type="submit">Search</Button>
						</FormGroup>
					</Form>
				</ListGroupItem>
			</ListGroup>,
				
			<Panel.Body className='panel-group' key='results' style={{margin: '0px', background: '#dcdcdc',}}>
				{this.state.results.map((result, i) => <Result key={i} index={i} {...this.props} groupId={result._id} name={result.name} city={result.city} state={result.state} memberCount={result.memberCount || 0} hasJoined={result.hasJoined} markJoined={this.markJoined} />)}
			</Panel.Body>,
		];
	}
	
}

const Result = props => (
	<Panel>
		<Panel.Body>
			<Row bsClass='row-fluid'>
				<Col sm={12} md={4} lg={4}>
					<h3 style={{margin: '5px 0px',}}>{toTitleCase(props.name)}</h3>
				</Col>
				<Col sm={6} md={2} lg={3}>
					<h4 style={{margin: '5px 0px',}}>{props.memberCount} Member{props.memberCount !== 1 && 's'}</h4>
				</Col>
				<Col sm={6} md={3} lg={3}>
					<h4 style={{margin: '5px 0px',}}>{toTitleCase(props.city)}, {props.state}</h4>
				</Col>
				<Col sm={6} smOffset={3} md={3} mdOffset={0} lg={2} lgOffset={0}>
					<Button
						disabled={props.hasJoined}
						bsStyle='primary'
						style={{width: '100%',}}
						onClick={event => {
							API.requestGroupJoin(props.groupId).then(response => {
								props.markJoined(props.groupId);
							}).catch(console.error);
						}}
					>
						Request to Join
					</Button>
				</Col>
			</Row>
		</Panel.Body>
	</Panel>
);

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
}

export { PlaygroupSearch };