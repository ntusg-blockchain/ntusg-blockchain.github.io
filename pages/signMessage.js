import React from 'react';
import Link from '@material-ui/core/Link';
import Web3Container from '../lib/Web3Container';
import { Button, Typography, TextField, CircularProgress, Card, CardContent } from '@material-ui/core';
import Layout from '../Components/Layout';
import BacktoHomepage from '../Components/BacktoHomepage';

import Metamask from '../Components/Metamask';

class SignMessage extends React.Component {
	state = {
		value: undefined,
		setvalue: undefined,
		setvalue2: undefined,
		ethBalance: undefined,
		metamaskEnabled: false,
		loading: false,
		loading2: false,
		web3: '',
		transactionURL: '',
		useraccount: '',
		result: '',
		r: '',
		s: '',
		v: ''
	};

	async componentDidMount() {
		try {
			const { accounts, contract, web3 } = this.props;
			//console.log(accounts[0]);
			this.setState({ useraccount: accounts[0] });
			const balanceInWei = await web3.eth.getBalance(accounts[0]);
			this.setState({ ethBalance: balanceInWei / 1e18 });
			this.setState({ web3 });
		} catch (error) {
			//	alert(`Click to enable MetaMask.`);
			console.log(error);
		}
	}

	storeValue = async () => {
		// sign value
		event.preventDefault();
		this.setState({ loading: true });
		const { web3 } = this.props;
		try {
			let signature2 = await web3.eth.personal.sign(this.state.setvalue, this.state.useraccount);
			let signature = signature2.substr(2); //remove 0x
			const r = '0x' + signature.slice(0, 64);
			const s = '0x' + signature.slice(64, 128);
			const v = '0x' + signature.slice(128, 130);
			//alert(parseInt(v, 16)); check if 27 or 28.
			this.setState({ r });
			this.setState({ s });
			this.setState({ v });
			this.setState({ transactionURL: signature2 });
		} catch (err) {
			alert(`Error`);
			this.setState({ loading: false });

			return;
		}

		//	alert(`Signature ${this.state.transactionURL}`);
		this.setState({ loading: false });
	};

	recoverAddress = async () => {
		event.preventDefault();
		this.setState({ loading2: true });
		const { web3 } = this.props;
		try {
			//console.log(this.state.setvalue2);
			//console.log(this.state.useraccount2);
			let signature = await web3.eth.personal.ecRecover(this.state.setvalue2, this.state.transactionURL);
			let result = await web3.utils.toChecksumAddress(signature);
			this.setState({ result: result });
		} catch (err) {
			alert(`Error`);
			this.setState({ loading2: false });
			return;
		}

		//alert(`Signature ${this.state.result}`);
		this.setState({ loading2: false });
	};

	handleValue(event) {
		this.setState({ setvalue: event.target.value });
	}
	handleValue2(event) {
		this.setState({ setvalue2: event.target.value });
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
				<div>
					<Typography style={{ paddingBottom: '30px' }} variant="h4" color="textPrimary" gutterBottom>
						Message Signing with Private key
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
					<br />

					<form style={{ width: '100%' }} onSubmit={this.storeValue}>
						<p>Enter Message to sign : </p>
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
							{!this.state.loading && <a> Sign with private key </a>}
							{this.state.loading && <CircularProgress color="secondary" thickness={6} size={24} />}
						</Button>
					</form>
					<br />
					{this.state.transactionURL && (
						<Typography style={{ paddingBottom: '30px' }} variant="subtitle1" gutterBottom>
							Hash :{' '}
							<p
								style={{
									overflowWrap: 'break-word'
								}}
							>
								{' '}
								{this.state.transactionURL}
							</p>
							<br />
							r : {this.state.r}
							<br />
							s : {this.state.s}
							<br />
							v : {this.state.v}
						</Typography>
					)}
					<br />

					<form style={{ width: '100%' }} onSubmit={this.recoverAddress}>
						<p>Recover Public address.</p>
						<TextField
							id="standard-basic"
							label="Enter Value"
							name="value"
							setvalue={this.state.setvalue2}
							onChange={this.handleValue2.bind(this)}
						/>
						<Button
							type="submit"
							style={{ float: 'right', marginTop: '20px' }}
							variant="contained"
							color="primary"
							disabled={this.state.loading2}
						>
							{!this.state.loading2 && <a> Recover with Message</a>}
							{this.state.loading2 && <CircularProgress color="primary" thickness={6} size={24} />}
						</Button>
					</form>

					<br />
					<br />
					<Card variant="outlined">
						<CardContent>
							<Typography variant="h6" color="textPrimary">
								Address that sign the message : {this.state.result}
							</Typography>
						</CardContent>
					</Card>
					{this.state.useraccount == this.state.result && (
						<p> Congrats! , you are the original signer of the signature ! </p>
					)}
					<br />
					<br />
					<BacktoHomepage />
				</div>
			</Layout>
		);
	}
}

const SignMessagepage = () => (
	<Web3Container
		renderLoading={() => <Metamask />}
		render={({ web3, accounts, contract }) => <SignMessage accounts={accounts} contract={contract} web3={web3} />}
	/>
);
export default SignMessagepage;
