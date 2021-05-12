import React from 'react';
import AttendanceWeb3Container from '../lib/AttendanceWeb3Container';
import {
	Button,
	Typography,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Box,
	Card,
	Link,
	CardContent
} from '@material-ui/core';
import Layout from '../Components/Layout';
import Metamask from '../Components/Metamask';
import BacktoHomepage from '../Components/BacktoHomepage';

class Dapp extends React.Component {
	state = {
		value: false, // status
		setvalue: undefined,
		ethBalance: undefined,
		AttendeeCount: '',
		contractAddress: '',
		metamaskEnabled: false,
		signLoading: false,
		burnLoading: false,
		transactionURL: ''
	};

	async componentDidMount() {
		try {
			const { accounts, contract, web3 } = this.props;
			const value = await contract.methods.checkAttendee(accounts[0]).call({ from: accounts[0] });
			const balanceInWei = await web3.eth.getBalance(accounts[0]);
			const AttendeeCount = await contract.methods.getAttendeeCount().call({ from: accounts[0] });
			this.setState({ AttendeeCount: AttendeeCount, contractAddress: contract._address });
			this.setState({ ethBalance: balanceInWei / 1e18 });
			this.setState({ value });
		} catch (error) {
			console.log(error);
		}
	}

	storeValue = async () => {
		event.preventDefault();
		this.setState({ signLoading: true });
		const { accounts, contract } = this.props;
		try {
			let result = await contract.methods.signIn().send({ from: accounts[0], value: 100000000000000000 });
			result = result.transactionHash;
			let string = `https://ropsten.etherscan.io/tx/${result}`;
			this.setState({ transactionURL: string });
		} catch (err) {
			alert(`Error`);
			this.setState({ signLoading: false });
			return;
		}
		alert(`Signed in to Attendance. Refresh to see the result.`);
		this.setState({ signLoading: false });
	};

	burnValue = async () => {
		event.preventDefault();
		this.setState({ burnLoading: true });
		const { accounts, contract } = this.props;
		try {
			let result = await contract.methods.signOut().send({ from: accounts[0] });
			result = result.transactionHash;
			let string = `https://ropsten.etherscan.io/tx/${result}`;
			this.setState({ transactionURL: string });
		} catch (err) {
			alert(`Error`);
			this.setState({ burnLoading: false });
			return;
		}
		alert(`Reset Attendance Sheet, refresh to see the result.`);
		this.setState({ burnLoading: false });
	};

	getValue = async () => {
		const { accounts, contract } = this.props;
		const response = await contract.methods.checkAttendee(accounts[0]).call({ from: accounts[0] });
		const totalSupply = await contract.methods.getAttendeeCount().call({ from: accounts[0] });

		this.setState({ value: response, AttendeeCount: totalSupply });
	};

	getEthBalance = async () => {
		const { web3, accounts } = this.props;
		const balanceInWei = await web3.eth.getBalance(accounts[0]);
		this.setState({ ethBalance: balanceInWei / 1e18 });
	};

	handleValue(event) {
		this.setState({ setvalue: event.target.value });
	}

	enableMetaMask = async () => {
		try {
			await window.ethereum.enable();
			this.setState({ metamaskEnabled: true });
		} catch (err) {
			console.log(err);
		}
		window.location.reload(true);
	};

	handleClose = () => {
		this.setState({ transactionURL: '' });
		//window.location.reload(true);
	};

	render() {
		return (
			<Layout>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby="customized-dialog-title"
					open={!!this.state.transactionURL}
				>
					<DialogTitle>Transaction Hash</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Click to view the-
							<a rel="noopener noreferrer" href={this.state.transactionURL} target="_blank">
								Transaction Link @ Etherscan
							</a>
						</DialogContentText>
						{this.state.transactionURL.replace('https://ropsten.etherscan.io/tx/', '')}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
				<div>
					<Typography style={{ paddingBottom: '30px' }} variant="h4" color="textPrimary" gutterBottom>
						Attendance Tracker Dapp
					</Typography>
					<Button
						style={{ float: 'right' }}
						variant="contained"
						color="inherit"
						onClick={this.enableMetaMask}
					>
						Enable MetaMask
					</Button>
					<br />
					<br />
					<br />
					<Typography style={{ paddingBottom: '30px' }} variant="subtitle1" gutterBottom>
						Contract Address :{' '}
						<Link
							color="inherit"
							href={'https://ropsten.etherscan.io/address/' + this.state.contractAddress}
							target="_blank"
							rel="noopener noreferrer"
						>
							<a>
								{' '}
								<u>{this.state.contractAddress}</u>{' '}
							</a>
						</Link>
					</Typography>
					<Box component="span" display="flex" p={1} m={1} bgcolor="background.paper">
						<Typography variant="h6" color="textPrimary" gutterBottom>
							<b>
								The purpose of Attendance tracker Dapp is to stimulate paying of ETH to change state and
								sending ETH to / from a Smart contract.
								<p>
									{' '}
									Please click on the Contract address and view the source code of the Contract to
									find out more.
								</p>{' '}
							</b>
						</Typography>
					</Box>
					<Card variant="outlined">
						<CardContent>
							<Typography variant="h6" color="textPrimary">
								Attending : {String(this.state.value)}
							</Typography>
						</CardContent>
						<CardContent>
							<Typography variant="h6" color="textPrimary">
								Attendance Count : {this.state.AttendeeCount}
							</Typography>
						</CardContent>
					</Card>
					<p>
						{' '}
						Click on refresh value to see the state change after interacting with the Smart Contract
					</p>{' '}
					<Button style={{ float: 'right' }} variant="contained" color="primary" onClick={this.getValue}>
						Refresh value
					</Button>
					<br />
					<br />
					<br />
					<br />
					<b>
						{' '}
						Request Ropsten ETH from{' '}
						<Link
							target="_blank"
							color="inherit"
							href="https://faucet.metamask.io/"
							rel="noopener noreferrer"
						>
							<a>
								{' '}
								<u>Faucet</u>{' '}
							</a>
						</Link>
						to interact with the contract if your ETH Balance is Zero. {' '}
					</b>
					<Typography
						style={{ paddingTop: '30px', paddingBottom: '30px' }}
						variant="h6"
						color="textPrimary"
						gutterBottom
					>
						User ETH Balance: {this.state.ethBalance}
					</Typography>
					<p>Click on refresh value to see the changes in ETH after interacting with the Smart Contract</p>
					<Button style={{ float: 'right' }} variant="contained" color="primary" onClick={this.getEthBalance}>
						Refresh balance
					</Button>
					<br />
					<br />
					<br />
					<br />
					<br />
					<form style={{ width: '100%' }} onSubmit={this.storeValue}>
						<p> Pay 0.1 ETH to sign in. </p>
						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="contained"
							color="secondary"
						>
							{!this.state.signLoading && <a> Sign in Attendance </a>}
							{this.state.signLoading && <CircularProgress thickness={6} size={24} />}
						</Button>
					</form>
					<br />
					<br />
					<br />
					<form style={{ width: '100%' }} onSubmit={this.burnValue}>
						<p> Contract will return 0.1 ETH back to you when you sign out. </p>

						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="outlined"
							color="secondary"
						>
							{!this.state.burnLoading && <a> Sign Out Attendance </a>}
							{this.state.burnLoading && <CircularProgress thickness={6} size={24} />}
						</Button>
					</form>
					<br />
					<br />
					<br />
					<br />
					<BacktoHomepage />
				</div>
				<br />
			</Layout>
		);
	}
}
const PageattendanceTracker = () => (
	<AttendanceWeb3Container
		renderLoading={() => <Metamask />}
		render={({ web3, accounts, contract }) => <Dapp accounts={accounts} contract={contract} web3={web3} />}
	/>
);

export default PageattendanceTracker;
