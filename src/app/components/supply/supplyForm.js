import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as supplyActions from '../../../actions/supplyActions';
import * as exportsActions from '../../../actions/exportsActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


function ExportsDetailHeader(props){
	if(props.exportsDetail !=null && props.exportsDetail.exporter){
		return(
			<h3> For Exports: 
				{" " + props.exportsDetail.exporter.name + ", " + props.exportsDetail.exporter.address + "(" + props.exportsDetail.exporter.contactNumber + ")" +", Type: " + props.exportsDetail.groundnutType + "On: " + props.exportsDetail.groundnutType}
			</h3>
		)
	} else {
		return (<h3>No Exports found</h3>)
	}
}

class SupplyForm extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			supplyFormDetail: {
				exports_id: this.props.match.params.exports_id,
				vehicleType: "",
				vehicleNumber: "",
				emptyWeight: "",
				fullWeight: "",
				weightCut: "",
				moisture: "",
				pickUpDate: "",
				supplyDate: "",
				extraInfo: ""
			},
			exportsDetail: null,
			toRedirect: false
		}
		this.handleOnChange = this.handleOnChange.bind(this);
		this.submitSupplyForm = this.submitSupplyForm.bind(this);
	}

	handleOnChange(event){
		event.preventDefault();
		var supplyFormDetail = this.state.supplyFormDetail;
		supplyFormDetail[event.target.name] = event.target.value;
		this.setState({
			supplyFormDetail: supplyFormDetail
		});
	}

	submitSupplyForm(event){
		event.preventDefault();
		this.props.supplyActions.addOrUpdateToSupplyList(this.state.supplyFormDetail);
		this.setState({
			toRedirect: true
		});
	}

	componentWillMount(){
		if(this.props.match.params.id){
			var supplyDetail = this.props.supplyActions.getSupplyDetail(this.props.match.params.id).supplyDetail
			this.setState({
				supplyFormDetail: supplyDetail
			});
		}
		var exportsDetail = this.props.exportsActions.fetchExportsDetail(this.props.match.params.exports_id).exportsDetail
		this.setState({
			exportsDetail: exportsDetail
		})
	}


	render(){
		if(this.state.toRedirect){
			return <Redirect to={"/exports_detail/" + this.state.supplyFormDetail.exports_id} />
		} 
		return(
			<Grid>
				<Grid item>
					<Typography component="div">
						<ExportsDetailHeader exportsDetail={this.state.exportsDetail} />
					</Typography>
					<Typography variant="headline" component="h1" className="center grey">
						Enter/Update Supply Detail
					</Typography>
					<Typography component="div">
						<form onSubmit={this.submitSupplyForm}>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Select Vehicle Type</InputLabel>
								<Select
							    	value={this.state.supplyFormDetail.vehicleType}
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
								<Input name="vehicleNumber" type="text" value={this.state.supplyFormDetail.vehicleNumber}  onChange={this.handleOnChange} placeholder="Enter Vehicle Number"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Vehicle Empty Weight(in Kg)</InputLabel>
								<Input name="emptyWeight" type="number" step=".0001" value={this.state.supplyFormDetail.emptyWeight}  onChange={this.handleOnChange} placeholder="Enter weight of empty Vehicle"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Vehicle Full Weight(in Kg)</InputLabel>
								<Input name="fullWeight" type="number" step=".0001" value={this.state.supplyFormDetail.fullWeight}  onChange={this.handleOnChange} placeholder="Enter weight of full Vehicle"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Vehicle Weight Cut(in Kg)</InputLabel>
								<Input name="weightCut" type="number" step=".0001" value={this.state.supplyFormDetail.weightCut}  onChange={this.handleOnChange} placeholder="Enter weight cut i.e. kata "/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Moisture</InputLabel>
								<Input name="moisture" type="number" step=".01" value={this.state.supplyFormDetail.moisture}  onChange={this.handleOnChange} placeholder="Enter moistur percente "/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Date of Pick Up</InputLabel>
								<Input name="pickUpDate" type="date" value={this.state.supplyFormDetail.pickUpDate}  onChange={this.handleOnChange} placeholder="Enter date of pick Up from Company"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel>Date of Supply</InputLabel>
								<Input name="supplyDate" type="date" value={this.state.supplyFormDetail.supplyDate}  onChange={this.handleOnChange} placeholder="Enter date of Supply"/>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<TextField name="extraInfo" label="Extra Info about This Delivery" value={this.state.supplyFormDetail.extraInfo}  onChange={this.handleOnChange} placeholder="Enter Extra info about this supply" rowsMax="3" multiline margin="normal"></TextField>
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

SupplyForm.propTypes ={
	supplyActions: PropTypes.object,
	exportsActions: PropTypes.object,
	exportsDetail: PropTypes.object,
	supplyFormDetail: PropTypes.object
}

function mapStateToProps(state){
	return {
		supplyFormDetail: state.supplyDetail,
		exportsDetail: state.exportsDetail
	};
}

function mapDispatchToProps(dispatch){
	return {
		supplyActions: bindActionCreators(supplyActions, dispatch),
		
		exportsActions: bindActionCreators(exportsActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SupplyForm);