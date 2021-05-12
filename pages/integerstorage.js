import React from 'react';
import Link from '@material-ui/core/Link';
import Web3Container from '../lib/Web3Container';
import {
	Button,
	Typography,
	TextField,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Box,
	Card,
	CardContent
} from '@material-ui/core';
import Layout from '../Components/Layout';
import BacktoHomepage from '../Components/BacktoHomepage';

import Metamask from '../Components/Metamask';

class Integerstorage extends React.Component {
	state = {
		value: undefined,
		setvalue: undefined,
		ethBalance: undefined,
		metamaskEnabled: false,
		loading: false,
		contractAddress: '',
		transactionURL: ''
	};

	async componentDidMount() {
		try {
			const { accounts, contract, web3 } = this.props;
			const value = await contract.methods.get().call({ from: accounts[0] });
			const balanceInWei = await web3.eth.getBalance(accounts[0]);
			this.setState({ ethBalance: balanceInWei / 1e18, contractAddress: contract._address });
			this.setState({ value });
		} catch (error) {
			//	alert(`Click to enable MetaMask.`);
			console.log(error);
		}
	}

	storeValue = async () => {
		event.preventDefault();
		this.setState({ loading: true });
		const { accounts, contract } = this.props;
		try {
			let result = await contract.methods.set(this.state.setvalue).send({ from: accounts[0] });
			result = result.transactionHash;
			let string = `https://ropsten.etherscan.io/tx/${result}`;
			this.setState({ transactionURL: string });
		} catch (err) {
			alert(`Error`);
			this.setState({ loading: false });
			return;
		}
		alert(`Stored ${this.state.setvalue} into account. Refresh to see the result.`);
		this.setState({ loading: false });
	};

	getValue = async () => {
		const { accounts, contract } = this.props;
		const response = await contract.methods.get().call({ from: accounts[0] });
		this.setState({ value: response });
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
						Integer storage Dapp
					</Typography>
					<p>
						{' '}
						Click <b>Enable MetaMask</b> to Sign in before using the Dapp{' '}
					</p>
					<Button
						style={{ float: 'right' }}
						variant="contained"
						color="secondary"
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
							The purpose of Integer Storage Dapp is to change the state of the Integer in the Smart
							contract.
							<p>Please click on the Contract address and view the source code of the Contract.</p>{' '}
						</Typography>
					</Box>
					<Card variant="outlined">
						<CardContent>
							<Typography variant="h6" color="textPrimary">
								Stored Integer : {this.state.value}
							</Typography>
						</CardContent>
					</Card>

					<p>
						Click on <b> Refresh Integer</b> to see the state change after interacting with the Smart
						Contract.
					</p>
					<Button style={{ float: 'right' }} variant="contained" color="primary" onClick={this.getValue}>
						Refresh Integer
					</Button>

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
						Ropsten ETH Balance: {this.state.ethBalance}
					</Typography>
					<p>
						Click on <b> Refresh Balance</b> to see the deduction of ETH after interacting with the Smart
						Contract
					</p>
					<Button style={{ float: 'right' }} variant="contained" color="primary" onClick={this.getEthBalance}>
						Refresh balance
					</Button>
					<br />
					<br />
					<br />
					<br />
					<br />

					<form style={{ width: '100%' }} onSubmit={this.storeValue}>
						<p>Store Integer will interact with the Smart contract and change the state of the Integer.</p>
						<TextField
							id="standard-basic"
							label="Enter Value"
							name="value"
							setvalue={this.state.setvalue}
							onChange={this.handleValue.bind(this)}
						/>
						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="contained"
							color="secondary"
							disabled={this.state.loading}
						>
							{!this.state.loading && <a> Store Integer </a>}
							{this.state.loading && <CircularProgress color="secondary" thickness={6} size={24} />}
						</Button>
					</form>
					<br />
					<br />
					<br />
					<br />
					<BacktoHomepage />
				</div>
			</Layout>
		);
	}
}

const Integerpage = () => (
	<Web3Container
		renderLoading={() => <Metamask />}
		render={({ web3, accounts, contract }) => (
			<Integerstorage accounts={accounts} contract={contract} web3={web3} />
		)}
	/>
);
export default Integerpage;
