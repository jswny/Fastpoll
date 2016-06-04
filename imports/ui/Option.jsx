import React, { Component, PropTypes } from 'react';

import { Options } from '../api/options.js';

export default class Option extends Component {

	constructor(props) {
		super(props);

		this.state = {
			disabled: false
		};
	}

	vote() {
		this.setState({ disabled: true });
		Options.update(this.props.option._id, {
			$set: { votes: this.props.option.votes + 1 }
		});
	}

	renderButton() {
		return this.state.disabled ? 'btn btn-success' : 'btn btn-default';
	}

	render() {
		return (
			<li>
				<button disabled={ this.state.disabled ? 'disabled' : '' } type="button" className={this.renderButton()} onClick={this.vote.bind(this)}>
					<span className="glyphicon glyphicon-check"></span>
					{ this.props.option.votes }
				</button>
				<span> { this.props.option.text }</span>
			</li>
		);
	}
}

Option.PropTypes = {
	option: PropTypes.object.isRequired
};