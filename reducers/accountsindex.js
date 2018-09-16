import Providers, { SourceEnum } from '../ethereum/providers';

const initialState = {
	loading: false, 
	accounts: [],
	selectedAccount: null
};

export default function accountsindex(state = initialState, action) {
	switch (action.type) {
	  case 'IS_LOADING':
		return Object.assign({}, state, {loading: true});
	  case 'LOADED':
		return Object.assign({}, state, {loading: false});
	  case 'SET_ACCOUNTS':
		return Object.assign({}, state, {accounts: action.text, loading: false});
	  case 'SET_SIGNER':
		console.log('accountsindex SET_SIGNER');
		return Object.assign({}, state, {accounts: [], loading: true});
	  case 'SELECT_ACCOUNT':
		console.log('accountsindex SELECT_ACCOUNT', action.text);
		sessionStorage.setItem("selectedAccount", action.text);
		return Object.assign({}, state, {selectedAccount: action.text});
	  default:
		return state
	}
}