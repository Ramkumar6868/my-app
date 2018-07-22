import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppNavbar from './header.js';
import Footer from './footer.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/home.js';
import FarmerForm from '../components/farmer/farmerForm.js';
import farmerList from '../components/farmer/farmerList.js';
import Agreement from '../components/agreement/agreement.js';
import AgreementDetail from '../components/agreement/agreementDetail.js';
import AgreementForm from '../components/agreement/agreementForm.js';
import DeliveryForm from '../components/delivery/deliveryForm.js';

export default class MyApp extends React.Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<AppNavbar/>
					<Grid container spacinng={2} className="gridContainer">
						<Grid item xs={1}></Grid>
						<Grid item xs={10}>
							<Switch>
								<Route exact path='/' component={Home}/>
							  	<Route exact path='/agreement_details/:id' component={AgreementDetail}/>
							  	<Route exact path='/agreement' component={Agreement}/>
							  	<Route path='/agreement/new/:id?' component={AgreementForm}/>
							  	<Route exact path='/farmer' component={farmerList}/>
							  	<Route exact path='/farmer/new/:id?' component={FarmerForm}/>
							  	<Route exact path='/delivery/:agreement_id/new/:id?' component={DeliveryForm}/>
							</Switch>
						</Grid>
						<Grid item xs={1}></Grid>
					</Grid>
					<Footer/>
				</div>
			</BrowserRouter>
		)
	}
}