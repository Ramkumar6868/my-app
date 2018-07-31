import { RECEIVE_EXPORTS_ENTITIES, SHOW_EXPORTS_ENTITY, ADD_EXPORTS_ENTITY } from '../actions/actionTypes.js';
import {exportsEntitiesList} from './initialState.js';

export function exportsEntities(state=exportsEntitiesList, action) {
	var newState = []
	switch(action.type){
		case RECEIVE_EXPORTS_ENTITIES:
			newState = action.exportsEntities;
			return newState;
		case ADD_EXPORTS_ENTITY:
			newState = action.exportsEntities;
			return newState;
		default:
			return state;
	}
}

export function exportsEntity(state = {}, action){
	var newState = {};
	switch(action.type){
		case SHOW_EXPORTS_ENTITY:
			newState = action.exportsEntityDetail;
			return newState;
		default:
			return state;
	}
}