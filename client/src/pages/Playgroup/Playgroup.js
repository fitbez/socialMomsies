import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, MenuItem, Panel, Nav, NavItem, NavDropdown, } from 'react-bootstrap';
import { PlaygroupChat, PlaygroupSearch, PlaygroupCreate } from '../../components/PlayGroups';
import API from '../../util/API.js';

import './Playgroup.css';

class Playgroup extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			display: 'search',
			group: null,
			joinedGroups: [],
		};
		
		API.getUserPlaygroups().then(results => {
			//console.log(results.data);
			this.setState({joinedGroups: results.data});
		});
	}
	
	updateGroupData = () => {
		API.getUserPlaygroups().then(results => {
			//console.log(results.data);
			this.setState({joinedGroups: results.data});
		});
	};
	
	handleNavSelect = key => {
		API.getUserPlaygroups().then(results => {
			if (key === 'search' || key === 'new') {
				this.setState({joinedGroups: results.data, display: key, group: null});
			} else {
				this.setState({joinedGroups: results.data, display: 'group', group: results.data[key]});
			}
		});
	};

  render() {
		if(!this.props.user) {
      return (<Redirect to="/" />)
    }
    return (
      <Grid className='Playgroup' style={{paddingTop: this.props.navbarHeight + 'px',}}>
				<Row>
					<Col md={12}>
						
						<Panel id='main-panel' bsStyle='default'>
							<Panel.Heading style={{padding: '10px 0px 0px',}}>
								<Nav bsStyle="tabs" activeKey={this.state.display} onSelect={this.handleNavSelect} style={{padding: '0px 15px'}}>
									<NavDropdown eventKey="group" title="My Playgroups" id="playgroupSelect">
										{this.state.joinedGroups.map((group, i) => <MenuItem active={(this.state.group && this.state.group._id === group._id)} key={group._id} eventKey={i}>{toTitleCase(group.name)}</MenuItem>)}
									</NavDropdown>
									<NavItem eventKey="search">
										Find Playgroups
									</NavItem>
									<NavItem eventKey="new">
										New Playgroup
									</NavItem>
								</Nav>
							</Panel.Heading>
							
							{this.state.display === 'group' && <PlaygroupChat user={this.props.user} joinedGroups={this.state.joinedGroups} updateGroupData={this.updateGroupData} group={this.state.group} />}
							{this.state.display === 'search' && <PlaygroupSearch user={this.props.user} joinedGroups={this.state.joinedGroups} updateGroupData={this.updateGroupData} />}
							{this.state.display === 'new' && <PlaygroupCreate user={this.props.user} joinedGroups={this.state.joinedGroups} updateGroupData={this.updateGroupData} />}
						</Panel>
					</Col>
				</Row>
      </Grid>
    );
  }

}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
}

export default Playgroup;
