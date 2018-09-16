import web3 from './web3';
import BttsToken from './build/BTTSTokenFactory.json';

export default (address) => {
	return new web3.eth.Contract(
		JSON.parse(BttsToken.contracts['BTTSTokenFactory.sol:BTTSToken'].abi),
		address
	);
}
