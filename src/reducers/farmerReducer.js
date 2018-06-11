import { farmersList } from './initialState.js';
import {FETCH_FARMER, RECEIVE_FARMER} from '../actions/actionTypes.js';


export default function farmer(state=farmersList, action){
	let newState;
	switch(action.type){
		case FETCH_FARMER:
			console.log('FETCH_FARMER ACTION');
			return action;
		case RECEIVE_FARMER:
			newState = action.farmersList;
			console.log('RECEIVE_STUFF ACTION', action.farmersList);
			return newState;
		default:
			return state;
	}
}