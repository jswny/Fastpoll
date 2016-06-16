import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class About extends Component {

	render() {
		return (
			<div>
				<header>
					<h1>About</h1>
				</header>

				<p className="large-font">
					<strong>Fastpoll</strong> strives to be the fastest, simplest polling service on the net.
					This service is currently in <strong>beta</strong> and is under active development. Thus, 
					Fastpoll should not be used in any mission-critical envrionment (but you already knew that).
					<br />
					<br />
					<i className="fa fa-github"></i> Source coming soon (probably)!
					<br />
					<br />
					❤ Contact / bug reports: <a href="mailto:contact@fastpoll.io">contact@fastpoll.io</a> 
				</p>
			</div>
		);
	}
}