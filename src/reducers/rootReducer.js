import {combineReducers} from 'redux';
import stuff from './stuffReducer.js';
import farmer from './farmerReducer.js';

const rootReducer = combineReducers({
	stuff,
	farmer
})

export default rootReducer;