import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as exportsActions from '../../../actions/exportsActions.js';
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
import DropMenu from '../common/menuLists.js';
 
 function RenderTableRaw(props){
 	var linkMenu = {
		name: '....',
		links: [
			{
				name: 'Edit',
				linkName: "/exports/new/" + props.entity.id
			},
			{
				name: 'Details',
				linkName: "/exports_detail/" + props.entity.id
			}
		]
	}
	return(
		<TableRow>
			<TableCell>{props.entity.exporter.name + ", " + props.entity.exporter.address}</TableCell>
			<TableCell>{props.entity.contactedBy.name + ", " + props.entity.contactedBy.address}</TableCell>
			<TableCell>{props.entity.groundnutType}</TableCell>
			<TableCell>{props.entity.rate}</TableCell>
			<TableCell>{props.entity.weight}</TableCell>
			<TableCell>{props.entity.weightCut}</TableCell>
			<TableCell>{props.entity.commitmentDate}</TableCell>
			<TableCell>{props.entity.settlementDate}</TableCell>
			<TableCell>{props.entity.totalPayment}</TableCell>
			<TableCell>{props.entity.actualTotalPayment}</TableCell>
			<TableCell>{props.entity.extraInfo}</TableCell>
			<TableCell>
				<DropMenu 
					menuDetail= {linkMenu}
				/>
			</TableCell>
		</TableRow>
	)
}

class ExportsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			exportsList: []
		}
	}

	componentWillMount(){
		var exportsList = this.props.exportsActions.fetchExportsList().exportsList;
		this.setState({
			exportsList: exportsList
		});
	}

	render(){
		return(
			<Grid>
				<Grid item>
					<Paper elevation={1}>
						<Typography variant="headline" component="h1" className="center grey">
							Exports List
						</Typography>
						<Typography component="div">
							<Table className="striped">
								<TableHead>
									<TableRow>
										<TableCell>Exporter Name</TableCell>
										<TableCell>Mediator</TableCell>
										<TableCell>Groundnut Type</TableCell>
										<TableCell>rate</TableCell>
										<TableCell>Total Weight</TableCell>
										<TableCell>Weight Cut</TableCell>
										<TableCell>Commitment Date</TableCell>
										<TableCell>Settlement Date</TableCell>
										<TableCell>Total Payment</TableCell>
										<TableCell>Actual Payment</TableCell>
										<TableCell>Extra Info</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										// console.log(this.props.agreementsList)
										this.state.exportsList.map((entity, index) =>{
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
						<Link to="/exports/new">
							<Button variant="outlined" href="" className="right">
								Add New Export Entity
							</Button>
					</Link>
				</Grid>
			</Grid>
		)
	}
}

ExportsList.propTypes = {
	exportsActions: PropTypes.object,
	exportsList: PropTypes.array
}

function mapStateToProps(state){
	return {
		exportsList: state.exports
	}
}

function mapDispatchToProps(dispatch){
	return {
		exportsActions: bindActionCreators(exportsActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExportsList);