import Providers, { SourceEnum } from '../ethereum/providers';

export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
function requestAccounts(signer) {
	return {
		type: REQUEST_ACCOUNTS,
		signer
	}
}

export const SET_ACCOUNTS = 'SET_ACCOUNTS';
function accountsReceived(accounts) {
	console.log('accountsReceived enter', accounts);
	return {
		type: SET_ACCOUNTS,
		text: accounts
	}
}

/*
 * Gets accounts from the selected web3 provider.
 * The call is asynchronous. When returned, the 
 * accounts list will be handled by the accountsReceived action.
 */
export function getAccounts(signer) {
	
	return function (dispatch) {
		//dispatch(requestAccounts(signer));
		
		var providers = new Providers(signer);
		console.log('getAccounts() ', signer); 
		var w3 = providers.getWallet();
		//console.log('got wallet:', typeof w3.eth);
		var accounts;
		if (typeof w3 !== 'undefined') {
		  if (signer !== 'Ledger') {
			console.log('getAccounts, not Ledger');
			return w3.eth.getAccounts()
				.then(
				     (response, error) => {
				    	if (error) {
				    		console.log('error in getAccounts()');
				    		return;
				    	}
					    console.log('get accounts resolved', response);
					    return response;
				 })
				 .then((accounts) =>
					dispatch(accountsReceived(accounts))
				 );
		  } else {
			  // Ledger
			  console.log('getAccounts, Ledger');
			  providers.ledgerAddress().then(a =>
				  dispatch(accountsReceived([a]))
			  );
		  }
	    }
	}
}
