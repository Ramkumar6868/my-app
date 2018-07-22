import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as deliveryActions from '../../../actions/deliveryActions.js';
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
			<TableCell>{props.data.date}</TableCell>
			<TableCell>{props.data.extraInfo}</TableCell>
			<TableCell>
				<Link to={"/delivery/" + props.agreement_id + "/new/" + props.data.id}>
					<Button variant="outlined" href="">
						Edit
					</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}

class DeliveryDetail extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			agreement_id: this.props.agreement_id,
			deliveryDetails: []
		}
	}

	componentWillMount(){
		var deliveryDetails = this.props.deliveryActions.getDeliveryDetails(this.state.agreement_id);
		this.setState({
			deliveryDetails: deliveryDetails
		});
	}

	render(){
		if(this.state.deliveryDetails.length == 0 ){
			return(
				<div>
					<h2>Delivery Details</h2>
					No Delivery Yet
				</div>
			)
		} else {
			return(
				<Grid>
					<Paper elevation={1}>
						<Typography variant="headline" component="h1" className="center grey">
							Delivery Details
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
										<TableCell>Date of Delivery</TableCell>
										<TableCell>Extra Info</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										this.props.deliveryDetails.map((dd, index) => {
											return (
												<RenderTableRaw key={dd.id} data={dd} agreement_id={this.state.agreement_id}/>
											)
										})
									}
								</TableBody>
							</Table>
							<Link to={"/delivery/"+ this.props.agreement_id +"/new/"} >
								<Button variant="outlined" href="" className="right">New Delivery</Button>
							</Link>
						</Typography>
					</Paper>
				</Grid>
			)
		}
	}
}

DeliveryDetail.propTypes = {
	deliveryActions: PropTypes.object,
	deliveryDetails: PropTypes.array
}

function mapStateToProps(state){
	return {
		deliveryDetails: state.deliveryDetails
	}
}

function mapDispatchToProps(dispatch){
	return{
		deliveryActions: bindActionCreators(deliveryActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeliveryDetail)