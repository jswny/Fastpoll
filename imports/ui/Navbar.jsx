import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Navbar extends Component {

	render() {
		return (
				<nav>
					<div className="nav-wrapper">
						<div className="col s12" id="navigation">
							<a href="/" className="brand-logo">Fastpoll</a>
							<ul id="nav-mobile" className="right hide-on-med-and-down">
								<li><a href="/new">New Poll</a></li>
								<li><a href="/about">About</a></li>
							</ul>
						</div>
					</div>
				</nav>
		);
	}
}