import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import AgreementDetail from './agreementDetail.js';

const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		overflow: 'scroll',
		height: '500px',
		width: '800px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};


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
				<button className="btn btn-primary" onClick={() => props.handleAgreementOpenModal(props.agreement)}>See Detail</button>
			</td>
		</tr>
	)
}

class AgreementsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			openAgreementModal: false,
			agreementDetail: {}
		};

		this.handleAgreementOpenModal = this.handleAgreementOpenModal.bind(this);
		this.handleAgreementCloseModal = this.handleAgreementCloseModal.bind(this);
	}

	handleAgreementOpenModal(agreementDetail){
		this.setState({
			openAgreementModal: true,
			agreementDetail: agreementDetail
		});
	}

	handleAgreementCloseModal(){
		this.setState({
			openAgreementModal: false,
			agreementDetail: {}
		});
	}

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
										<RenderTableRaw key={agreement.id} agreement={agreement} handleAgreementOpenModal={(agreementDetail)=>this.handleAgreementOpenModal(agreementDetail)}/>
									);
								})
							}
						</tbody>
					</table>

					<Modal
						isOpen={this.state.openAgreementModal}
						style={modalStyle}
						contentLabel="Agreement Detail"
						ariaHideApp={false}
					>
						<AgreementDetail agreementDetail={this.state.agreementDetail} handleAgreementCloseModal={() => this.handleAgreementCloseModal() }/>
					</Modal>
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