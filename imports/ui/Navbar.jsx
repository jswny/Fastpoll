import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Navbar extends Component {

	render() {
		return (
				<nav className="navbar navbar-default" id="navigation">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="/">Fastpoll</a>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
								<li>
									<a href="/new">New Poll</a>
								</li>
								<li>
									<a href="/about">About</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
		);
	}
}