import React, { Component, PropTypes } from 'react';

import { Options } from '../api/options.js';

export default class Option extends Component {

	vote() {
		this.props.toggleVoting();
		Meteor.call('options.vote', this.props.option._id);
	}

	renderButton() {
		return this.props.votingDisabled ? 'waves-effect waves-light btn disabled' : 'waves-effect waves-light btn';
	}

	render() {
		return (
			<li className="collection-item">
				<div>
					<button className={ this.renderButton() } disabled={ this.props.votingDisabled ? 'disabled' : '' } onClick={ this.vote.bind(this) }>
						<i className="material-icons left">done</i>
						{ this.props.votingDisabled ? ' ' + this.props.option.votes : '' }
					</button>
					<span className="option-text">
						{ this.props.option.text }
					</span>
				</div>
			</li>
		);
	}
}

Option.PropTypes = {
	option: PropTypes.object.isRequired,
	votingDisabled: PropTypes.bool.isRequired,
	toggleVoting: PropTypes.func.isRequired
};