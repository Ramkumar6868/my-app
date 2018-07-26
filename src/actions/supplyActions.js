import { RECEIVE_SUPPLY, SHOW_SUPPLY, ADD_SUPPLY } from './actionTypes.js';
import {suppliesList} from '../server/supply.js';


export function getsupplyDetails(exports_id){
	var list = [];
	for(var index = 0; index < suppliesList.length; index++){
		if(exports_id == suppliesList[index].exports_id){
			list.push(suppliesList[index]);
		}
	}
	return dispatch => {
		return dispatch({type: RECEIVE_SUPPLY, supplyDetails: list})
	}
}

export function getSupplyDetail(supply_id){
	var supplyDetail = {};
	for(var index = 0; index < suppliesList.length; index++){
		if(supply_id == suppliesList[index].id){
			supplyDetail = {...suppliesList[index]};
		}
	}
	return dispatch => {
		return dispatch({type: SHOW_SUPPLY, supplyDetail: supplyDetail})
	}
}


export function addOrUpdateToSupplyList(supply) {
    var suppliesLists = suppliesList;
	if (supply.id) {
		var tmp = supply.map((sp,index) => sp.id == supply.id ? supply : sp);
		suppliesLists = tmp;
	} else {
    	supply.id = suppliesList[suppliesList.length - 1].id + 11;
    	suppliesLists.push(supply);
	}
    return dispatch => {
        return dispatch({type: ADD_SUPPLY, supplyDetails: suppliesLists})
    };
}


q