import * as actionTypes from './actionTypes.js';
import {agreementsList} from '../server/agreement.js';


export function fetchAgreementList(){
	return dispatch => {
		return dispatch({type: actionTypes.RECEIVE_AGREEMENT, agreementsList: agreementsList})
	};
}