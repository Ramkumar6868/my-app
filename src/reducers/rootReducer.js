import {combineReducers} from 'redux';
import farmer from './farmerReducer.js';
import agreement from './agreementsReducer.js';
import {agreementDetail} from './agreementsReducer.js';
import {deliveryDetails} from './deliveryReducer.js';

const rootReducer = combineReducers({
	farmer,
	agreement,
	agreementDetail,
	deliveryDetails
})

export default rootReducer;