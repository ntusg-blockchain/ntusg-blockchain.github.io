import Layout from '../Components/Layout';
import { Typography, Grid } from '@material-ui/core';
import ReactPlayer from 'react-player';
import BacktoHomepage from '../Components/BacktoHomepage';

const Video = () => {
	return (
		<Layout>
			<Grid container>
				<Typography variant="h4">Quick Guide for BNS Demo Dapps.</Typography>

				<ReactPlayer
					style={{ marginTop: ' 30px' }}
					controls
					url="https://www.youtube.com/watch?v=e5sQcc-lfNU&feature=youtu.be"
				/>
			</Grid>
			<br />
			<Typography variant="h5">
				If you are a new user , please go through this video and install/activate it before you can enjoy our
				Dapps.
			</Typography>
			<br />
			<Typography variant="h5">
				Please skip through the 1st ( 2 minutes ) , If you see ‘User account not sign in’ on the top right panel
				of our application.Click on it and Enable on Your MetaMask on Ropsten Testnet.
			</Typography>
			<BacktoHomepage />
		</Layout>
	);
};

export default Video;
