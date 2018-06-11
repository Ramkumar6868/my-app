import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as farmerActions from '../../../actions/farmerActions';
import PropTypes from 'prop-types';
import FarmerList from './farmerList.js';

class Farmer extends React.Component {
	
	componentWillMount(){
		this.props.farmerActions.fetchFarmerList();
	}

	render(){if(!this.props.farmersList){
            return (
                <div>
                    Loading farmerLists
                </div>
            )
        }else{
            return (
                <div className="">
                    <FarmerList farmersList={this.props.farmersList}/>
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
