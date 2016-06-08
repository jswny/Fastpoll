import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Polls = new Mongo.Collection('polls');

if (Meteor.isServer) {
	Meteor.publish('polls', function pollsPublication() {
		return Polls.find();
	});
}

Meteor.methods({
	'polls.insert'(title) {
		check(title, String);

		return Polls.insert({
			title,
			createdAt: new Date()
		});
	}
});