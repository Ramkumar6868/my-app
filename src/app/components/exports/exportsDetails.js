import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as exportsActions from '../../../actions/exportsActions.js';
import * as exportsEntitiesActions from '../../../actions/exportsEntitiesActions.js';
import {Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
 


class ExportsDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			exportsDetail: false,
			toRedirect: false
		}
	}

	componentWillMount(){
		if(this.props.match.params.id){
			var exportsDetail = this.props.exportsActions.fetchExportsDetail(this.props.match.params.id).exportsDetail
			this.setState({
				exportsDetail: exportsDetail
			});
		}

	}

	render(){
		if(this.state.toRedirect){
			return <Redirect to='/exports' />
		}
		return (
			<Grid>
				<Grid item>
					<Typography variant="headline" component="h1" className="center grey">
						Exports Detail
					</Typography>
					<Typography component="div">
						<Button variant="contained">Exports List</Button>
						<Button type="submit" variant="contained" color="primary" className="right">Submit
						</Button>
					</Typography>
				</Grid>
			</Grid>
		)
	}
}

ExportsDetail.propTypes = {
	exportsActions: PropTypes.object,
	exportsDetail: PropTypes.object
}

function mapStateToProps(state){
	return {
		exportsDetail: state.exportsDetail
	}
}

function mapDispatchToProps(dispatch){
	return {
		exportsActions: bindActionCreators(exportsActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExportsDetail);