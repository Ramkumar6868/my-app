import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as farmerActions from '../../../actions/farmerActions';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


class PaymentEntryForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			paymentFormDetail: {
				type: this.props.entityDetail.type,
				entity_id: this.props.entityDetail.entity_id,
				entity_type: this.props.entityDetail.entity_type,
				paymentMode: "",
				date: "",
				extraInfo: ""
			}
		};
		this.submitPaymetEntry = this.submitPaymetEntry.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	submitPaymetEntry(event){
		event.preventDefault();
	}

	handleOnChange(event){
		event.preventDefault();
		var paymentFormDetail = this.state.paymentFormDetail;
		paymentFormDetail[event.target.name] = event.target.value;
		this.setState({
			paymentFormDetail: paymentFormDetail
		});
	}

	componentWillMount(){
	}

	render(){
		return(
			<Grid>
				<form onSubmit={this.submitPaymetEntry}>
					<DialogContent>
						<Grid item>
							<Typography component="div">
									<FormControl fullWidth margin="normal">
										<InputLabel>Type of payment</InputLabel>
										<Select
									    	value={this.state.paymentFormDetail.type}
									    	onChange={this.handleOnChange}
									    	name="type"
									    >
									    	<MenuItem value="credit">credit</MenuItem>
									    	<MenuItem value="debit">debit</MenuItem>
									    </Select>
									</FormControl>
									<FormControl fullWidth margin="normal">
										<InputLabel>Payment mode</InputLabel>
										<Select
									    	value={this.state.paymentFormDetail.paymentMode}
									    	onChange={this.handleOnChange}
									    	name="paymentMode"
									    >
									    	<MenuItem value="cash">cash</MenuItem>
									    	<MenuItem value="check">check</MenuItem>
									    	<MenuItem value="online">online</MenuItem>
									    </Select>
									</FormControl>
									<FormControl fullWidth margin="normal">
										<InputLabel>Payment date</InputLabel>
										<Input type="date" name="date" value={this.state.paymentFormDetail.date} onChange={this.handleOnChange} placeholder="Enter Date of payment"/>
									</FormControl>
									<FormControl fullWidth margin="normal">
										<TextField name="extraInfo" value={this.state.paymentFormDetail.extraInfo} onChange={this.handleOnChange} placeholder="Extra Information about payment" multiline rowsMax="3" margin="normal" label="Extra Information"></TextField>
									</FormControl>
									
							</Typography>
						</Grid>
					</DialogContent>
					<DialogActions>
		            	<Button variant="contained">Cancel</Button>
						<Button type="submit" variant="contained" color="primary" className="right">Submit</Button>
		          	</DialogActions>
				</form>
			</Grid>
		)
	}
}


PaymentEntryForm.propTypes = {
	farmerActions: PropTypes.object,
	farmerDetail: PropTypes.object
}

function mapStateToProps(state){
	return {
		farmerDetail: state.farmerDetail,

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
)(PaymentEntryForm)
