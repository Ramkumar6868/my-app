import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as farmerActions from '../../../actions/farmerActions';
import PropTypes from 'prop-types';

class FarmerForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			farmerFormDetail: {...this.props.farmerFormDetail}
		};
		this.submitFarmerForm = this.submitFarmerForm.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleCloseModel = this.handleCloseModel.bind(this);
	}

	handleCloseModel(event){
		event.preventDefault();
		this.props.handleCloseModel();
	}

	submitFarmerForm(event){
		event.preventDefault();
		this.props.farmerActions.addToFarmerList(this.state.farmerFormDetail);
		this.props.handleCloseModel();
	}

	handleOnChange(event){
		event.preventDefault();
		const farmerFormDetail = this.state.farmerFormDetail;
		farmerFormDetail[event.target.name] = event.target.value;
		this.setState({
			farmerFormDetail: farmerFormDetail
		});
	}

	render(){
		return(
			<div>
				<h2 className="bg-secondary text-center rounded-top">Enter/Update Farmer Details</h2>
				<form onSubmit={this.submitFarmerForm}>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput">First name</label>
				    <input type="text" name="firstName" className="form-control" value={this.state.farmerFormDetail.firstName} onChange={this.handleOnChange} placeholder="Enter farmer first name"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Last Name</label>
				    <input type="text" name="lastName" className="form-control" value={this.state.farmerFormDetail.lastName} onChange={this.handleOnChange} placeholder="Enter farmer last name"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Father Name</label>
				    <input type="text" name="fatherName" className="form-control" value={this.state.farmerFormDetail.fatherName} onChange={this.handleOnChange} placeholder="Enter farmer father name"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Village</label>
				    <input type="text" name="village" className="form-control" value={this.state.farmerFormDetail.village} onChange={this.handleOnChange} placeholder="Enter farmer village"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">City</label>
				    <input type="text" name="city" className="form-control" value={this.state.farmerFormDetail.city} onChange={this.handleOnChange} placeholder="Enter farmer city"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Mobile Number</label>
				    <input type="text" name="mobileNumber" className="form-control" value={this.state.farmerFormDetail.mobileNumber} onChange={this.handleOnChange} placeholder="Enter farmer mobile number"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Extra Info</label>
				    <textarea name="extraInfo" className="form-control" value={this.state.farmerFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Extra Information about farmer" rows="3"></textarea>
				  </div>
				  <button className="btn btn-secondary" onClick={this.handleCloseModel}>cancel</button>
				  <button type="submit" className="btn btn-primary float-right">Submit</button>
				</form>
			</div>
		)
	}
}


FarmerForm.propTypes = {
	farmerActions: PropTypes.object,
	farmerLists: PropTypes.array
}

function mapStateToProps(state){
	return {
		farmerList: state.farmer
	};
}

function mapDispatchToProps(dispatch){
	return {
		farmerActions: bindActionCreators(farmerActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FarmerForm)
