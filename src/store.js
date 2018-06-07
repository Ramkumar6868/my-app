import {createStore, combuneReducers, applyMiddleware} from 'redux';
import logger from "redux-logger"
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import getUsers from "./app/action.js";

export default createStore(combuneReducers({
		getUsers
	}),
	{},
	applyMiddleware(logger(), thunk, promise())
)