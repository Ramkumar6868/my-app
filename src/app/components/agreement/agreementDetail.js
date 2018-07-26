import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';
import DeliveryDetail from '../delivery/deliveryDetails.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';

class AgreementDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			agreementDetail: {}
		}
	}

	componentWillMount(){
		var agreementDetail = this.props.agreementActions.fetchAgreementDetail(this.props.match.params.id)
		this.setState({
			agreementDetail: agreementDetail.agreementDetail
		});
	}

	render(){
		if(this.props.agreementDetail){
		return(
			<Grid item lg={12}>
				<Grid item>
					<Paper elevation={1}>
						<Typography variant="headline" component="h1" className="center grey">
							Agreement Detail
						</Typography>
						<Typography component="div">
							<Table className="striped">
								<TableBody>
									<TableRow>
										<TableCell><b>Farmer Name</b></TableCell>
										<TableCell>{this.state.agreementDetail.farmer.firstName+ " " + this.state.agreementDetail.farmer.lastName}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Father Name</b></TableCell>
										<TableCell>{this.state.agreementDetail.farmer.fatherName}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Groundnut Type</b></TableCell>
										<TableCell>{this.state.agreementDetail.groundnutType}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Rate(per Qvintal.)</b></TableCell>
										<TableCell>{this.state.agreementDetail.rate}</TableCell>
									</TableRow>						
									<TableRow>
										<TableCell><b>Date</b></TableCell>
										<TableCell>{this.state.agreementDetail.agreementDate}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Weight(in Kg)</b></TableCell>
										<TableCell>{this.state.agreementDetail.weight}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Weight Cut(in Kg)</b></TableCell>
										<TableCell>{this.state.agreementDetail.weightCut}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Moisture(in %)</b></TableCell>
										<TableCell>{this.state.agreementDetail.moisture}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Total Payment</b></TableCell>
										<TableCell>{this.state.agreementDetail.totalPayment}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Real Payment</b></TableCell>
										<TableCell>{this.state.agreementDetail.actualTotalPayment}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Place where agreement done</b></TableCell>
										<TableCell>{this.state.agreementDetail.place}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Extra Info</b></TableCell>
										<TableCell>{this.state.agreementDetail.extraInfo}</TableCell>
									</TableRow>
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell>
											<Link to={"/agreement/new/" + this.state.agreementDetail.id}>
												<Button variant="contained" href="" className="right">Edit Agreement</Button>
											</Link>
										</TableCell>
									</TableRow>
								</TableFooter>
							</Table>
						</Typography>
					</Paper>
				</Grid>
				<Grid>
					<DeliveryDetail agreement_id={this.state.agreementDetail.id}/>
				</Grid>
			</Grid>
		)} else {
			return (
				<div>Agreement Detail Loading...</div>
			)
		}
	}
}

AgreementDetail.propTypes = {
	agreementActions: PropTypes.object,
	agreementDetail: PropTypes.object
}

function mapStateToProps(state){
	return {
		agreementDetail: state.agreementDetail
	}
}

function mapDispatchToProps(dispatch){
	return {
		agreementActions: bindActionCreators(agreementActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AgreementDetail)