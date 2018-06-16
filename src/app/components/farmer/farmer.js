import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as farmerActions from '../../../actions/farmerActions';
import PropTypes from 'prop-types';
import FarmerList from './farmerList.js';

class Farmer extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			FarmerDetail: {}
		};
		this.submitFarmerForm = this.submitFarmerForm.bind(this);
	}

	submitFarmerForm(farmer){
		console.log(farmer);
	}
	
	componentWillMount(){
		this.props.farmerActions.fetchFarmerList();
	}

	render(){if(!this.props.farmersList){
            return (
                <div>
                    Loading farmerLists
                </div>
            )
        } else {
            return (
                <div className="">
                    <FarmerList farmersList={this.props.farmersList} submitFarmerForm={(farmer)=>this.submitFarmerForm(farmer)}/>
                </div>
            )
        }
	}
}

Farmer.propTypes = {
	farmerActions: PropTypes.object,
	farmersList: PropTypes.array
};

function mapStateToProps(state){
	return {
		farmersList: state.farmer 
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
)(Farmer)
