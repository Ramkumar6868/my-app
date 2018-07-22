import { farmersList } from './initialState.js';
import {FETCH_FARMER, RECEIVE_FARMER, ADD_FARMER, SHOW_FARMER} from '../actions/actionTypes.js';


export default function farmer(state=farmersList, action){
	let newState;
	switch(action.type){
		case FETCH_FARMER:
			console.log('FETCH_FARMER ACTION');
			return action;
		case RECEIVE_FARMER:
			newState = action.farmersList;
			console.log('RECEIVE_FARMER ACTION', action.farmersList);
			return newState;
		case ADD_FARMER:
			newState = action.farmersList;
			console.log('ADD_FARMER ACTION', action.farmersList);
			return newState;
		default:
			return state;
	}
}

export function farmerDetail(state={}, action){
	let newState;
	switch(action.type){
		case SHOW_FARMER:
			newState = action.farmerDetail
			console.log(action.farmerDetail);
			return newState
		default:
			return state;
	}
}