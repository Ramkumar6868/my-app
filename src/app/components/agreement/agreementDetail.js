import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';

class AgreementDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			agreementDetail: this.props.agreementDetail
		}
		console.log(this.props.agreementDetail)
	}

	render(){
		return(
			<div className="container">
				<h2 className="bg-secondary text-center rounded-top">Agreement Detail</h2>
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-2">Farmer Name</div>
					<div className="col-md-3">{this.state.agreementDetail.farmer + " " + this.props.agreementDetail}</div>
					<div className="col-md-2">ss</div>
					<div className="col-md-3">ss</div>
					<div className="col-md-1"></div>
				</div>
				<button onClick={() => this.props.handleAgreementCloseModal()}>close</button>
			</div>
		)
	}
}

AgreementDetail.propTypes = {
	agreementActions: PropTypes.object,
	agreementDetail: PropTypes.array
}

function mapStateToProps(state){
	return {
		agreementDetail: state.agreement
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
)(AgreementDetail)