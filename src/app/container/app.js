import React from 'react';
import Header from './header.js';
import Footer from './footer.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StuffList from '../components/stuffList.js';
import Home from '../components/home.js';
import Farmer from '../components/farmer/farmer.js';
import Agreement from '../components/agreement/agreement.js';

export default class MyApp extends React.Component {
	render() {
		return(
			<BrowserRouter>
				<div>
				<header>
					<Header/>
				</header>
				<div className="container-fluid paddingBottom">
					<div className="row">
						<div className="col-xl-1"></div>
						<div className="col-xl-10">
							<Switch>
								<Route exact path='/' component={Home}/>
							  	<Route path='/farmer' component={Farmer}/>
							  	<Route path='/agreement' component={Agreement}/>
							  	<Route path='/agreement/:id' component={Agreement}/>
							</Switch>
						</div>
						<div className="col-xl-1"></div>
					</div>
				</div>
					<footer>
						<Footer/>
					</footer>
				</div>
			</BrowserRouter>
		)
	}
}