import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import CreatePoll from '../imports/ui/CreatePoll.jsx';
import ShowPoll from '../imports/ui/ShowPoll.jsx';
import Navbar from '../imports/ui/Navbar.jsx';
import Layout from '../imports/ui/Layout.jsx';

FlowRouter.route('/', {
	action() {
		FlowRouter.go('/new');
	}
});

FlowRouter.route('/new', {
	name: 'New Poll',
	action() {
		mount(Layout, {
			header: <Navbar />,
			content: <CreatePoll />
		});
	}
});

FlowRouter.route('/p/:id', {
	name: 'Show Poll',
	action(params) {
		mount(Layout, {
			header: <Navbar />,
			content: <ShowPoll id={ params.id }/>
		});
	}
});