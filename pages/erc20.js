import React from 'react';
import Erc20Web3Container from '../lib/Erc20Web3Container';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Layout from '../Components/Layout';
import TextField from '@material-ui/core/TextField';
import Metamask from '../Components/Metamask';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BigNumber from 'bignumber.js';
import BacktoHomepage from '../Components/BacktoHomepage';

class Dapp extends React.Component {
	state = {
		value: undefined,
		setvalue: undefined,
		ethBalance: undefined,
		supply: '',
		contractAddress: '',
		destoryValue: '',
		metamaskEnabled: false,
		createLoading: false,
		destoryLoading: false,
		transactionURL: '',
		approveValue: '',
		approveAddress: '',
		approveLoading: '',
		decimals: '',
		allowanceValue: '',
		ownerAddress: '',
		spenderAddress: ''
	};

	async componentDidMount() {
		try {
			const { accounts, contract, web3 } = this.props;
			//

			let value = await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
			let balanceInWei = await web3.eth.getBalance(accounts[0]);
			let totalSupply = await contract.methods.totalSupply().call({ from: accounts[0] });
			const decimals = await contract.methods.decimals().call({ from: accounts[0] });
			totalSupply = new BigNumber(totalSupply).shiftedBy(-decimals).toFixed();
			value = new BigNumber(value).shiftedBy(-decimals).toFixed();
			this.setState({ supply: totalSupply, contractAddress: contract._address });
			this.setState({ ethBalance: balanceInWei / 1e18 });
			this.setState({ value, decimals });
		} catch (error) {
			console.log(error);
		}
	}

	createValue = async () => {
		event.preventDefault();
		this.setState({ createLoading: true });
		const { accounts, contract } = this.props;
		try {
			let value = new BigNumber(this.state.setvalue).shiftedBy(Number(this.state.decimals));
			let result = await contract.methods.mintToSelf(value).send({ from: accounts[0] });
			result = result.transactionHash;
			let string = `https://ropsten.etherscan.io/tx/${result}`;
			this.setState({ transactionURL: string });
		} catch (err) {
			alert(`Error ${err}`);
			this.setState({ createLoading: false });
			return;
		}
		alert(`Created ${this.state.setvalue} BNST into account. Refresh to see the result.`);
		this.setState({ createLoading: false });
	};

	burnValue = async () => {
		event.preventDefault();
		this.setState({ destoryLoading: true });
		const { accounts, contract } = this.props;
		try {
			let value = new BigNumber(this.state.destoryValue).shiftedBy(Number(this.state.decimals));

			let result = await contract.methods.burnSelf(value).send({ from: accounts[0] });
			result = result.transactionHash;
			let string = `https://ropsten.etherscan.io/tx/${result}`;
			this.setState({ transactionURL: string });
		} catch (err) {
			alert(`Error- ${err}`);
			this.setState({ destoryLoading: false });
			return;
		}
		alert(`Destoryed ${this.state.destoryValue} BNST from own account.  Refresh to see the result.`);
		this.setState({ destoryLoading: false });
	};

	allowedValue = async () => {
		event.preventDefault();
		this.setState({ approveLoading: true });
		const { accounts, contract } = this.props;
		try {
			let value = new BigNumber(this.state.approveValue).shiftedBy(Number(this.state.decimals));

			let result = await contract.methods.approve(this.state.approveAddress, value).send({ from: accounts[0] });
			result = result.transactionHash;
			let string = `https://ropsten.etherscan.io/tx/${result}`;
			this.setState({ transactionURL: string });
		} catch (err) {
			alert(`Error ${err}`);
			this.setState({ approveLoading: false });
			return;
		}
		alert(`approveed ${this.state.approveValue} from own account.  Refresh to see the result.`);
		this.setState({ approveLoading: false });
	};

	checkAllowance = async () => {
		event.preventDefault();
		const { accounts, contract } = this.props;
		try {
			let allowanceValue = await contract.methods
				.allowance(this.state.ownerAddress, this.state.spenderAddress)
				.call({ from: accounts[0] });
			allowanceValue = new BigNumber(allowanceValue).shiftedBy(-this.state.decimals).toFixed();
			this.setState({ allowanceValue });
		} catch (err) {
			alert(`${err}`);
		}
	};

	getValue = async () => {
		const { accounts, contract } = this.props;
		let response = await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
		let totalSupply = await contract.methods.totalSupply().call({ from: accounts[0] });
		totalSupply = new BigNumber(totalSupply).shiftedBy(-this.state.decimals).toFixed();
		response = new BigNumber(response).shiftedBy(-this.state.decimals).toFixed();

		this.setState({ value: response, supply: totalSupply });
	};

	getEthBalance = async () => {
		const { web3, accounts } = this.props;
		const balanceInWei = await web3.eth.getBalance(accounts[0]);
		this.setState({ ethBalance: balanceInWei / 1e18 });
	};

	handleValue(event) {
		this.setState({ setvalue: event.target.value });
	}

	handleDestoryValue(event) {
		this.setState({ destoryValue: event.target.value });
	}

	handleApproveValue(event) {
		this.setState({ approveValue: event.target.value });
	}

	handleApproveAddress(event) {
		this.setState({ approveAddress: event.target.value });
	}

	handleSpenderAddress(event) {
		this.setState({ spenderAddress: event.target.value });
	}

	handleOwnerAddress(event) {
		this.setState({ ownerAddress: event.target.value });
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
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={this.state.transactionURL}
								target="_blank"
							>
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

				<Container>
					<Typography style={{ paddingBottom: '30px' }} variant="h4" color="textPrimary" gutterBottom>
						BNS Token Dapp ( ERC-20 , Fungible Token )
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

					<Typography style={{ paddingBottom: '30px' }} variant="h6" color="textPrimary" gutterBottom>
						Contract Address :{' '}
						<a
							rel="noopener noreferrer"
							target="_blank"
							href={'https://ropsten.etherscan.io/address/' + this.state.contractAddress}
						>
							{' '}
							{this.state.contractAddress}{' '}
						</a>
					</Typography>
					<Typography style={{ paddingBottom: '30px' }} variant="h6" color="textPrimary" gutterBottom>
						User Balance : {this.state.value} BNST
					</Typography>
					<Typography style={{ paddingBottom: '30px' }} variant="h6" color="textPrimary" gutterBottom>
						Total Supply of Token : {this.state.supply} BNST
					</Typography>

					<Typography style={{ paddingBottom: '30px' }} variant="h6" color="textPrimary" gutterBottom>
						Token Decimals : {this.state.decimals}
					</Typography>

					<Button style={{ float: 'right' }} variant="contained" color="primary" onClick={this.getValue}>
						Refresh value
					</Button>

					<br />
					<br />
					<Typography
						style={{ paddingTop: '30px', paddingBottom: '30px' }}
						variant="h6"
						color="textPrimary"
						gutterBottom
					>
						User ETH Balance: {this.state.ethBalance}
					</Typography>
					<Button style={{ float: 'right' }} variant="contained" color="primary" onClick={this.getEthBalance}>
						Refresh balance
					</Button>
					<br />
					<br />
					<br />
					<br />
					<Typography
						style={{ paddingTop: '30px', paddingBottom: '30px' }}
						variant="body1"
						color="textPrimary"
						gutterBottom
						paragraph
					>
						Click on the following{' '}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-View-See-Your-Tokens-in-Metamask"
						>
							link
						</a>{' '}
						to learn how to add and send BNST in your Metamask account.
					</Typography>

					<br />

					<form style={{ width: '100%' }} onSubmit={this.createValue}>
						<TextField
							id="standard-basic"
							label="Enter Amount to Create"
							name="value"
							setvalue={this.state.setvalue}
							onChange={this.handleValue.bind(this)}
						/>
						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="contained"
							color="secondary"
							disabled={this.state.createLoading}
						>
							{!this.state.createLoading && <a> Create BNS Token </a>}
							{this.state.createLoading && <CircularProgress thickness={6} size={24} />}
						</Button>
					</form>
					<br />
					<br />
					<br />
					<form style={{ width: '100%' }} onSubmit={this.burnValue}>
						<TextField
							id="standard-basic"
							label="Enter Amount to Destory"
							name="value"
							setvalue={this.state.destoryValue}
							onChange={this.handleDestoryValue.bind(this)}
						/>
						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="outlined"
							color="secondary"
							disabled={this.state.destoryLoading}
						>
							{!this.state.destoryLoading && <a> Destory BNS Token </a>}
							{this.state.destoryLoading && <CircularProgress thickness={6} size={24} />}
						</Button>
					</form>

					<br />
					<br />

					<form style={{ width: '100%' }} onSubmit={this.allowedValue}>
						<TextField
							id="standard-basic"
							label="Enter amount to approver"
							name="value"
							setvalue={this.state.approveValue}
							onChange={this.handleApproveValue.bind(this)}
						/>
						<br />
						<TextField
							fullWidth
							id="standard-basic"
							label="Enter approver address"
							name="value"
							setvalue={this.state.approveAddress}
							onChange={this.handleApproveAddress.bind(this)}
						/>
						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="outlined"
							color="secondary"
							disabled={this.state.approveLoading}
						>
							{!this.state.approveLoading && <a> Approve BNS Token </a>}
							{this.state.approveLoading && <CircularProgress thickness={6} size={24} />}
						</Button>
					</form>
					<br />
					<br />
					<form style={{ width: '100%' }} onSubmit={this.checkAllowance}>
						<TextField
							fullWidth
							id="standard-basic"
							label="Enter Owner address"
							name="value"
							setvalue={this.state.ownerAddress}
							onChange={this.handleOwnerAddress.bind(this)}
						/>
						<br />
						<TextField
							fullWidth
							id="standard-basic"
							label="Enter Spender address"
							name="value"
							setvalue={this.state.spenderAddress}
							onChange={this.handleSpenderAddress.bind(this)}
						/>
						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="contained"
							color="primary"
						>
							<a>Check allowance</a>
						</Button>
					</form>
					<p>{this.state.allowanceValue}</p>
					<br />
					<br />
					<BacktoHomepage />
				</Container>
				<br />
			</Layout>
		);
	}
}

const Pageerc20 = () => (
	<Erc20Web3Container
		renderLoading={() => <Metamask />}
		render={({ web3, accounts, contract }) => <Dapp accounts={accounts} contract={contract} web3={web3} />}
	/>
);
export default Pageerc20;
//0x5406a5323Ea6D3dc07e97361dEEcce3E9DaB7551
