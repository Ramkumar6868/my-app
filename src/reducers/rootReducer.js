import {combineReducers} from 'redux';
import stuff from './stuffReducer.js';
import farmer from './farmerReducer.js';
import agreement from './agreementsReducer.js';

const rootReducer = combineReducers({
	stuff,
	farmer,
	agreement
})

export default rootReducer;