import initialState from './initialState.js';
import {FETCH_STUFF, RECEIVE_STUFF} from '../actions/actionTypes.js';


export default function stuff(state=initialState.stuff, action){
	let newState;
	switch(action.type){
		case FETCH_STUFF:
			console.log('FETCH_STUFF ACTION');
			return action;
		case RECEIVE_STUFF:
			newState = action.stuff;
			console.log('RECEIVE_STUFF ACTION');
			return newState;
		default:
			return state;
	}
}