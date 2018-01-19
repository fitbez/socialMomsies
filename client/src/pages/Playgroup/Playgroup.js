import React, { Component } from "react";
import { Grid, Row, Col, MenuItem, Panel, Nav, NavItem, NavDropdown, } from 'react-bootstrap';
import { PlaygroupChat } from '../../components/PlayGroups';

import './Playgroup.css';

class Playgroup extends Component {
	
	state = {
		display: 'search',
		group: null,
	}
	
	handleNavSelect = key => {
		if (key === 'search' || key === 'new') {
			this.setState({display: key, group: null});
		} else {
			this.setState({display: 'group', group: key});
		}
	};
	
  render() {
    return (
      <Grid>
				{this.props['test-prop']}
				<Row>
					<Col md={12}>
					
						<Panel id='main-panel' bsStyle='default'>
							<Panel.Heading style={{padding: '10px 0px 0px',}}>
								<Nav bsStyle="tabs" activeKey={this.state.display} onSelect={this.handleNavSelect} style={{padding: '0px 15px'}}>
									<NavDropdown eventKey="group" title="My Playgroups" id="playgroupSelect">
										<MenuItem active={this.state.group === "1"} eventKey="1">Group 1</MenuItem>
										<MenuItem active={this.state.group === "2"} eventKey="2">Group 2</MenuItem>
										<MenuItem active={this.state.group === "3"} eventKey="3">Group 3</MenuItem>
									</NavDropdown>
									<NavItem eventKey="search">
										Find Playgroups
									</NavItem>
									<NavItem eventKey="new">
										New Playgroup
									</NavItem>
								</Nav>
							</Panel.Heading>
								
							{this.state.display === 'group' && <PlaygroupChat group={this.state.group} />}
							{this.state.display === 'search' && <Panel.Body>search</Panel.Body>}
							{this.state.display === 'new' && <Panel.Body>new</Panel.Body>}
						</Panel>
						
					</Col>
				</Row>
      </Grid>
    );
  }
	
}

export default Playgroup;
