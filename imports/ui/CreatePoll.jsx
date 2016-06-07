import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import ShowPoll from '../ui/ShowPoll.jsx';
import Error from '../ui/Error.jsx';

import { Polls } from '../api/polls.js';
import { Options } from '../api/options.js';

export default class CreatePoll extends Component {

	constructor(props) {
		super(props);

		this.state = {
			errors: [],
			options: []
		}
	}

	addOption(event) {
		this.clearErrors();
		event.preventDefault();

		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		if (text.length < 1) {
			let errors = this.state.errors;

			errors.push({
				disabled: false,
				text: 'Entry cannot be empty',
				type: 'danger'
			});

			this.setState({ errors: errors });
			return;
		}

		let newOpt = text;

		let arr = this.state.options.slice();
		arr.push(newOpt);

		this.setState({ options: arr });

		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	setPollTitle(event) {
		event.preventDefault();
	}

	submitPoll() {
		this.clearErrors();

		let title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
		let defaultTitle = 'Add a title to your poll';

		if (title === '') {
			let errors = this.state.errors;

			errors.push({
				disabled: false,
				text: 'Title cannot be empty',
				type: 'danger'
			});

			this.setState({ errors: errors });

		} else {
			Meteor.call('polls.insert', title, (error, pollId) => {
				FlowRouter.go('/p/' + pollId);
				
				for(let i = 0; i < this.state.options.length; i++) {
					let opt = this.state.options[i];
					Meteor.call('options.insert', pollId, opt);
				}
			});
		}
	}

	renderOptions() {
		return this.state.options.map((option, index) => (
			<li key={ index }>
				<span>{ option }</span>
			</li>
		));
	}

	renderErrors() {
		return this.state.errors.map((error, index) => (
			<Error key={ index } error={ error }/> 
		));
	}

	clearErrors() {
		this.state.errors = [];
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>
						<form className="user-input" onSubmit={ this.setPollTitle.bind(this) } >
							<input
								type="text"
								ref="titleInput"
								placeholder="Add a title to your poll"
							/>
						</form>
					</h1>

					<form className="user-input" id="new-option" onSubmit={ this.addOption.bind(this) } >
						<input
							type="text"
							ref="textInput"
							placeholder="Type to add a new option"
						/>
					</form>
					{ this.renderErrors() }
				</header>

				<ul id="options-table">
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