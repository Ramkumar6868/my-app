import * as types from './actionTypes.js';
import {farmersList} from '../server/farmer.js';

export function fetchFarmerList() {
	return dispatch => {
		return dispatch({type: types.RECEIVE_FARMER, farmersList: farmersList})
    };
}