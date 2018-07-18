import { RECEIVE_DELIVERIES } from '../actions/actionTypes.js';

export function deliveryDetails(state = [], action) {
	var newState = []
	switch(action.type){
		case RECEIVE_DELIVERIES:
			newState = action.deliveryDetails
			return newState;
		default:
			return state;
	}
}
