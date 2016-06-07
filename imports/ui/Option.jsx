import React, { Component, PropTypes } from 'react';

import { Options } from '../api/options.js';

export default class Option extends Component {

	vote() {
		this.props.toggleVoting();
		Meteor.call('options.vote', this.props.option._id);
	}

	renderButton() {
		return this.props.votingDisabled ? 'btn btn-success' : 'btn btn-default';
	}

	render() {
		return (
			<li>
				<button disabled={ this.props.votingDisabled ? 'disabled' : '' } type="button" className={ this.renderButton() } onClick={ this.vote.bind(this) }>
					<span className="glyphicon glyphicon-check"></span>
					{ this.props.votingDisabled ? ' ' + this.props.option.votes : '' }
				</button>
				<span> { this.props.option.text }</span>
			</li>
		);
	}
}

Option.PropTypes = {
	option: PropTypes.object.isRequired,
	votingDisabled: PropTypes.bool.isRequired,
	toggleVoting: PropTypes.func.isRequired
};