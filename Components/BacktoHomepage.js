import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
export class BacktoHomepage extends Component {
	render() {
		return (
			<div>
				<Typography variant="h6">
					<Button href="/" disableRipple rel="noopener noreferrer">
						<u style={{ textTransform: 'none' }}> Back to Homepage. </u>
					</Button>
				</Typography>
			</div>
		);
	}
}

export default BacktoHomepage;
