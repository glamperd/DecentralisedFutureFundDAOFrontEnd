const initialState = {
	selectedSigner: 'RPC'
};

export default function providers(state = initialState, action) {
	switch (action.type) {
	  case 'SET_SIGNER':
		  console.log('providers actions', action);
		return Object.assign({}, state, {selectedSigner: action.text});
	  default:
		return state
	}
}