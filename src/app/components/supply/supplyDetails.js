import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as supplyActions from '../../../actions/supplyActions.js';
import PropTypes from 'prop-types';
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
		<TableRow key={props.data.id}>
			<TableCell>{props.data.vehicleType}</TableCell>
			<TableCell>{props.data.vehicleNumber}</TableCell>
			<TableCell>{parseFloat(props.data.emptyWeight).toFixed(2)}Kg</TableCell>
			<TableCell>{parseFloat(props.data.fullWeight).toFixed(2)}Kg</TableCell>
			<TableCell>{parseFloat(props.data.weightCut).toFixed(2)}Kg</TableCell>
			<TableCell>{parseFloat(props.data.fullWeight - props.data.emptyWeight - props.data.weightCut).toFixed(2)}Kg</TableCell>
			<TableCell>{props.data.moisture}</TableCell>
			<TableCell>{props.data.pickUpDate}</TableCell>
			<TableCell>{props.data.supplyDate}</TableCell>
			<TableCell>{props.data.extraInfo}</TableCell>
			<TableCell>
				<Link to={"/supply/" + props.exports_id + "/new/" + props.data.id}>
					<Button variant="outlined" href="">
						Edit
					</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}

class SupplyDetail extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			exports_id: this.props.exports_id,
			supplyDetails: []
		}
	}

	componentWillMount(){
		var supplyDetails = this.props.supplyActions.getSupplyDetails(this.state.exports_id).supplyDetails;
		this.setState({
			supplyDetails: supplyDetails
		});
	}

	render(){
		if(this.state.supplyDetails.length == 0 ){
			return(
				<div>
					<h2>supply Details</h2>
					No supply found Yet
				</div>
			)
		} else {
			return(
				<Grid>
					<Paper elevation={1}>
						<Typography variant="headline" component="h1" className="center grey">
							Supply Details
						</Typography>
						<Typography component="div">
							<Table className="striped responsive-table">
								<TableHead>
									<TableRow>
										<TableCell>Vehicle Type</TableCell>
										<TableCell>Vehicle Number</TableCell>
										<TableCell>Empty Weight</TableCell>
										<TableCell>Full Weight</TableCell>
										<TableCell>Weight Cut</TableCell>
										<TableCell>GroundNut Weight</TableCell>
										<TableCell>Moisture</TableCell>
										<TableCell>Pick up Date</TableCell>
										<TableCell>Supply Date</TableCell>
										<TableCell>Extra Info</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										this.state.supplyDetails.map((supply, index) => {
											return (
												<RenderTableRaw key={supply.id} data={supply} exports_id={this.state.exports_id}/>
											)
										})
									}
								</TableBody>
							</Table>
							<Link to={"/supply/"+ this.props.exports_id +"/new/"} >
								<Button variant="outlined" href="" className="right">New Supply</Button>
							</Link>
						</Typography>
					</Paper>
				</Grid>
			)
		}
	}
}

SupplyDetail.propTypes = {
	supplyActions: PropTypes.object,
	supplyDetails: PropTypes.array
}

function mapStateToProps(state){
	return {
		supplyDetails: state.supplyDetails
	}
}

function mapDispatchToProps(dispatch){
	return{
		supplyActions: bindActionCreators(supplyActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SupplyDetail)