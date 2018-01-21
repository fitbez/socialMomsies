import React from 'react'
import { Redirect } from 'react-router-dom';
// TODO - add proptypes

const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props.user, null, 2)}
				</code>
			</div>
		)
	} else {
		if(props.user) {
      return (<Redirect to="/" />)
    }
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
				{JSON.stringify(this.state)}
					{JSON.stringify(props)}
				</code>
			</div>
		)
	}
}

export default Home
