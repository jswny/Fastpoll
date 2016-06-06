import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Error extends Component {

	renderClass() {
		return ('alert alert-' + this.props.error.type);
	}

	render() {
		if (this.props.error.disabled) {
			return ('');
		} else {
	 		return (
				<div className={ this.renderClass() } role="alert">{ this.props.error.text }</div>
			);
		}
	}
}

Error.PropTypes = {
	error: PropTypes.object.isRequired
};