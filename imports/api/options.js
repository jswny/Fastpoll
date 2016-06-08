import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Options = new Mongo.Collection('options');

if (Meteor.isServer) {
	Meteor.publish('options', function optionsPublication() {
		return Options.find();
	});
}

Meteor.methods({
	'options.insert'(pollId, text) {
		check(pollId, String);
		check(text, String);

		Options.insert({
			_pollId: pollId,
			text,
			votes: 0
		});
	},
	'options.vote'(optionId) {
		let currVotes = Options.findOne({ _id: optionId }).votes;

		Options.update(optionId, {
			$set: { votes: currVotes + 1 }
		});
	}
});