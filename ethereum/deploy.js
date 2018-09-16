const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledDff = require('./build/DecentralisedFutureFundDAO.json');

const provider = new HDWalletProvider(
		'end video shallow orphan shaft camp hedgehog ostrich alter urge hybrid embark',
		'https://rinkeby.infura.io/LOJvlLskPhnXbG2UbbkO'
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account ', accounts[0]);
	
	const result = await new web3.eth.Contract(JSON.parse(
			compiledDff.interface)
		)
		.deploy({ data: compiledDff.bytecode })
		.send({ gas: '1000000', from: accounts[0] });
	
	//console.log(interface);
	console.log('Contract deployed to: ', result.options.address);
};
deploy();
