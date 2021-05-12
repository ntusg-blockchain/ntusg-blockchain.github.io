import Layout from '../Components/Layout';
import ReactPlayer from 'react-player';
import { Button, Grid, Typography, Container } from '@material-ui/core';

const Metamask = () => {
	return (
		<Layout>
			<Container>
				<Grid container>
					<br />
					<br />
					<Typography variant="h5" component="h2">
						Please enable MetaMask from browser extension or Install from {' '}
						<a
							style={{ paddingLeft: '10px' }}
							target="_blank"
							rel="noopener noreferrer"
							href="https://metamask.io/download.html"
						>
							<img
								style={{
									cursor: 'pointer',
									maxWidth: '150px',
									maxHeight: '250px'
								}}
								src="/static/dlMetamask.png"
								alt="image"
							/>{' '}
						</a>{' '}
					</Typography>

					<ReactPlayer
						style={{ marginTop: ' 30px' }}
						controls
						url="https://www.youtube.com/watch?v=ZIGUC9JAAw8&feature=youtu.be"
					/>
				</Grid>
				<br />
				<Typography variant="h6">
					<Button href="/" disableRipple rel="noopener noreferrer">
						<u style={{ textTransform: 'none' }}> Return to main page. </u>
					</Button>
				</Typography>
			</Container>
		</Layout>
	);
};

export default Metamask;
