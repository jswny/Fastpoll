import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Keyframes, Frame } from 'react-keyframes';

import { Polls } from '../api/polls.js';
import { Options } from '../api/options.js';

import Option from './Option.jsx';

export default class ShowPoll extends TrackerReact(Component) {

	constructor(props) {
		super(props);
		let disableVoting;
		if (localStorage.getItem('userVoted-' + this.props.id) === null) {
			disableVoting = false;
		} else {
			disableVoting = localStorage.getItem('userVoted-' + this.props.id);
		}

		this.state = {
			disableVoting: disableVoting
		}
	}

	toggleVoting() {
		localStorage.setItem('userVoted-' + this.props.id, !this.state.disableVoting);
		this.setState({ disableVoting: !this.state.disableVoting });
	}

	renderOptions() {
		return this.options().map((option) => (
			<Option key={ option._id } option={ option } votingDisabled={ this.state.disableVoting } toggleVoting={ this.toggleVoting.bind(this) }/>
		));
	}

	options() {
		if (this.state.disableVoting) {
			return Options.find({ _pollId: this.props.id }, { sort: { votes: -1 } }).fetch();
		} else {
			return Options.find({ _pollId: this.props.id }).fetch();
		}
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
						<Keyframes component="h1" loop={ true }>
							<Frame>Loading -</Frame>
							<Frame>Loading \</Frame>
							<Frame>Loading |</Frame>
							<Frame>Loading /</Frame>
						</Keyframes>
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

					<ul id="options-table">
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