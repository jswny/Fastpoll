import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import CreatePoll from '../imports/ui/CreatePoll.jsx';
import ShowPoll from '../imports/ui/ShowPoll.jsx';

FlowRouter.route('/new', {
	name: 'New Poll',
	action() {
		mount(CreatePoll);
	}
});

FlowRouter.route('/p/:id', {
	name: 'Show Poll',
	action(params) {
		mount(ShowPoll, {id: params.id});
	}
});