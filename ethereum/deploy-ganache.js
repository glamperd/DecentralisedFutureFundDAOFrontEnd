const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledBTTSTokenI = require('../../build/BTTSTokenInterface.json');
const compiledDff = require('../../build/DFFDAO.json');

const ganache = require('ganache-cli');
const provider = ganache.provider();

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account ', accounts[0]);
	
	const result = await new web3.eth.Contract(JSON.parse(
			compiledBTTSTokenI.interface)
		)
		.deploy({ data: compiledBTTSTokenI.bytecode })
		.send({ gas: '1000000', from: accounts[0] });

	//console.log(interface);
	console.log('BTTSTokenInterface contract deployed to: ', result.options.address);

	result = await new web3.eth.Contract(JSON.parse(
			compiledDff.interface)
		)
		.deploy({ data: compiledDff.bytecode })
		.send({ gas: '1000000', from: accounts[0] });
	
	//console.log(interface);
	console.log('DFFDAO Contract deployed to: ', result.options.address);
};
deploy();
