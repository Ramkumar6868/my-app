import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
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
		console.log(selectedOption.target.value)
		var agreementFormDetail = this.state.agreementFormDetail;
		agreementFormDetail["farmer"] = this.props.farmersList[selectedOption.target.value];
		this.setState({
			agreementFormDetail: agreementFormDetail,
			farmerSelectId: selectedOption.target.value
		});
	}

	render(){
		if(this.state.toRedirect){
			return <Redirect to='/agreement' />
		}
		return(
			<Grid>
				<Grid item>
					<Typography variant="headline" component="h1" className="center grey">
						Agreement Detail
					</Typography>
					<Typography component="div">
						<form onSubmit={this.submitAgreementForm}>
							<FormControl fullWidth margin="normal">
							    <InputLabel>Select Farmer Name</InputLabel>
							    <Select
							    	value={this.state.farmerSelectId}
							    	onChange={this.selectFarmer}
							    	name="farmer"
							    >
							    	{this.props.farmersList.map((farmer, index) => {
							    		return (<MenuItem value={index} key={index}>{farmer.firstName + " " + farmer.lastName + " S/O " + farmer.fatherName + ", " + farmer.village}</MenuItem>)
							    	})
							    	}
							    </Select>
							</FormControl>

							<FormControl fullWidth margin="normal">
							    <InputLabel>Select Groundnut Type</InputLabel>
							    <Select
							    	value={this.state.agreementFormDetail.groundnutType}
							    	onChange={this.handleOnChange}
							    	name="groundnutType"
							    >
							    	<MenuItem value="khalo">khalo</MenuItem>
							    	<MenuItem value="chugo">chugo</MenuItem>
							    </Select>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>Rate/KG</InputLabel>
							    <Input name="rate" type="number" step="0.01" value={this.state.agreementFormDetail.rate}  onChange={this.handleOnChange} placeholder="Enter rate of agreement"/>
							</FormControl>

							{this.state.isEditAgreementDetail && (
								<FormControl fullWidth margin="normal">
									<InputLabel>Total payment of {this.state.agreementFormDetail.weight}KG</InputLabel>
								    <Input name="totalPayment" type="number" step="1" value={this.state.agreementFormDetail.totalPayment} onChange={this.handleOnChange} placeholder="Enter Percente of Groundnut" readOnly/>
								</FormControl>)
							}


							{this.state.isEditAgreementDetail && (
								<FormControl fullWidth margin="normal">
									<InputLabel>Actual Payment Done</InputLabel>
								    <Input name="actualTotalPayment" type="number" step="1" value={this.state.agreementFormDetail.actualTotalPayment} onChange={this.handleOnChange} readOnly/>
								</FormControl>)
							}

							{this.state.isEditAgreementDetail && (
								<FormControl fullWidth margin="normal">
									<InputLabel>Weight</InputLabel>
								    <Input name="weight" type="number" step="1" value={this.state.agreementFormDetail.weight} onChange={this.handleOnChange} readOnly/>
								</FormControl>)
							}

							{this.state.isEditAgreementDetail && (
								<FormControl fullWidth margin="normal">
									<InputLabel>Weight Cut</InputLabel>
								    <Input name="weightCut" type="number" step="1" value={this.state.agreementFormDetail.weightCut} onChange={this.handleOnChange} readOnly/>
								</FormControl>)
							}

							<FormControl fullWidth margin="normal">
								<InputLabel>Place Where Agreement Done</InputLabel>
							    <Input name="place" type="text" value={this.state.agreementFormDetail.place} onChange={this.handleOnChange} placeholder="Enter name of place"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>Agreement Date</InputLabel>
							    <Input name="agreementDate" type="date" value={this.state.agreementFormDetail.agreementDate} onChange={this.handleOnChange} placeholder="Enter Date of Agreement" format="dd/mm/yyyy"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>Groundnut Percente</InputLabel>
							    <Input name="groundnutPercente" type="number" step="1" value={this.state.agreementFormDetail.groundnutPercente} onChange={this.handleOnChange} placeholder="Enter Percente of Groundnut"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>Moisture Percente</InputLabel>
							    <Input name="moisture" type="number" step="0.01" value={this.state.agreementFormDetail.moisture} onChange={this.handleOnChange} placeholder="Enter Moisture Percente of Groundnut"/>
							</FormControl>

						  	<FormControl fullWidth margin="normal">
						    	<TextField label="Extra Info" name="extraInfo" value={this.state.agreementFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Extra Information about farmer" multiline rowsMax="4" margin="normal"></TextField>
						  	</FormControl>
						  	<Button variant="contained" onClick={this.handleAgreementFormCloseModal}>back</Button>
						  	<Button type="submit" variant="contained" color="primary" className="right">Submit</Button>
						</form>
					</Typography>
				</Grid>
			</Grid>
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