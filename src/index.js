import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from "./store/configStore.js";

import MyApp from './app/container/app.js';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<MyApp/>
	</Provider>,
	document.getElementById('root')
)