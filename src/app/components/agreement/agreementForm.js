import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as farmerActions from '../../../actions/farmerActions.js';

class AgreementForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			agreementFormDetail: {...this.props.agreementFormDetail},
			farmerSelectId: 0,
			isEditAgreementDetail: this.props.isEditAgreementDetail

		}
		// console.log(this.state.agreementFormDetail)
		this.submitAgreementForm = this.submitAgreementForm.bind(this);
		this.selectFarmer = this.selectFarmer.bind(this);
		this.handleAgreementFormCloseModal = this.handleAgreementFormCloseModal.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}


	componentWillMount(){
		this.props.farmerActions.fetchFarmerList();
		if(this.props.agreementFormDetail.farmer && this.props.agreementFormDetail.farmer.id){
			this.setState({
				farmerSelectId: this.props.agreementFormDetail.farmer.id
			});
		}
	}
	componentDidMount(){
		console.log(this.props.farmersList)
	}

	submitAgreementForm(event){
		event.preventDefault();
		console.log(this.state.agreementFormDetail)
		this.props.agreementActions.addOrUpdateToAgreementList(this.state.agreementFormDetail)
		this.props.handleAgreementFormCloseModal();
	}

	handleAgreementFormCloseModal(event){
		event.preventDefault();
		this.props.handleAgreementFormCloseModal();
	}

	handleOnChange(event){
		event.preventDefault();
		const agreementFormDetail = this.state.agreementFormDetail;
		agreementFormDetail[event.target.name] = event.target.value;
		this.setState({
			agreementFormDetail: agreementFormDetail
		});
		console.log(this.state.agreementFormDetail)
	}

	selectFarmer(selectedOption){
		const agreementFormDetail = this.state.agreementFormDetail;
		agreementFormDetail[selectedOption.target.name] = this.props.farmersList[selectedOption.target.value];
		this.setState({
			agreementFormDetail: agreementFormDetail,
			farmerSelectId: agreementFormDetail.farmer.id
		});
		console.log(this.state.agreementFormDetail)
	}

	render(){
		return(
			<div>
				<h2 className="bg-secondary text-center rounded-top">Create/Update Agreement</h2>
				<form onSubmit={this.submitAgreementForm}>
					<div className="form-group">
					    <label>Select Farmer Name</label>
					    <select
					    	value={this.state.farmerSelectId}
					    	onChange={this.selectFarmer}
					    	className="form-control"
					    	name="farmer"
					    >
					    	{this.props.farmersList.map((farmer, index) => {
					    		return (<option value={index} key={index}>{farmer.firstName + " " + farmer.lastName}</option>)
					    	})
					    	}
					    </select>
					</div>

					<div className="form-group">
					    <label>Select Groundnut Type</label>
					    <select
					    	value={this.state.agreementFormDetail.groundnutType}
					    	onChange={this.handleOnChange}
					    	name="groundnutType"
					    	className="form-control"
					    >
					    	<option value="khalo">khalo</option>
					    	<option value="chugo">chugo</option>
					    </select>
					</div>

					<div className="form-group">
						<label>Rate/KG</label>
					    <input name="rate" className="form-control" type="number" step="0.01" value={this.state.agreementFormDetail.rate} onChange={this.handleOnChange} placeholder="Enter rate of agreement"/>
					</div>

					{this.state.isEditAgreementDetail && (
						<div className="form-group">
							<label>Total payment of {this.state.agreementFormDetail.weigth}KG</label>
						    <input name="totalPayment" className="form-control" type="number" step="1" value={this.state.agreementFormDetail.totalPayment} onChange={this.handleOnChange} placeholder="Enter Percente of Groundnut" readOnly/>
						</div>)
					}


					{this.state.isEditAgreementDetail && (
						<div className="form-group">
							<label>Actual Payment Done</label>
						    <input name="actualTotalPayment" className="form-control" type="number" step="1" value={this.state.agreementFormDetail.actualTotalPayment} onChange={this.handleOnChange} readOnly/>
						</div>)
					}

					{this.state.isEditAgreementDetail && (
						<div className="form-group">
							<label>Weigth</label>
						    <input name="weigth" className="form-control" type="number" step="1" value={this.state.agreementFormDetail.weigth} onChange={this.handleOnChange} readOnly/>
						</div>)
					}

					{this.state.isEditAgreementDetail && (
						<div className="form-group">
							<label>Weigth Cut</label>
						    <input name="weigthCut" className="form-control" type="number" step="1" value={this.state.agreementFormDetail.weigthCut} onChange={this.handleOnChange} readOnly/>
						</div>)
					}

					<div className="form-group">
						<label>Place Where Agreement Done</label>
					    <input name="place" className="form-control" type="text" value={this.state.agreementFormDetail.place} onChange={this.handleOnChange} placeholder="Enter name of place"/>
					</div>

					<div className="form-group">
						<label>Agreement Date</label>
					    <input name="agreementDate" className="form-control" type="date" value={this.state.agreementFormDetail.agreementDate} onChange={this.handleOnChange} placeholder="Enter Date of Agreement" format="dd/mm/yyyy"/>
					</div>

					<div className="form-group">
						<label>Groundnut Percente</label>
					    <input name="groundnutPercente" className="form-control" type="number" step="1" value={this.state.agreementFormDetail.groundnutPercente} onChange={this.handleOnChange} placeholder="Enter Percente of Groundnut"/>
					</div>

					<div className="form-group">
						<label>Moisture Percente</label>
					    <input name="moisture" className="form-control" type="number" step="0.01" value={this.state.agreementFormDetail.moisture} onChange={this.handleOnChange} placeholder="Enter Moisture Percente of Groundnut"/>
					</div>

				  	<div className="form-group">
				    	<label>Extra Info</label>
				    	<textarea name="extraInfo" className="form-control" value={this.state.agreementFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Extra Information about farmer" rows="3"></textarea>
				  	</div>
				  	<button className="btn btn-secondary" onClick={this.handleAgreementFormCloseModal}>cancel</button>
				  	<button type="submit" className="btn btn-primary float-right">Submit</button>
				</form>
			</div>
		)
	}
}

AgreementForm.propTypes = {
	agreementActions: PropTypes.object,
	agreementsList: PropTypes.array,
	farmerActions: PropTypes.object,
	farmersList: PropTypes.array
}

function mapStateToProps(state){
	return {
		agreementsList: state.agreement,
		farmersList: state.farmer
	};
}

function mapDispatchToProps(dispatch){
	return {
		agreementActions: bindActionCreators(agreementActions, dispatch),
		farmerActions: bindActionCreators(farmerActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AgreementForm);