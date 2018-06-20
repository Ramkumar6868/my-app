import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as agreementActions from '../../../actions/agreementActions.js';
import PropTypes from 'prop-types';


class AgreementForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			agreementFormDetail: Object.clone(this.props.agreementFormDetail) 
		}
		this.submitAgreementForm = this.submitAgreementForm.bind(this);
	}

	submitAgreementForm(event){
		event.preventDefault();
		this.props.handleAgreementFormCloseModel();
	}

	handleOnChange(event){
		event.preventDefault();
		const agreementFormDetail = this.state.agreementFormDetail;
		agreementFormDetail[event.target.name] = event.target.value;
		this.setState({
			agreementFormDetail: agreementFormDetail
		});
	}

	render(){
		return(
			<div>
				<h2 className="bg-secondary text-center rounded-top">Create/Update Agreement</h2>
				<form onSubmit={this.submitAgreementForm}>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput">Select Farmer Name</label>
				    <input type="text" name="firstName" className="form-control" value={this.state.agreementFormDetail.farmer.id} onChange={this.handleOnChange} placeholder="Enter farmer first name"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Extra Info</label>
				    <textarea name="extraInfo" className="form-control" value={this.state.agreementFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Extra Information about farmer" rows="3"></textarea>
				  </div>
				  <button className="btn btn-secondary" onClick={this.handleAgreementFormCloseModel}>cancel</button>
				  <button type="submit" className="btn btn-primary float-right">Submit</button>
				</form>
			</div>
		)
	}
}

AgreementForm.propTypes = {
	agreementActions: PropTypes.object,
	agreementsList: PropTypes.array
}

function mapStateToProps(state){
	return {
		agreementsList: state.agreement
	};
}

function mapDispatchToProps(dispatch){
	return {
		agreementActions: bindActionCreators(agreementActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AgreementForm);