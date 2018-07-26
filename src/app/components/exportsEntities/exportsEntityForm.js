import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as exportsEntitiesActions from '../../../actions/exportsEntitiesActions.js';
import {Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


class ExportsEntityForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			exportsEntityFormDetail: {
				type: "",
				name: "",
				address: "",
				contactNumber: "",
				extraInfo: ""
			},
			toRedirect: false
		}
		this.handleOnChange = this.handleOnChange.bind(this);
		this.submitExportEntityForm = this.submitExportEntityForm.bind(this);
	}

	handleOnChange(event){
		event.preventDefault();
		var exportsEntityFormDetail = this.state.exportsEntityFormDetail;
		exportsEntityFormDetail[event.target.name] = event.target.value;
		this.setState({
			exportsEntityFormDetail: exportsEntityFormDetail
		});
	}

	submitExportEntityForm(event){
		event.preventDefault();
		this.props.exportsEntitiesActions.addOrUpdateToExportsEntity(this.state.exportsEntityFormDetail);
		this.setState({
			toRedirect: true
		});
	}

	componentWillMount(){
		if(this.props.match.params.id){
			var exportsEntityFormDetail = this.props.exportsEntitiesActions.fetchExportEntityDetail(this.props.match.params.id).exportsEntityDetail
			this.setState({
				exportsEntityFormDetail: exportsEntityFormDetail
			});
		}

	}

	render(){
		if(this.state.toRedirect){
			return <Redirect to='/exportsEntities' />
		}
		return (
			<Grid>
				<Grid item>
					<Typography variant="headline" component="h1" className="center grey">
						Enter/Update Exports Dalal/Company
					</Typography>
					<Typography component="div">
						<form onSubmit={this.submitExportEntityForm}>
							<FormControl fullWidth margin="normal">
								<InputLabel>Select Type of Party i.e. Meal or Dalal</InputLabel>
								<Select
									value={this.state.exportsEntityFormDetail.type}
									onChange={this.handleOnChange}
									name="type"
								>
									<MenuItem value="Company">Meal</MenuItem>
									<MenuItem value="Dalal">Dalal</MenuItem>
									<MenuItem value="Dalal">Other</MenuItem>
								</Select>
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>Name of Party</InputLabel>
								<Input type="text" name="name" value={this.state.exportsEntityFormDetail.name} onChange={this.handleOnChange} placeholder="Enter name of Party" />
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>Contact Numner of Party</InputLabel>
								<Input type="text" name="contactNumber" value={this.state.exportsEntityFormDetail.contactNumber} onChange={this.handleOnChange} placeholder="Enter Number of Party" />
							</FormControl>						
							<FormControl fullWidth margin="normal">
								<InputLabel>Address of party</InputLabel>
								<Input type="text" name="address" value={this.state.exportsEntityFormDetail.address} onChange={this.handleOnChange} placeholder="Enter Address of Party" />
							</FormControl>
							<FormControl fullWidth margin="normal">
								<TextField name="extraInfo" value={this.state.exportsEntityFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Enter Other Information of Party" multiline rowsMax="3" label="Extra Information about Party" margin="normal" ></TextField>
							</FormControl>
							<Button variant="contained">Exports Parties List</Button>
							<Button type="submit" variant="contained" color="primary" className="right">Submit
							</Button>
						</form>
					</Typography>
				</Grid>
			</Grid>
		)
	}
}

ExportsEntityForm.propTypes = {
	exportsEntitiesActions: PropTypes.object
}

function mapStateToProps(state){
	return {
		exportsEntityFormDetail: state.exportsEntity
	}
}

function mapDispatchToProps(dispatch){
	return {
		exportsEntitiesActions: bindActionCreators(exportsEntitiesActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExportsEntityForm);