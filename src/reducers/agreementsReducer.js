import { RECEIVE_AGREEMENT, ADD_AGREEMENT } from '../actions/actionTypes.js';
import {agreementsList} from './initialState.js';

export default function agreement(state=agreementsList, action){
	let newState;
	switch(action.type){
		case RECEIVE_AGREEMENT:
			newState = action.agreementsList;
			return newState;
		case ADD_AGREEMENT:
			newState = action.agreementsList
			console.log(action.agreementsList);
			return newState
		default:
			return state;
	}
}