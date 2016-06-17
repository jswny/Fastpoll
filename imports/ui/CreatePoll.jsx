import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import ShowPoll from './ShowPoll.jsx';
import Error from './Error.jsx';

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
			<li className="collection-item" key={ index }>
				{ option }
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
			<div className="section">
				<div className="card-panel">
				
					<div className="row">
						<div className="input-field col s12 l6">
							<input id="poll-title" type="text" className="validate" ref="titleInput"/>
							<label for="poll-title">Poll title</label>
						</div>
					</div>

					<div className="row">
						<form className="col s12 l6" onSubmit={ this.addOption.bind(this) }>
							<div className="input-field">
								<input id="poll-option" type="text" className="validate" ref="textInput"/>
								<label for="poll-option">Add a new option</label>
							</div>
						</form>
					</div>

					{ this.renderErrors() }

					<div className="row">
						<div className="col s12 l6">
							<ul className="collection">
								{ this.renderOptions() }
							</ul>
						</div>
					</div>

					<button className="btn waves-effect waves-light" onClick={ this.submitPoll.bind(this) }>
						Submit
						<i className="material-icons right">send</i>
					</button>
				</div>
			</div>
		);
	}
}