import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';
import DeliveryDetail from '../delivery/deliveryDetails.js';

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
			<div>
				<h2 className="bg-secondary text-center rounded-top">Agreement Detail</h2>
				<div className="row">	
					<table className="table table-striped table-bordered">
						<tbody>
							<tr>
								<td><b>Farmer Name</b></td>
								<td>{this.state.agreementDetail.farmer.firstName+ " " + this.state.agreementDetail.farmer.lastName}</td>
							</tr>
							<tr>
								<td><b>Father Name</b></td>
								<td>{this.state.agreementDetail.farmer.fatherName}</td>
							</tr>
							<tr>
								<td><b>Groundnut Type</b></td>
								<td>{this.state.agreementDetail.groundnutType}</td>
							</tr>
							<tr>
								<td><b>Rate(per Qvintal.)</b></td>
								<td>{this.state.agreementDetail.rate}</td>
							</tr>						
							<tr>
								<td><b>Date</b></td>
								<td>{this.state.agreementDetail.agreementDate}</td>
							</tr>
							<tr>
								<td><b>Weight(in Kg)</b></td>
								<td>{this.state.agreementDetail.weight}</td>
							</tr>
							<tr>
								<td><b>Weight Cut(in Kg)</b></td>
								<td>{this.state.agreementDetail.weightCut}</td>
							</tr>
							<tr>
								<td><b>Moisture(in %)</b></td>
								<td>{this.state.agreementDetail.moisture}</td>
							</tr>
							<tr>
								<td><b>Total Payment</b></td>
								<td>{this.state.agreementDetail.totalPayment}</td>
							</tr>
							<tr>
								<td><b>Real Payment</b></td>
								<td>{this.state.agreementDetail.actualTotalPayment}</td>
							</tr>
							<tr>
								<td><b>Place where agreement done</b></td>
								<td>{this.state.agreementDetail.place}</td>
							</tr>
							<tr>
								<td><b>Extra Info</b></td>
								<td>{this.state.agreementDetail.extraInfo}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="row">
					<button className="btn btn-primary float-right">Edit Agreement</button>
				</div>
				<div className="row">
					<DeliveryDetail agreement_id={this.state.agreementDetail.id}/>
				</div>
			</div>
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