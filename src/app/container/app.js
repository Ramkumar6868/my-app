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
import ExportsEntitiesList from '../components/exportsEntities/exportsEntitiesList.js';
import ExportsEntityForm from '../components/exportsEntities/exportsEntityForm.js';
import ExportsList from '../components/exports/exportsLists.js';
import ExportsForm from '../components/exports/exportsForm.js';
import ExportsDetail from '../components/exports/exportsDetails.js';
import SupplyForm from '../components/supply/supplyForm.js';

export default class MyApp extends React.Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<AppNavbar/>
					<Grid container spacinng={2} className="gridContainer">
						<Grid item md={1}></Grid>
						<Grid item md={10}>
							<Switch>
								<Route exact path='/' component={Home}/>
							  	<Route exact path='/agreement_details/:id' component={AgreementDetail}/>
							  	<Route exact path='/agreement' component={Agreement}/>
							  	<Route path='/agreement/new/:id?' component={AgreementForm}/>
							  	<Route exact path='/farmer' component={farmerList}/>
							  	<Route exact path='/farmer/new/:id?' component={FarmerForm}/>
							  	<Route exact path='/delivery/:agreement_id/new/:id?' component={DeliveryForm}/>
							  	<Route exact path='/exportsEntities' component={ExportsEntitiesList}/>
							  	<Route exact path='/exportsEntities/new/:id?' component={ExportsEntityForm}/>
							  	<Route exact path='/exports' component={ExportsList}/>
							  	<Route exact path='/exports/new/:id?' component={ExportsForm}/>
							  	<Route exact path='/exports_detail/:id' component={ExportsDetail}/>
							  	<Route exact path='/supply/:exports_id/new/:id?' component={SupplyForm}/>
							</Switch>
						</Grid>
						<Grid item md={1}></Grid>
					</Grid>
					<Footer/>
				</div>
			</BrowserRouter>
		)
	}
}