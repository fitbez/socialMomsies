import React, { Component } from "react";
import { Grid, Row, Col, MenuItem, Panel, Nav, NavItem, NavDropdown, } from 'react-bootstrap';
import { PlaygroupChat } from '../../components/PlayGroups';

import './Playgroup.css';

class Playgroup extends Component {
	
	state = {
		display: 'group',
		windowHeight: window.innerHeight,
		height: 0,
	}
	
	componentDidMount() {
		const top = this.panelElement.getBoundingClientRect().top + window.scrollY;
		const panelHeight = Math.max((window.innerHeight - top) - 40, 200);
		if (this.state.height !== panelHeight) {
			this.setState({height: panelHeight});
		}
		
		window.addEventListener('resize', this.handleResize);
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	
	handleResize = () => {
		if (this.state.windowHeight !== window.innerHeight) {
			if (this.panelElement) {
					const top = this.panelElement.getBoundingClientRect().top + window.scrollY;
					const panelHeight = Math.max((window.innerHeight - top) - 40, 200);
					this.setState({windowHeight: window.innerHeight, height: panelHeight});
			} else {
				this.setState({windowHeight: window.innerHeight});
			}
		}
	};
	
	handleNavSelect = key => {
		if (key === 'search' || key === 'new') {
			this.setState({display: key});
		} else {
			this.setState({display: 'group'});
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
							style={{height: this.state.height + 'px', overflowY: 'scroll'}}
							ref={(element) => this.panelElement = element}
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
								{this.state.display === 'group' && <PlaygroupChat />}
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
