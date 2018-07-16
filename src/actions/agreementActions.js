import * as actionTypes from './actionTypes.js';
import {agreementsList} from '../server/agreement.js';


export function fetchAgreementList(){
	return dispatch => {
		return dispatch({type: actionTypes.RECEIVE_AGREEMENT, agreementsList: agreementsList})
	};
}


export function addOrUpdateToAgreementList(agreement) {
    var agreements = agreementsList;
	if (agreement.id) {
		var tmp = agreements.map((agr,index) => agr.id == agreement.id ? agreement : agr);
		agreements = tmp;
    	console.log(agreements)
	} else {
    	agreement.id = agreementsList[agreementsList.length - 1].id + 11;
    	agreements.push(agreement);
	}
    console.log(agreement);
    return dispatch => {
        return dispatch({type: actionTypes.ADD_AGREEMENT, agreementsList: agreements})
    };
}