import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Polls = new Mongo.Collection('polls');

Meteor.methods({
	'polls.insert'(title) {
		check(title, String);

		return Polls.insert({
			title,
			createdAt: new Date()
		});
	}
});