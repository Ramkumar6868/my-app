import { RECEIVE_DELIVERIES } from './actionTypes.js';
import {deliveryDetails} from '../server/deliveries.js';


export function getDeliveryDetails(agreement_id){
	var list = [];
	for(var index = 0; index < deliveryDetails.length; index++){
		if(agreement_id == deliveryDetails[index].agreement_id){
			list.push(deliveryDetails[index]);
		}
	}
	return dispatch => {
		return dispatch({type: RECEIVE_DELIVERIES, deliveryDetails: list})
	}
}