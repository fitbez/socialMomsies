import React from 'react';
import { Panel, } from 'react-bootstrap';

const Message = props => (
	<Panel>
		<Panel.Body>{props.messageBody}</Panel.Body>
	</Panel>
);

export { Message };