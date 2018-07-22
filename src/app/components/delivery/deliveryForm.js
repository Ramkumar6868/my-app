import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as deliveryActions from '../../../actions/deliveryActions';
import * as agreementActions from '../../../actions/agreementActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


function AgreementDetailHeader(props){
	if(props.agreementDetail !=null && props.agreementDetail.farmer){
		return(
			<h3> For Agreement: 
				{" " + props.agreementDetail.farmer.firstName + " " + props.agreementDetail.farmer.lastName + " s/o " +  props.agreementDetail.farmer.fatherName + ", " + props.agreementDetail.farmer.village + ", Type: " + props.agreementDetail.groundnutType}
			</h3>
		)
	} else {
		return (<h3>No Agreement found</h3>)
	}
}

class DeliveryForm extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			deliveryFormDetail: {
					agreement_id: this.props.match.params.agreement_id,
					vehicleType: "",
					vehicleNumber: "",
					emptyWeight: "",
					fullWeight: "",
					weightCut: "",
					date: "",
					extraInfo: ""
			},
			agreementDetail: null,
			toRedirect: false
		} 
		console.log(this.state)
		this.handleOnChange = this.handleOnChange.bind(this);
		this.submitDeliveryForm = this.submitDeliveryForm.bind(this);
	}

	handleOnChange(event){
		event.preventDefault();
		var deliveryFormDetail = this.state.deliveryFormDetail;
		deliveryFormDetail[event.target.name] = event.target.value;
		this.setState({
			deliveryFormDetail: deliveryFormDetail
		});
	}

	submitDeliveryForm(event){
		event.preventDefault();
		this.props.deliveryActions.addOrUpdateToDeliveryList(this.state.deliveryFormDetail);
		this.setState({
			toRedirect: true
		});
	}

	componentWillMount(){
		if(this.props.match.params.id){
			var deliveryDetail = this.props.deliveryActions.getDeliveryDetail(this.props.match.params.id).deliveryDetail
			this.setState({
				deliveryFormDetail: deliveryDetail
			});
		}
		console.log(this.state.deliveryFormDetail)
		var agreementDetail = this.props.agreementActions.fetchAgreementDetail(this.props.match.params.agreement_id).agreementDetail
		this.setState({
			agreementDetail: agreementDetail
		})
	}


	render(){
		if(this.state.toRedirect){
			return <Redirect to={"/agreement_details/" + this.state.deliveryFormDetail.agreement_id} />
		} 
		return(
			<Grid>
				<Grid item>
					<Typography component="div">
						<AgreementDetailHeader agreementDetail={this.state.agreementDetail} />
					</Typography>
					<Typography variant="headline" component="h1" className="center grey">
						Enter/Update Delivery Detail
					</Typography>
					<Typography component="div">
						<form onSubmit={this.submitDeliveryForm}>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Select Vehicle Type</InputLabel>
								<Select
							    	value={this.state.deliveryFormDetail.vehicleType}
							    	onChange={this.handleOnChange}
							    	name="vehicleType"
							    >
							    	<MenuItem value="Pick-up">Pick-up</MenuItem>
							    	<MenuItem value="Tractor">Tractor</MenuItem>
							    	<MenuItem value="Truck">Truck</MenuItem>
							    	<MenuItem value="Other">Other</MenuItem>
							    </Select>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Vehicle Number</InputLabel>
								<Input name="vehicleNumber" type="text" value={this.state.deliveryFormDetail.vehicleNumber}  onChange={this.handleOnChange} placeholder="Enter Vehicle Number"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Vehicle Empty Weight(in Kg)</InputLabel>
								<Input name="emptyWeight" type="number" step=".0001" value={this.state.deliveryFormDetail.emptyWeight}  onChange={this.handleOnChange} placeholder="Enter weight of empty Vehicle"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Vehicle Full Weight(in Kg)</InputLabel>
								<Input name="fullWeight" type="number" step=".0001" value={this.state.deliveryFormDetail.fullWeight}  onChange={this.handleOnChange} placeholder="Enter weight of full Vehicle"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Vehicle Weight Cut(in Kg)</InputLabel>
								<Input name="weightCut" type="number" step=".0001" value={this.state.deliveryFormDetail.weightCut}  onChange={this.handleOnChange} placeholder="Enter weight cut i.e. kata "/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Date of Delivery</InputLabel>
								<Input name="date" type="date" value={this.state.deliveryFormDetail.date}  onChange={this.handleOnChange} placeholder="Enter date of Delivery"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<TextField name="extraInfo" label="Extra Info about This Delivery" value={this.state.deliveryFormDetail.extraInfo}  onChange={this.handleOnChange} placeholder="Enter Extra info about this delivery" rowsMax="3" multiline margin="normal"></TextField>
							</FormControl>
							<Button variant="contained">Back</Button>
							<Button type="submit" variant="contained" color="primary" className="right">Submit</Button>
						</form>
					</Typography>
				</Grid>
			</Grid>
		)
	}
}

DeliveryForm.propTypes ={
	deliveryActions: PropTypes.object,
	agreementActions: PropTypes.object,
	agreementDetail: PropTypes.object,
	deliveryFormDetail: PropTypes.object
}

function mapStateToProps(state){
	return {
		deliveryFormDetail: state.deliveryDetail,
		agreementDetail: state.agreementDetail
	};
}

function mapDispatchToProps(dispatch){
	return {
		deliveryActions: bindActionCreators(deliveryActions, dispatch),
		agreementActions: bindActionCreators(agreementActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeliveryForm);