import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as exportsEntitiesActions from '../../../actions/exportsEntitiesActions.js';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

function RenderTableRaw(props){
	return(
		<TableRow>
			<TableCell>{props.entity.type}</TableCell>
			<TableCell>{props.entity.name}</TableCell>
			<TableCell>{props.entity.address}</TableCell>
			<TableCell>{props.entity.contactNumber}</TableCell>
			<TableCell>{props.entity.extraInfo}</TableCell>
			<TableCell>
				<Link to={"/exportsEntities/new/" + props.entity.id} >
					<Button variant="outlined" href="" className="left">Edit</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}

class ExportsEntitiesList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			exportsEntitiesList: []
		}
	}

	componentWillMount(){
		var exportsEntitiesList = this.props.exportsEntitiesActions.fetchExportEntitiesList().exportsEntities;
		this.setState({
			exportsEntitiesList: exportsEntitiesList
		});
	}

	render(){
		return(
			<Grid>
				<Grid item>
					<Paper elevation={1}>
						<Typography variant="headline" component="h1" className="center grey">
							Exports Entities List
						</Typography>
						<Typography component="div">
							<Table className="striped">
								<TableHead>
									<TableRow>
										<TableCell>Type</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Address</TableCell>
										<TableCell>Contact Number</TableCell>
										<TableCell>Extra Information</TableCell>
										<TableCell>Details</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										// console.log(this.props.agreementsList)
										this.state.exportsEntitiesList.map((entity, index) =>{
											return(
												<RenderTableRaw key={entity.id} entity={entity}/>
											);
										})
									}
								</TableBody>
							</Table>
						</Typography>
					</Paper>
				</Grid>
				<Grid item>
						<Link to="/exportsEntities/new">
							<Button variant="outlined" href="" className="right">
								Add New Export Entity
							</Button>
					</Link>
				</Grid>
			</Grid>
		)
	}
}

ExportsEntitiesList.propTypes = {
	exportsEntitiesActions: PropTypes.object,
	exportsEntitiesList: PropTypes.array
}

function mapStateToProps(state){
	return {
		exportsEntitiesList: state.exportsEntities
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
)(ExportsEntitiesList);