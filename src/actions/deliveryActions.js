import { RECEIVE_DELIVERIES, SHOW_DELIVERY, ADD_DELIVERY } from './actionTypes.js';
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

export function getDeliveryDetail(delivery_id){
	var deliveryDetail = {};
	for(var index = 0; index < deliveryDetails.length; index++){
		if(delivery_id == deliveryDetails[index].id){
			deliveryDetail = {...deliveryDetails[index]};
		}
	}
	return dispatch => {
		return dispatch({type: SHOW_DELIVERY, deliveryDetail: deliveryDetail})
	}
}


export function addOrUpdateToDeliveryList(delivery) {
    var deliveryLists = deliveryDetails;
	if (delivery.id) {
		var tmp = delivery.map((dl,index) => dl.id == delivery.id ? delivery : dl);
		deliveryLists = tmp;
	} else {
    	delivery.id = deliveryDetails[deliveryDetails.length - 1].id + 11;
    	deliveryLists.push(delivery);
	}
    return dispatch => {
        return dispatch({type: ADD_DELIVERY, deliveryDetails: deliveryLists})
    };
}