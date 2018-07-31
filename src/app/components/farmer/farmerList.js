import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as farmerActions from '../../../actions/farmerActions';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

function RenderTableRaw(props){
	return(
		<TableRow key={props.farmer.id}>
			<TableCell>{props.farmer.firstName + " " + props.farmer.lastName}</TableCell>
			<TableCell>{props.farmer.fatherName}</TableCell>
			<TableCell>{props.farmer.village}</TableCell>
			<TableCell>{props.farmer.city}</TableCell>
			<TableCell>{props.farmer.mobileNumber}</TableCell>
			<TableCell>{props.farmer.extraInfo}</TableCell>
			<TableCell>
				<Link to={"/farmer/new/" + props.farmer.id}>
					<Button variant="outlined" href="">
						Edit
					</Button>
				</Link>
			</TableCell>
		</TableRow>
	)
}

class FarmerList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showMadal: false,
			updateFormDetails: {},
			farmersList: [],
		}
	}

	componentWillMount(){
		var farmersList = this.props.farmerActions.fetchFarmerList().farmersList;
		this.setState({
			farmersList: farmersList
		});
	}

	render(){
		return (
			<Grid item lg={12}>
				<Grid item>
					<Paper elevation={1}>
						<Typography variant="headline" component="h1" className="center grey">
							Farmers Lists
						</Typography>
						<Typography component="div">			
							<Table className="striped">
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Father Name</TableCell>
										<TableCell>Village</TableCell>
										<TableCell>City</TableCell>
										<TableCell>Mobile</TableCell>
										<TableCell>Extra Information</TableCell>
										<TableCell>Edit Details</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{	
							            this.state.farmersList.map((farmer, index) => {
							                return (
							                    <RenderTableRaw key={index} farmer={farmer}/>
							                );
							            })
							        }
							    </TableBody>
				            </Table>
	            		</Typography>
	            	</Paper>
	            </Grid>

	            <Grid>
	            	<Link to="farmer/new">
		            	<Button variant="outlined" href="" className="right">
							Create Farmer
						</Button>
					</Link>
	            </Grid>
	        </Grid>
		)
	}
}

FarmerList.propTypes = {
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
)(FarmerList)
