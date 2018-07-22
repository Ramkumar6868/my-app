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
    var farmers = farmersList;
    farmers.push(farmer);
    return dispatch => {
        return dispatch({type: types.ADD_FARMER, farmersList: farmers})
    };
}

export function fetchFarmerDetail(id){
    var farmer = {};
    for(var i = 0; i <  farmersList.length; i++){
        if(farmersList[i].id == id){
            farmer = {...farmersList[i]};
            break;
        }
    }
    return dispatch => {
        return dispatch({type: types.SHOW_FARMER, farmerDetail: farmer})
    };
}