const initialState = {
	activeItem: 'home' 
};

export default function menu(state = initialState, action) {
	switch (action.type) {
	  case 'NEW_PAGE':
		return Object.assign({}, state, {activeItem: action.text});
	  default:
		return state
	}
}