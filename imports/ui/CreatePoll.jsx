import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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
			title: 'Add a title to your poll',
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

		let newOpt = {
			text: text,
			votes: 0
		}

		let arr = this.state.options.slice();
		arr.push(newOpt);

		this.setState({ options: arr });

		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	setPollTitle(event) {
		event.preventDefault();

		const text = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();

		this.setState({title: text});
	}

	submitPoll() {
		this.clearErrors();

		let title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
		let defaultTitle = 'Add a title to your poll';

		if (this.state.title === defaultTitle && title === '') {
			let errors = this.state.errors;

			errors.push({
				disabled: false,
				text: 'Title cannot be empty',
				type: 'danger'
			});

			this.setState({ errors: errors });

		} else {
			if (this.state.title === defaultTitle) {
				this.state.title = title;
			}

			Polls.insert({
				title: this.state.title,
				createdAt: new Date()
			}, (err, res) => {

				FlowRouter.go('/p/' + res);

				for(let i = 0; i < this.state.options.length; i++) {
					let opt = this.state.options[i];
					opt._pollId = res;
					Options.insert(opt);
				}
			});
		}
	}

	renderOptions() {
		return this.state.options.map((option, index) => (
			<li key={ index }>
				<span>{ option.text }</span>
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
								placeholder={ this.state.title }
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