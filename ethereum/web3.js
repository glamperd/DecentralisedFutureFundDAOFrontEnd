import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js';
import Personal from 'web3-eth-personal';
//import SourceEnum from './providers';
//import ganache from 'ganache-cli';
import FetchSubprovider from "web3-provider-engine/subproviders/fetch";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import createLedgerSubprovider from "@ledgerhq/web3-subprovider";

//console.log(Web3);

// For local geth running in --dev mode
//let web3 = new Web3(engine);
//}
const SourceEnum = {
		METAMASK: "MetaMask",
		MIST: "Mist",
		LEDGER: "Ledger",
		JSONRPC: "RPC"
};

export let wallets = {};
// Get injected web3 provider if it's there.
if (typeof window !== 'undefined' && window.web3.currentProvider !== 'undefined') {
	var w = new Web3(window.web3.currentProvider);
	if (w.isMetaMask) {
	    wallets[SourceEnum.METAMASK] = w;
	} else if (w.isMist) {
		wallets[SourceEnum.MIST] = w;
	}
} 

//Set up ledger connection ??? Is this the right place?
//TODO - move code here from providers
const rpcUrl = "http://localhost:8545";
const networkId = 1337;

let engine = new ProviderEngine();
const getTransport = () => TransportU2F.create();
const ledger = createLedgerSubprovider(getTransport, {
    networkId,
    accountsLength: 5
  });
engine.addProvider(ledger);
engine.addProvider(new FetchSubprovider({ rpcUrl }));
engine.start();
wallets[SourceEnum.LEDGER] = new Web3(engine);

// Set up RPC connection
engine = new ProviderEngine();
const provider = new RpcSubprovider(
		{ rpcUrl: 'http://localhost:8646', }
	);
engine.addProvider(provider);
engine.start();
wallets[SourceEnum.JSONRPC] = new Web3(engine);


// Default provider is RPC
let web3 = wallets[SourceEnum.JSONRPC];

export const personal = new Personal(wallets[SourceEnum.JSONRPC]);
console.log('init web3 @', typeof personal);

//console.log('wallets', wallets);
export default web3;
