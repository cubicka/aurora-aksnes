const initialState = {
	showSignIn: true
}

function Reducer(state = initialState, action) {
	switch(action.type) {
		case "auth/showSignIn": {
			return {showSignIn: true}
		}

		case "auth/hideSignIn": {
			return {showSignIn: false}
		}

		default: return state;
	}
}

export default Reducer
