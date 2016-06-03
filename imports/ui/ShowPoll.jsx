import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Polls } from '../api/polls.js';

import Post from './Post.jsx';

export default class ShowPoll extends TrackerReact(Component) {

	renderOptions() {
		return this.poll()[0].options.map((option, index) => (
			<Post key={ index } post={ option }/>
		));
	}

	poll() {
		return Polls.find({_id: this.props.id}).fetch();
	}

	render() {
		let poll = this.poll();
		if(poll.length < 1) {
			return (<div>Loading...</div>);
		} else {
			poll = poll[0];
			return (
				<div className="container">
					<header>
						<h1>{ poll.title }</h1>
					</header>

					<ul>
						{ this.renderOptions() }
					</ul>
				</div>
			);
		}
	}
}

ShowPoll.PropTypes = {
	id: PropTypes.string.isRequired
};