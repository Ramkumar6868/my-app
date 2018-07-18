import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';
import * as farmerActions from '../../../actions/farmerActions.js';

class AgreementForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			agreementFormDetail: {
				farmer: {},
				groundnutType: "khalo",
				rate: 0.00,
				weight: 0.00,
				groundnutPercente: 0.00,
				weightCut: 0.00,
				actualTotalPayment: 0.00,
				totalPayment: 0.00,
				moisture: 0.00,
				place: "",
				agreementDate: "",
				extraInfo: ""
			},
			farmerSelectId: 0,
			isEditAgreementDetail: false,
			farmersList: []

		}
		this.submitAgreementForm = this.submitAgreementForm.bind(this);
		this.selectFarmer = this.selectFarmer.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}


	componentWillMount(){

		var farmersList = this.props.farmerActions.fetchFarmerList();
		var agreementDetail = {}
		if(this.props.match.params.id){
			agreementDetail = this.props.agreementActions.fetchAgreementDetail(this.props.match.params.id)
			if(agreementDetail && agreementDetail.agreementDetail){
				this.setState({
					agreementFormDetail: agreementDetail.agreementDetail,
					farmerSelectId: agreementDetail.agreementDetail.farmer.id,
					isEditAgreementDetail: true,
					toRedirect: false
				});
			}
		}
		if(farmersList && farmersList.farmersList && farmersList.farmersList.length > 0){
			this.setState({
				farmersList: farmersList.farmersList
			});
		}
	}
	componentDidMount(){
		console.log(this.props.farmersList)
	}

	submitAgreementForm(event){
		event.preventDefault();
		console.log(this.state.agreementFormDetail);
		this.props.agreementActions.addOrUpdateToAgreementList(this.state.agreementFormDetail);
		this.setState({
			toRedirect: true
		});
	}

	handleOnChange(event){
		event.preventDefault();
		var agreementFormDetail = this.state.agreementFormDetail;
		agreementFormDetail[event.target.name] = event.target.value;
		this.setState({
			agreementFormDetail: agreementFormDetail
		});
	}

	selectFarmer(selectedOption){
		var agreementFormDetail = this.state.agreementFormDetail;
		agreementFormDetail[selectedOption.target.name] = this.props.farmersList[selectedOption.target.value];
		this.setState({
			agreementFormDetail: agreementFormDetail,
			farmerSelectId: agreementFormDetail.farmer.id
		});
	}

	render(){
		if(this.state.toRedirect){
			return <Redirect to='/agreement' />
		}
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
					    		return (<option value={index} key={index}>{farmer.firstName + " " + farmer.lastName + " S/O " + farmer.fatherName + ", " + farmer.village}</option>)
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
							<label>Total payment of {this.state.agreementFormDetail.weight}KG</label>
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
							<label>Weight</label>
						    <input name="weight" className="form-control" type="number" step="1" value={this.state.agreementFormDetail.weight} onChange={this.handleOnChange} readOnly/>
						</div>)
					}

					{this.state.isEditAgreementDetail && (
						<div className="form-group">
							<label>Weight Cut</label>
						    <input name="weightCut" className="form-control" type="number" step="1" value={this.state.agreementFormDetail.weightCut} onChange={this.handleOnChange} readOnly/>
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
	agreementDetail: PropTypes.object,
	farmerActions: PropTypes.object,
	farmersList: PropTypes.array
}

function mapStateToProps(state){
	return {
		agreementDetail: state.agreementDetail,
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