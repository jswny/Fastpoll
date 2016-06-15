import React from 'react';

export default Layout = ({ header, content }) => (
	<div>
		{ header }
		<div className="container">
			{ content }
		</div>
	</div>
);