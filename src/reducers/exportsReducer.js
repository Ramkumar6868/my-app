import { RECEIVE_EXPORTS, SHOW_EXPORTS, ADD_EXPORTS } from '../actions/actionTypes.js';

export function exports(state=[], action) {
	var newState = []
	switch(action.type){
		case RECEIVE_EXPORTS:
			newState = action.exportsList;
			return newState;
		case ADD_EXPORTS:
			newState = action.exportsList;
			return newState;
		default:
			return state;
	}
}

export function exportsDetail(state = {}, action){
	var newState = {};
	switch(action.type){
		case SHOW_EXPORTS:
			newState = action.exportsDetail;
			return newState;
		default:
			return state;
	}
}