import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as exportsActions from '../../../actions/exportsActions.js';
import * as exportsEntitiesActions from '../../../actions/exportsEntitiesActions.js';
import SupplyDetail from '../supply/supplyDetails.js';
import {Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
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
					<Paper elevation={1}>
						<Typography variant="headline" component="h1" className="center grey">
							Exports Detail
						</Typography>
						<Typography component="div">
							<Table className="striped">
								<TableBody>
									<TableRow>
										<TableCell><b>Exporter</b></TableCell>
										<TableCell>{this.state.exportsDetail.exporter.name + ", " + this.state.exportsDetail.exporter.address + "(" + this.state.exportsDetail.exporter.contactNumber + ")"}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Contacted By(Dalal)</b></TableCell>
										<TableCell>{this.state.exportsDetail.contactedBy.name + ", " + this.state.exportsDetail.contactedBy.address + "(" + this.state.exportsDetail.contactedBy.contactNumber + ")"}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Groundnut Type</b></TableCell>
										<TableCell>{this.state.exportsDetail.groundnutType}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Rate(per Kg)</b></TableCell>
										<TableCell>{this.state.exportsDetail.rate}</TableCell>
									</TableRow>						
									<TableRow>
										<TableCell><b>Weight(in Kg)</b></TableCell>
										<TableCell>{this.state.exportsDetail.weight}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Weight Cut(in Kg)</b></TableCell>
										<TableCell>{this.state.exportsDetail.weightCut}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Commitment Date</b></TableCell>
										<TableCell>{this.state.exportsDetail.commitmentDate}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Settlement Date</b></TableCell>
										<TableCell>{this.state.exportsDetail.settlementDate}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Total Payment</b></TableCell>
										<TableCell>{this.state.exportsDetail.totalPayment}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Real Payment</b></TableCell>
										<TableCell>{this.state.exportsDetail.actualTotalPayment}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell><b>Extra Info</b></TableCell>
										<TableCell>{this.state.exportsDetail.extraInfo}</TableCell>
									</TableRow>
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell>
											<Link to={"/exports/new/" + this.state.exportsDetail.id}>
												<Button variant="contained" href="" className="right">Edit Exports</Button>
											</Link>
										</TableCell>
									</TableRow>
								</TableFooter>
							</Table>
						</Typography>
					</Paper>
				</Grid>
				<Grid>
					<SupplyDetail exports_id={this.state.exportsDetail.id} />
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