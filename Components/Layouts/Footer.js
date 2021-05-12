import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary">
			{'Copyright © '}2020<br />
			<Link color="inherit" href="https://github.com/ntusg-blockchain/bns-demo-app" rel="noopener noreferrer">
				Under GNU GLP v3 License
			</Link>
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '91vh'
	},
	main: {
		marginBottom: theme.spacing(2)
	},
	footer: {
		padding: theme.spacing(2, 2),
		marginTop: 'auto',
		backgroundColor: '#3481be'
	}
}));

export default function StickyFooter(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Container component="main" className={classes.main} maxWidth="sm">
				{props.children}
			</Container>
			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<Copyright />
					<Typography variant="body1" color="textSecondary">
						Build by{' '}
						<Link color="inherit" href="https://github.com/ntusg-blockchain" rel="noopener noreferrer">
							Blockchain@NTU Singapore
						</Link>
					</Typography>
				</Container>
			</footer>
		</div>
	);
}
