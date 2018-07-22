import { RECEIVE_DELIVERIES, SHOW_DELIVERY, ADD_DELIVERY } from '../actions/actionTypes.js';

export function deliveryDetails(state = [], action) {
	var newState = []
	switch(action.type){
		case RECEIVE_DELIVERIES:
			newState = action.deliveryDetails
			return newState;
		case ADD_DELIVERY:
			newState = action.deliveryDetails
			return newState
		default:
			return state;
	}
}


export function deliveryDetail(state = {}, action) {
	var newState = []
	switch(action.type){
		case SHOW_DELIVERY:
			newState = action.deliveryDetail
			return newState;
		default:
			return state;
	}
}