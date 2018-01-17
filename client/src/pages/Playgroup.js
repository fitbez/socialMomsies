import React, { Component } from "react";
import { Grid, Row, Col, DropdownButton, MenuItem, } from 'react-bootstrap';

class Playgroup extends Component {

  render(props) {
    return (
      <Grid>
				<Row className='justify-content-between'>
					<div>
						<DropdownButton bsStyle='primary' title='My Groups'>
							<MenuItem eventKey='1'>Group 1</MenuItem>
							<MenuItem eventKey='2'>Group 2</MenuItem>
							<MenuItem eventKey='3'>Group 3</MenuItem>
						</DropdownButton>
						
					</div>
					
				</Row>
        <Row>
					<Col>
						
					</Col>
				</Row>
      </Grid>
    );
  }
	
}

export default Playgroup;
