import * as actionTypes from './actionTypes.js';
import { exportsEntities } from '../server/exportsEntities.js';

export function fetchExportEntitiesList() {
	return dispatch => {
		return dispatch({type: actionTypes.RECEIVE_EXPORTS_ENTITIES, exportsEntities: exportsEntities})
    };
}

export function fetchExportEntityDetail(id){
	var exportsEntity = {};
	for(var i = 0; i <  exportsEntities.length; i++){
		if(exportsEntities[i].id == id){
			exportsEntity = {...exportsEntities[i]};
			break;
		}
	}
	return dispatch => {
		return dispatch({type: actionTypes.SHOW_EXPORTS_ENTITY, exportsEntityDetail: exportsEntity})
	};
}

export function addOrUpdateToExportsEntity(exportsEntity) {
    var exportsList = exportsEntities;
	if (exportsEntity.id) {
		for(var i = 0; i <  exportsEntities.length; i++){
			if(exportsEntities[i].id == exportsEntity.id){
				exportsEntities[i] = {...exportsEntity};
				break;
			}
		}
	} else {
    	exportsEntity.id = exportsEntities[exportsEntities.length - 1].id + 11;
    	exportsList.push(exportsEntity);
	}
    return dispatch => {
        return dispatch({type: actionTypes.ADD_EXPORTS_ENTITY, exportsEntities: exportsList})
    };
}