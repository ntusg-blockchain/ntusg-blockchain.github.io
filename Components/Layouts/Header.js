import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Web3Container from '../../lib/Web3Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	title: {
		flexGrow: 1
	}
}));

function EtherScan({ accounts }) {
	if (accounts === undefined || accounts.length == 0) {
		return (
			<div>
				<Link href="/integerstorage"  as={ process.env.BACKEND_URL + '/integerstorage'}>
					<a>Enable MetaMask</a>
				</Link>
			</div>
		);
	} else {
		return (
			<div>
				<Typography variant="subtitle2" color="textPrimary">
					<Link
						color="inherit"
						href={'https://ropsten.etherscan.io/address/' + accounts}
						target="_blank"
						rel="noopener noreferrer"
					>
						<a>
							{' '}
							<u>View on EtherScan</u>{' '}
						</a>
					</Link>
				</Typography>
			</div>
		);
	}
}

function Accounts({ accounts }) {
	if (accounts === undefined || accounts.length == 0) {
		return (
			<div>
				<p style={{ fontSize: '0.8rem', paddingLeft: '10px' }}>User account not sign in</p>
			</div>
		);
	} else {
		return (
			<div>
				<p style={{ fontSize: '0.8rem', paddingLeft: '10px' }}>{accounts}</p>
			</div>
		);
	}
}

const Header = () => {
	const classes = useStyles();
	const [ auth, setAuth ] = React.useState(true);
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Grid container direction="row" justify="space-evenly" alignItems="center">
						<Grid item sm={6} md={6} style={{ paddingLeft: '40px' }}>
							<Link href="/" as={ process.env.BACKEND_URL + '/'}>
								<img
									style={{
										cursor: 'pointer',
										height: '80px',
										width: '210px'
									}}
									src="/static/Logo.png"
									alt="image"
								/>
							</Link>
						</Grid>
						<Grid item xs={false} sm={6} md={6} style={{ textAlign: 'right' }}>
							{auth && (
								<div>
									<IconButton
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleMenu}
										color="inherit"
									>
										<AccountCircle />
										<Web3Container
											renderLoading={() => (
												<div style={{ fontSize: '0.8rem', paddingLeft: '10px' }}>
													Metamask not installed / Change to Ropsten
												</div>
											)}
											render={({ accounts }) => <Accounts accounts={accounts} />}
										/>
									</IconButton>
									<Menu
										id="menu-appbar"
										anchorEl={anchorEl}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right'
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right'
										}}
										open={open}
										onClose={handleClose}
									>
										<MenuItem onClick={handleClose}>
											<Web3Container
												renderLoading={() => (
													<div>
														{' '}
														<a
															target="_blank"
															rel="noopener noreferrer"
															href="https://metamask.io/download.html"
														>
															Download Metamask
														</a>
													</div>
												)}
												render={({ accounts }) => <EtherScan accounts={accounts} />}
											/>
										</MenuItem>
									</Menu>
								</div>
							)}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
