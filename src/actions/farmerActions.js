import * as types from './actionTypes.js';
import {farmersList} from '../server/farmer.js';

export function fetchFarmerList() {
	return dispatch => {
		return dispatch({type: types.RECEIVE_FARMER, farmersList: farmersList})
    };
}

export function addToFarmerList(farmer) {
    farmer.id = farmersList[farmersList.length - 1].id + 11;
    console.log(farmer);
    const farmers = farmersList;
    farmers.push(farmer);
    return dispatch => {
        return dispatch({type: types.ADD_FARMER, farmersList: farmers})
    };
}