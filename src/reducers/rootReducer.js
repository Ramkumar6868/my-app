import {combineReducers} from 'redux';
import farmer from './farmerReducer.js';
import agreement from './agreementsReducer.js';
import {agreementDetail} from './agreementsReducer.js';
import {deliveryDetails, deliveryDetail} from './deliveryReducer.js';
import {farmerDetail} from './farmerReducer.js';
import { exportsEntities, exportsEntity } from './exportsEntitiesReducer.js';
import { exports, exportsDetail } from './exportsReducer.js';

const rootReducer = combineReducers({
	farmer,
	agreement,
	agreementDetail,
	deliveryDetails,
	farmerDetail,
	deliveryDetail,
	exportsEntities,
	exportsEntity,
	exports,
	exportsDetail
})

export default rootReducer;