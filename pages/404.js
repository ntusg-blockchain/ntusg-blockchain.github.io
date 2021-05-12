import Layout from '../Components/Layout';
import { Button, Container, Typography } from '@material-ui/core';
import BacktoHomepage from '../Components/BacktoHomepage';

export default function Custom404() {
	return (
		<Layout>
			<Container maxWidth="sm">
				<br />
				<Typography variant="h3" component="h2">
					Oops....
				</Typography>
				<br />
				<h1>Error 404 - Page Not Found</h1>
				<br />
				<br />
				<br />
				<br />
				<br />
				<BacktoHomepage />
			</Container>
		</Layout>
	);
}
