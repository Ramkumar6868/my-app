import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';

class AgreementDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			agreementDetail: this.props.agreementDetail[0]
		}
		// console.log(this.props.agreementDetail)
		this.handleAgreementDetailCloseModal = this.handleAgreementDetailCloseModal.bind(this);
	}

	handleAgreementDetailCloseModal(isEditAgreementDetail){
		this.props.handleAgreementDetailCloseModal(isEditAgreementDetail);
	}

	render(){
		return(
			<div className="container">
				<h2 className="bg-secondary text-center rounded-top">Agreement Detail</h2>
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
							<td><b>Weigth(in Kg)</b></td>
							<td>{this.state.agreementDetail.weigth}</td>
						</tr>
						<tr>
							<td><b>Weigth Cut(in Kg)</b></td>
							<td>{this.state.agreementDetail.weigthCut}</td>
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
				<button onClick={() => this.handleAgreementDetailCloseModal(false)}>close</button>
				<button className="btn btn-primary float-right" onClick={() => this.handleAgreementDetailCloseModal(true)}>Edit</button>
			</div>
		)
	}
}

AgreementDetail.propTypes = {
	agreementActions: PropTypes.object,
	agreementDetail: PropTypes.array
}

function mapStateToProps(state){
	return {
		agreementDetail: state.agreement
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