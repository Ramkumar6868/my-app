import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// const modalStyle = {
// 	content: {
// 		top: '50%',
// 		left: '50%',
// 		right: 'auto',
// 		bottom: 'auto',
// 		overflow: 'scroll',
// 		height: '500px',
// 		width: '800px',
// 		marginRight: '-50%',
// 		transform: 'translate(-50%, -50%)'
// 	}
// };


function RenderTableRaw(props){
	return(
		<tr>
			<td>{props.agreement.farmer.firstName + " " + props.agreement.farmer.lastName}</td>
			<td>{props.agreement.farmer.fatherName}</td>
			<td>{props.agreement.farmer.village}</td>
			<td>{props.agreement.groundnutType}</td>
			<td>{props.agreement.rate}</td>
			<td>{props.agreement.extraInfo}</td>
			<td>
				
				<Link to={"/agreement_details/" + props.agreement.id} >
					<button className="btn btn-primary">Details</button>
				</Link>
				<Link to={"/delivery/new/" + props.agreement.id} >
					<button className="btn btn-primary">New Delivary</button>
				</Link>
			</td>
		</tr>
	)
}

class AgreementsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {};

		// this.handleAgreementDetailOpenModal = this.handleAgreementDetailOpenModal.bind(this);
		// this.handleAgreementDetailCloseModal = this.handleAgreementDetailCloseModal.bind(this);
		// this.handleAgreementFormOpenModal = this.handleAgreementFormOpenModal.bind(this);
		// this.handleAgreementFormCloseModal = this.handleAgreementFormCloseModal.bind(this);
	}

	// resetAgreementDetails(){
	// 	var agreementDetail = {
	// 		farmer: {},
	// 		groundnutType: "khalo",
	// 		rate: 0.00,
	// 		weight: 0.00,
	// 		groundnutPercente: 0.00,
	// 		weightCut: 0.00,
	// 		actualTotalPayment: 0.00,
	// 		totalPayment: 0.00,
	// 		moisture: 0.00,
	// 		place: "",
	// 		agreementDate: "",
	// 		extraInfo: ""
	// 	}
	// 	this.setState({
	// 		agreementDetail: agreementDetail
	// 	});
	// }

	// createAgreement(){
	// 	this.resetAgreementDetails();
	// 	this.handleAgreementFormOpenModal(false);
	// }

	// handleAgreementDetailCloseModal(isEditAgreementDetail){
	// 	if(isEditAgreementDetail){
	// 		this.handleAgreementFormOpenModal();
	// 	}
	// 	this.setState({
	// 		openAgreementDetailModal: false,
	// 	});
	// }

	// handleAgreementFormCloseModal(){
	// 	this.setState({
	// 		openAgreementFormModal: false
	// 	});
	// }

	// handleAgreementFormOpenModal(isEditAgreementDetail){
	// 	this.setState({
	// 		openAgreementFormModal: true,
	// 		isEditAgreementDetail: isEditAgreementDetail
	// 	});
	// }

	componentWillMount(){
		this.props.agreementActions.fetchAgreementList();
	}



	render(){
		if(!this.props.agreementsList){
			return(
				<div>
					Loading Agreements List...
				</div>
			);
		} else{
			return(

				<div>
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Farmer Name</th>
								<th>Father Name</th>
								<th>Village</th>
								<th>Groundnut Type</th>
								<th>Rate</th>
								<th>Extra Information</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								// console.log(this.props.agreementsList)
								this.props.agreementsList.map((agreement, index) =>{
									return(
										<RenderTableRaw key={agreement.id} agreement={agreement}/>
									);
								})
							}
						</tbody>
					</table>
					<div>
		            	<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#agreementNew">
		            		<Link to="agreement/new">
								Entry New Agreement
							</Link>
						</button>
		            </div>
				</div>
			)
		}
	}
}

AgreementsList.propTypes = {
	agreementActions: PropTypes.object,
	agreementsList: PropTypes.array
}

function mapStateToProps(state){
	return{
		agreementsList: state.agreement
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
)(AgreementsList);