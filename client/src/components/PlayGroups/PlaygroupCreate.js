import React, { Component } from "react";
// eslint-disable-next-line
import { Panel, Row, Col, Form, ListGroup, ListGroupItem, FormGroup, InputGroup, ControlLabel, DropdownButton, MenuItem, FormControl, Button, } from 'react-bootstrap';

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
			<Panel.Body style={{margin: '0px', padding: '15px 20px', /*background: '#dcdcdc',*/}}>
				<Form horizontal>
					<FormGroup controlId="playgroupName">
						<Col componentClass={ControlLabel} sm={2}>
							Playgroup Name
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="" />
						</Col>
					</FormGroup>

					<FormGroup controlId="playgroupCity">
						<Col componentClass={ControlLabel} sm={2}>
							City
						</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="" />
						</Col>
					</FormGroup>
					
					<FormGroup controlId="playgroupState">
						<Col componentClass={ControlLabel} sm={2}>
							State
						</Col>
						<Col sm={10}>
							<FormControl
								componentClass={props => <select className='form-control'>{props.children}</select>}
								title="State"
							>
								<option value={null} key={0}>select</option>
								<option disabled key={'break'}></option>
								{states.map(state => <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>)}
							</FormControl>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button bsStyle='primary' type="submit">Create</Button>
						</Col>
					</FormGroup>
				</Form>
			</Panel.Body>
		);
	}
	
}

export { PlaygroupCreate };