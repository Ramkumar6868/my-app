import {combineReducers} from 'redux';
import farmer from './farmerReducer.js';
import agreement from './agreementsReducer.js';
import {agreementDetail} from './agreementsReducer.js';
import {deliveryDetails, deliveryDetail} from './deliveryReducer.js';
import {farmerDetail} from './farmerReducer.js';

const rootReducer = combineReducers({
	farmer,
	agreement,
	agreementDetail,
	deliveryDetails,
	farmerDetail,
	deliveryDetail
})

export default rootReducer;