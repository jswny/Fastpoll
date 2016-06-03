import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Polls } from '../api/polls.js';

export default class CreatePoll extends Component {

	constructor(props) {
		super(props);

		this.state = {
			title: 'Add a title to your poll',
			options: []
		}
	}

	addOption(event) {
		event.preventDefault();

		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		let newOpt = {
			text: text
		}

		let arr = this.state.options.slice();
		arr.push(newOpt);

		this.setState({options: arr});

		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	setPollTitle(event) {
		event.preventDefault();

		const text = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();

		this.setState({title: text});
	}

	submitPoll() {
		Polls.insert({
			title: this.state.title,
			options: this.state.options,
			createdAt: new Date()
		});

		alert('Poll submitted!');
	}

	renderOptions() {
		return this.state.options.map((option, index) => (
			<li key={ index }>
				<span>{ option.text }</span>
			</li>
		));
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>
						<form className="new-option" onSubmit={ this.setPollTitle.bind(this) } >
							<input
								type="text"
								ref="titleInput"
								placeholder={ this.state.title }
							/>
						</form>
					</h1>

					<form className="new-option" onSubmit={ this.addOption.bind(this) } >
						<input
							type="text"
							ref="textInput"
							placeholder="Type to add a new option"
						/>
					</form>
				</header>

				<ul>
					{ this.renderOptions() }
				</ul>

				<button type="button" className="btn btn-success" onClick={ this.submitPoll.bind(this) }>
					<span className="glyphicon glyphicon-ok"></span>
					<span> Submit</span>
				</button>
			</div>
		);
	}
}