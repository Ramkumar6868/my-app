import React from 'react';
import StuffList from '../components/stuffList.js';
import Header from './header.js';
import Footer from './footer.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


export default class MyApp extends React.Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<Header/>
					<Switch>
					  <Route path='/farmer' component={StuffList}/>
					</Switch>
					<Footer/>
				</div>
			</BrowserRouter>
		)
	}
}