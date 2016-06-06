import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Polls } from '../api/polls.js';
import { Options } from '../api/options.js';

import Option from './Option.jsx';

export default class ShowPoll extends TrackerReact(Component) {

	constructor(props) {
		super(props);
		this.state = {
			disableVoting: false
		}
	}

	toggleVoting() {
		this.setState({disableVoting: !this.state.disableVoting});
	}

	renderOptions() {
		return this.options().map((option) => (
			<Option key={ option._id } option={ option } votingDisabled={ this.state.disableVoting } toggleVoting={ this.toggleVoting.bind(this) }/>
		));
	}

	options() {
		return Options.find({ _pollId: this.props.id }).fetch();
	}

	poll() {
		return Polls.find({ _id: this.props.id }).fetch();
	}

	render() {
		let poll = this.poll();
		if(poll.length < 1) {
			return (
				<div className="container">
					<header>
						<h1>Loading...</h1>
					</header>
				</div>
			);
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