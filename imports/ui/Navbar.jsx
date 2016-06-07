import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Navbar extends Component {

	render() {
		return (
			<nav class="navbar navbar-default" id="navigation">
			  <div class="container-fluid">
			    <div class="navbar-header">
			    	<a class="navbar-brand" href="/">Fastpoll</a>
			    </div>
			    <div class="collapse navbar-collapse">
			    	<ul class="nav navbar-nav">
			    		<li>
					    	<a href="/new">New Poll</a>
			    		</li>
			    	</ul>
			    </div>
			  </div>
			</nav>
		)
	}
}