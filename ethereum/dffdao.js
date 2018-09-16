import web3 from './web3';
import DFFDAO from './build/DecentralisedFutureFundDAO.json';

const instance = new web3.eth.Contract(
		JSON.parse(DFFDAO.contracts['DecentralisedFutureFundDAO.sol:DFFDAO'].abi),
		'0xf4441f10804b35b13bad1e664e32237773276253'
);

console.log('dffdao instance'); //, typeof instance);

export default instance;