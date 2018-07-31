import * as actionTypes from './actionTypes.js';
import {exportsList} from '../server/exports.js';

export function fetchExportsList() {
	console.log(exportsList)
	return dispatch => {
		return dispatch({type: actionTypes.RECEIVE_EXPORTS, exportsList: exportsList})
    };
}

export function fetchExportsDetail(id){
	var exportsDetail = {};
	for(var i = 0; i <  exportsList.length; i++){
		if(exportsList[i].id == id){
			exportsDetail = {...exportsList[i]};
			break;
		}
	}
	return dispatch => {
		return dispatch({type: actionTypes.SHOW_EXPORTS, exportsDetail: exportsDetail})
	};
}

export function addOrUpdateToExports(exportsDetail) {
    var exportsListLocal = exportsList;
	if (exportsDetail.id) {
		for(var i = 0; i <  exportsListLocal.length; i++){
			if(exportsListLocal[i].id == exportsDetail.id){
				exportsListLocal[i] = {...exportsDetail};
				break;
			}
		}
	} else {
    	exportsDetail.id = exportsListLocal[exportsListLocal.length - 1].id + 11;
    	exportsListLocal.push(exportsDetail);
	}
    return dispatch => {
        return dispatch({type: actionTypes.ADD_EXPORTS, exportsList: exportsListLocal})
    };
}