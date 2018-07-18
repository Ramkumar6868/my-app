import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as deliveryActions from '../../../actions/deliveryActions.js';
import PropTypes from 'prop-types';

function RenderTableRaw(props){
	return(
		<tr key={props.data.id}>
			<td>{props.data.vehicleType}</td>
			<td>{props.data.vehicleNumber}</td>
			<td>{(props.data.emptyWeight).toFixed(2)}Kg</td>
			<td>{(props.data.fullWeight).toFixed(2)}Kg</td>
			<td>{(props.data.weightCut).toFixed(2)}Kg</td>
			<td>{(props.data.fullWeight - props.data.emptyWeight - props.data.weightCut).toFixed(2)}Kg</td>
			<td>{props.data.date}</td>
			<td>{props.data.extraInfo}</td>
			<td>edit</td>
		</tr>
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
				<div>
					<h2 className="bg-secondary text-center rounded-top">Delivery Details</h2>
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Vehicle Type</th>
								<th>Vehicle Number</th>
								<th>Empty Weight</th>
								<th>Full Weight</th>
								<th>Weight Cut</th>
								<th>GroundNut Weight</th>
								<th>Date of Delivery</th>
								<th>Extra Info</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.deliveryDetails.map((dd, index) => {
									return (
										<RenderTableRaw key={dd.id} data={dd}/>
									)
								})
							}
						</tbody>
					</table>
				</div>
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