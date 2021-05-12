import Web3 from 'web3';

const resolveWeb3 = (resolve) => {
	let { web3 } = window;
	const alreadyInjected = typeof web3 !== 'undefined'; // i.e. Mist/Metamask
	//const localProvider = process.env.RWEB3; // `http://localhost:9545`

	if (alreadyInjected) {
		// Is there is an injected web3 instance?
		console.log(`Injected web3 detected.`);
		web3 = new Web3(web3.currentProvider);
		web3.eth.net.getNetworkType().then((name) => {
			if (name != 'ropsten') {
				alert('Please change MetaMask Network to Ropsten TestNet');
			}
		});
		//	ethereum.autoRefreshOnNetworkChange = false;
	} else {
		// If no injected web3 instance is detected, fallback to Ganache.
		console.log(`No web3 instance injected, using Local web3.`);
		//const provider = Web3.givenProvider
		//const provider = new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/v3/91f04e30aef442bcbfe4f8c218a9bb34');
		//const provider = new Web3.providers.HttpProvider(localProvider);
		//web3 = new Web3(provider);
	}

	resolve(web3);
};

const GetWeb3 = () =>
	new Promise((resolve) => {
		// Wait for loading completion to avoid race conditions with web3 injection timing.
		window.addEventListener(`load`, () => {
			resolveWeb3(resolve);
		});
		// If document has loaded already, try to get Web3 immediately.
		if (document.readyState === `complete`) {
			resolveWeb3(resolve);
		}
	});

export default GetWeb3;
