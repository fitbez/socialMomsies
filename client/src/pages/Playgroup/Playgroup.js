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
				<Row>
					<Col md={12}>
					
						<div
							className='panel panel-default'
							id='main-panel'
						>
							<Panel.Heading>
								<Nav bsStyle="pills" activeKey={this.state.display} onSelect={this.handleNavSelect}>
									<NavDropdown eventKey="group" title="My Playgroups" id="playgroupSelect">
										<MenuItem eventKey="1">Group 1</MenuItem>
										<MenuItem eventKey="2">Group 2</MenuItem>
										<MenuItem eventKey="3">Group 3</MenuItem>
									</NavDropdown>
									<NavItem eventKey="search">
										Find Playgroups
									</NavItem>
									<NavItem eventKey="new">
										New Playgroup
									</NavItem>
								</Nav>
							</Panel.Heading>
								
							<Panel.Body>
								{this.state.display === 'group' && <PlaygroupChat group={this.state.group} />}
								{this.state.display === 'search' && <p>search</p>}
								{this.state.display === 'new' && <p>new</p>}
							</Panel.Body>
						</div>
						
					</Col>
				</Row>
      </Grid>
    );
  }
	
}

export default Playgroup;
