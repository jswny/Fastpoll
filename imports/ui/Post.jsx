import React, { Component, PropTypes } from 'react';

import { Polls } from '../api/polls.js';

export default class Post extends Component {

	constructor(props) {
		super(props);

		this.state = {
			disabled: false
		};
	}

	handleClick() {
		this.setState({ disabled: true });
		Posts.update(this.props.post._id, {
			$set: { points: this.props.post.points + 1 }
		});
	}

	renderButton() {
		return this.state.disabled ? 'btn btn-success' : 'btn btn-default';
	}

	render() {
		return (
			<li>
				<button disabled={ this.state.disabled ? 'disabled' : '' } type="button" className={this.renderButton()} onClick={this.handleClick.bind(this)}>
					<span className="glyphicon glyphicon-check"></span>
				</button>
				<span> { this.props.post.text }</span>
			</li>
		);
	}
}

Post.PropTypes = {
	post: PropTypes.object.isRequired
};