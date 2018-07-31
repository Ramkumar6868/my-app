import { RECEIVE_SUPPLY, SHOW_SUPPLY, ADD_SUPPLY } from '../actions/actionTypes.js';

export function supplyDetails(state = [], action) {
	var newState = []
	switch(action.type){
		case RECEIVE_SUPPLY:
			newState = action.supplyDetails
			return newState;
		case ADD_SUPPLY:
			newState = action.supplyDetails;
			console.log(newState)
			return newState
		default:
			return state;
	}
}


export function supplyDetail(state = {}, action) {
	var newState = []
	switch(action.type){
		case SHOW_SUPPLY:
			newState = action.supplyDetail
			return newState;
		default:
			return state;
	}
}