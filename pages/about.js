import React from 'react';
import Layout from '../Components/Layout';
import { Typography, Container } from '@material-ui/core';
import BacktoHomepage from '../Components/BacktoHomepage';

const aboutPage = () => (
	<Layout>
		<Container maxWidth="sm">
			<Typography style={{ padding: '20px' }} variant="h4">
				About Us
			</Typography>
			<Typography style={{ padding: '20px' }} variant="body1" gutterBottom>
				Founded in July 2017, We're a non-profit student club consists of Blockchain enthusiasts with background
				ranging from computer science, to math, to business here at Nanyang Technological University in
				Singapore.
			</Typography>
			<BacktoHomepage />
		</Container>
	</Layout>
);

export default aboutPage;
