import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as farmerActions from '../../../actions/farmerActions';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class FarmerForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			farmerFormDetail: {
				firstName: "",
				lastName: "",
				fatherName: "",
				village: "",
				city: "",
				mobileNumber: "",
				extraInfo: ""
			}
		};
		this.submitFarmerForm = this.submitFarmerForm.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	submitFarmerForm(event){
		event.preventDefault();
		this.props.farmerActions.addToFarmerList(this.state.farmerFormDetail);
		this.setState({
			toRedirect: true
		});
	}

	handleOnChange(event){
		event.preventDefault();
		const farmerFormDetail = this.state.farmerFormDetail;
		farmerFormDetail[event.target.name] = event.target.value;
		this.setState({
			farmerFormDetail: farmerFormDetail
		});
	}

	componentWillMount(){
		if(this.props.match.params.id){
			var farmerFormDetail = this.props.farmerActions.fetchFarmerDetail(this.props.match.params.id).farmerDetail
			this.setState({
				farmerFormDetail: farmerFormDetail,
				toRedirect: false
			});
		}
	}

	render(){
		if(this.state.toRedirect){
			return <Redirect to='/farmer' />
		}
		return(
			<Grid>
				<Grid item>
					<Typography variant="headline" component="h1" className="center grey">
						Enter/Update Farmer Details
					</Typography>
					<Typography component="div">
						<form onSubmit={this.submitFarmerForm}>
							<FormControl fullWidth margin="normal">
								<InputLabel>First name</InputLabel>
								<Input type="text" name="firstName" value={this.state.farmerFormDetail.firstName} onChange={this.handleOnChange} placeholder="Enter farmer first name"/>
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>Last Name</InputLabel>
								<Input type="text" name="lastName" value={this.state.farmerFormDetail.lastName} onChange={this.handleOnChange} placeholder="Enter farmer last name"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>Father Name</InputLabel>
								<Input type="text" name="fatherName" value={this.state.farmerFormDetail.fatherName} onChange={this.handleOnChange} placeholder="Enter farmer father name"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>Village</InputLabel>
								<Input type="text" name="village" value={this.state.farmerFormDetail.village} onChange={this.handleOnChange} placeholder="Enter farmer village"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>City</InputLabel>
								<Input type="text" name="city" value={this.state.farmerFormDetail.city} onChange={this.handleOnChange} placeholder="Enter farmer city"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<InputLabel>Mobile Number</InputLabel>
								<Input type="text" name="mobileNumber" value={this.state.farmerFormDetail.mobileNumber} onChange={this.handleOnChange} placeholder="Enter farmer mobile number"/>
							</FormControl>

							<FormControl fullWidth margin="normal">
								<TextField name="extraInfo" value={this.state.farmerFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Extra Information about farmer" multiline rowsMax="3" margin="normal" label="Extra Information"></TextField>
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


FarmerForm.propTypes = {
	farmerActions: PropTypes.object,
	farmerDetail: PropTypes.object
}

function mapStateToProps(state){
	return {
		farmerDetail: state.farmerDetail,

	};
}

function mapDispatchToProps(dispatch){
	return {
		farmerActions: bindActionCreators(farmerActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FarmerForm)
