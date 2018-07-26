import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as exportsActions from '../../../actions/exportsActions.js';
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


class ExportsForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			exportsFormDetail: {
				exporter: {},
				contactedBy: {},
				groundnutType: "",
				rate: "",
				weight: "",
				weightCut: "",
				totalPayment: "",
				actualTotalPayment: "",
				commitmentDate: "",
				settlementDate: "",
				extraInfo: ""
			},
			exportsEntitiesList: [],
			selectedExporterIndex: 0,
			selectedContactorIndex: 0,
			toRedirect: false
		}
		this.handleOnChange = this.handleOnChange.bind(this);
		this.selectExporter = this.selectExporter.bind(this);
		this.selectContactor = this.selectContactor.bind(this);
		this.submitExportForm = this.submitExportForm.bind(this);
	}

	handleOnChange(event){
		event.preventDefault();
		var exportsFormDetail = this.state.exportsFormDetail;
		exportsFormDetail[event.target.name] = event.target.value;
		this.setState({
			exportsFormDetail: exportsFormDetail
		});
	}

	selectExporter(selectedOption){
		var exportsFormDetail = this.state.exportsFormDetail;
		exportsFormDetail["exporter"] = this.props.exportsEntitiesList[selectedOption.target.value];
		this.setState({
			exportsFormDetail: exportsFormDetail,
			selectedExporterIndex: selectedOption.target.value
		});
	}

	selectContactor(selectedOption){
		var exportsFormDetail = this.state.exportsFormDetail;
		exportsFormDetail["contactedBy"] = this.props.exportsEntitiesList[selectedOption.target.value];
		this.setState({
			exportsFormDetail: exportsFormDetail,
			selectedContactorIndex: selectedOption.target.value
		});
	}

	submitExportForm(event){
		event.preventDefault();
		this.props.exportsActions.addOrUpdateToExports(this.state.exportsFormDetail);
		this.setState({
			toRedirect: true
		});
	}

	componentWillMount(){
		if(this.props.match.params.id){
			var exportsFormDetail = this.props.exportsActions.fetchExportsDetail(this.props.match.params.id).exportsDetail
			this.setState({
				exportsFormDetail: exportsFormDetail
			});
		}
		var exportsEntitiesList = this.props.exportsEntitiesActions.fetchExportEntitiesList().exportsEntities;
		this.setState({
			exportsEntitiesList: exportsEntitiesList
		});

	}

	render(){
		if(this.state.toRedirect){
			return <Redirect to='/exports' />
		}
		return (
			<Grid>
				<Grid item>
					<Typography variant="headline" component="h1" className="center grey">
						Enter/Update Exports Detail
					</Typography>
					<Typography component="div">
						<form onSubmit={this.submitExportForm}>
							<FormControl fullWidth margin="normal">
								<InputLabel>Select Groundnut Type</InputLabel>
								<Select
									value={this.state.exportsFormDetail.groundnutType}
									onChange={this.handleOnChange}
									name="groundnutType"
								>
									<MenuItem value="gota">Gota</MenuItem>
									<MenuItem value="dal">Dal</MenuItem>
									<MenuItem value="chhilka">Chhilka</MenuItem>
									<MenuItem value="other">Other</MenuItem>
								</Select>
							</FormControl>
							<FormControl fullWidth margin="normal">
							    <InputLabel>Select Exporter(if not in list then add first please)</InputLabel>
							    <Select
							    	value={this.state.selectedExporterIndex}
							    	onChange={this.selectExporter}
							    	name="exporter"
							    >
							    	{this.state.exportsEntitiesList.map((entity, index) => {
							    		return (<MenuItem value={index} key={index}>{entity.name + ", " + entity.address}</MenuItem>)
							    	})
							    	}
							    </Select>
							</FormControl>
							<FormControl fullWidth margin="normal">
							    <InputLabel>Select Mediator(if not in list then add first please)</InputLabel>
							    <Select
							    	value={this.state.selectedContactorIndex}
							    	onChange={this.selectContactor}
							    	name="contacter"
							    >
							    	{this.state.exportsEntitiesList.map((entity, index) => {
							    		return (<MenuItem value={index} key={index}>{entity.name + ", " + entity.address}</MenuItem>)
							    	})
							    	}
							    </Select>
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>Rate(per Kg)</InputLabel>
								<Input type="number" name="rate" step="0.01" value={this.state.exportsFormDetail.rate} onChange={this.handleOnChange} placeholder="Enter rate of exports" />
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>Total Payment</InputLabel>
								<Input type="number" name="totalPayment" step="0.01" value={this.state.exportsFormDetail.totalPayment} onChange={this.handleOnChange} placeholder="Enter total Payment of exports" />
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>Actual Total Payment of Exports</InputLabel>
								<Input type="number" name="actualTotalPayment" step="0.01" value={this.state.exportsFormDetail.actualTotalPayment} onChange={this.handleOnChange} placeholder="Enter actual toal payment of exports" />
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>Commitment Date</InputLabel>
								<Input type="date" name="commitmentDate" value={this.state.exportsFormDetail.commitmentDate} onChange={this.handleOnChange} placeholder="Enter date of commitment of exports" />
							</FormControl>
							<FormControl fullWidth margin="normal">
								<InputLabel>settlement Date</InputLabel>
								<Input type="date" name="settlementDate" value={this.state.exportsFormDetail.settlementDate} onChange={this.handleOnChange} placeholder="Enter date of settlement of exports" />
							</FormControl>
							<FormControl fullWidth margin="normal">
								<TextField name="extraInfo" value={this.state.exportsFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Enter Other Information of Exports" multiline rowsMax="3" label="Extra Information about exports" margin="normal" ></TextField>
							</FormControl>
							<Button variant="contained">Exports List</Button>
							<Button type="submit" variant="contained" color="primary" className="right">Submit
							</Button>
						</form>
					</Typography>
				</Grid>
			</Grid>
		)
	}
}

ExportsForm.propTypes = {
	exportsActions: PropTypes.object,
	exportsEntitiesActions: PropTypes.object,
	exportsEntitiesList: PropTypes.array
}

function mapStateToProps(state){
	return {
		exportsFormDetail: state.exportsDetail,
		exportsEntitiesList: state.exportsEntities
	}
}

function mapDispatchToProps(dispatch){
	return {
		exportsActions: bindActionCreators(exportsActions, dispatch),
		exportsEntitiesActions: bindActionCreators(exportsEntitiesActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExportsForm);