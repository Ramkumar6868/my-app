import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
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


// const modalStyle = {
// 	content: {
// 		top: '50%',
// 		left: '50%',
// 		right: 'auto',
// 		bottom: 'auto',
// 		overflow: 'scroll',
// 		height: '500px',
// 		width: '800px',
// 		marginRight: '-50%',
// 		transform: 'translate(-50%, -50%)'
// 	}
// };


function RenderTableRaw(props){
	return(
		<TableRow>
			<TableCell>{props.agreement.farmer.firstName + " " + props.agreement.farmer.lastName}</TableCell>
			<TableCell>{props.agreement.farmer.fatherName}</TableCell>
			<TableCell>{props.agreement.farmer.village}</TableCell>
			<TableCell>{props.agreement.groundnutType}</TableCell>
			<TableCell>{props.agreement.rate}</TableCell>
			<TableCell>{props.agreement.extraInfo}</TableCell>
			<TableCell>
				
				<Link to={"/agreement_details/" + props.agreement.id} >
					<Button variant="outlined" href="" className="right">Details</Button>
				</Link>
			</TableCell>
			<TableCell>
				<Link to={"/delivery/"+ props.agreement.id +"/new/"} >
					<Button variant="outlined" href="" className="right">Delivery</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}

class AgreementsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {};

		// this.handleAgreementDetailOpenModal = this.handleAgreementDetailOpenModal.bind(this);
		// this.handleAgreementDetailCloseModal = this.handleAgreementDetailCloseModal.bind(this);
		// this.handleAgreementFormOpenModal = this.handleAgreementFormOpenModal.bind(this);
		// this.handleAgreementFormCloseModal = this.handleAgreementFormCloseModal.bind(this);
	}

	// resetAgreementDetails(){
	// 	var agreementDetail = {
	// 		farmer: {},
	// 		groundnutType: "khalo",
	// 		rate: 0.00,
	// 		weight: 0.00,
	// 		groundnutPercente: 0.00,
	// 		weightCut: 0.00,
	// 		actualTotalPayment: 0.00,
	// 		totalPayment: 0.00,
	// 		moisture: 0.00,
	// 		place: "",
	// 		agreementDate: "",
	// 		extraInfo: ""
	// 	}
	// 	this.setState({
	// 		agreementDetail: agreementDetail
	// 	});
	// }

	// createAgreement(){
	// 	this.resetAgreementDetails();
	// 	this.handleAgreementFormOpenModal(false);
	// }

	// handleAgreementDetailCloseModal(isEditAgreementDetail){
	// 	if(isEditAgreementDetail){
	// 		this.handleAgreementFormOpenModal();
	// 	}
	// 	this.setState({
	// 		openAgreementDetailModal: false,
	// 	});
	// }

	// handleAgreementFormCloseModal(){
	// 	this.setState({
	// 		openAgreementFormModal: false
	// 	});
	// }

	// handleAgreementFormOpenModal(isEditAgreementDetail){
	// 	this.setState({
	// 		openAgreementFormModal: true,
	// 		isEditAgreementDetail: isEditAgreementDetail
	// 	});
	// }

	componentWillMount(){
		this.props.agreementActions.fetchAgreementList();
	}



	render(){
		if(!this.props.agreementsList){
			return(
				<Grid className="gridContainer">
					Loading Agreements List...
				</Grid>
			);
		} else{
			return(
				<Grid>
					<Grid item>
						<Paper elevation={1}>
							<Typography variant="headline" component="h1" className="center grey">
								Agreement Detail
							</Typography>
							<Typography component="div">
								<Table className="striped">
									<TableHead>
										<TableRow>
											<TableCell>Farmer Name</TableCell>
											<TableCell>Father Name</TableCell>
											<TableCell>Village</TableCell>
											<TableCell>Groundnut Type</TableCell>
											<TableCell>Rate</TableCell>
											<TableCell>Extra Information</TableCell>
											<TableCell>Details</TableCell>
											<TableCell>Delivery</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											// console.log(this.props.agreementsList)
											this.props.agreementsList.map((agreement, index) =>{
												return(
													<RenderTableRaw key={agreement.id} agreement={agreement}/>
												);
											})
										}
									</TableBody>
								</Table>
							</Typography>
						</Paper>
					</Grid>
					<Grid item>
							<Link to="agreement/new">
								<Button variant="outlined" href="" className="right">
									Entry New Agreement
								</Button>
						</Link>
					</Grid>
				</Grid>
			)
		}
	}
}

AgreementsList.propTypes = {
	agreementActions: PropTypes.object,
	agreementsList: PropTypes.array
}

function mapStateToProps(state){
	return{
		agreementsList: state.agreement
	}
}

function mapDispatchToProps(dispatch){
	return {
		agreementActions: bindActionCreators(agreementActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AgreementsList);