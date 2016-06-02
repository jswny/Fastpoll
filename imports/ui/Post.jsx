import React, { Component, PropTypes } from 'react';

import { Posts } from '../api/posts.js';

export default class Post extends Component {

	handleClick() {
		Posts.update(this.props.post._id, {
			$set: { points: this.props.post.points + 1 }
		});
	}

	render() {
		return (
			<li>
				<button type="button" className="btn btn-default" onClick={this.handleClick.bind(this)}>
					<span className="glyphicon glyphicon-check"></span>
					{this.props.post.points}
				</button>
				<span> {this.props.post.text}</span>
			</li>
		);
	}
}

Post.PropTypes = {
	post: PropTypes.object.isRequired
};