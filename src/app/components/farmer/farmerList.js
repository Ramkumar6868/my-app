import React from 'react';
import FarmerForm from './farmerForm.js';
import Modal from 'react-modal';


const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		overflow: 'scroll',
		height: '500px',
		width: '800px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

function RenderTableRaw(props){
	return(
		<tr key={props.farmer.id}>
			<td>{props.farmer.firstName + " " + props.farmer.lastName}</td>
			<td>{props.farmer.fatherName}</td>
			<td>{props.farmer.village}</td>
			<td>{props.farmer.city}</td>
			<td>{props.farmer.mobileNumber}</td>
			<td>{props.farmer.extraInfo}</td>
			<td>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#farmerNew" onClick={()=>props.openFarmerForm(props.farmer)}>
					Edit
				</button>
			</td>
		</tr>
	)
}

export default class FarmerList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showMadal: false,
			updateFormDetails: {},
			newFarmer: {
				firstName: "",
				lastName: "",
				fatherName: "",
				village: "",
				city: "",
				mobileNumber: "",
				extraInfo: "",
				id: null
			} 
		}
		this.openFarmerForm = this.openFarmerForm.bind(this);
		this.handleCloseModel = this.handleCloseModel.bind(this);
	}

	openFarmerForm(item){
		this.setState({
			showMadal: true,
			updateFormDetails: item
		});
		console.log(item);
	}

	handleCloseModel(){
		this.setState({
			showMadal: false
		});
	}

	render(){
		return (
			<div>
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Name</th>
							<th>Father Name</th>
							<th>Village</th>
							<th>City</th>
							<th>Mobile</th>
							<th>Extra Information</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{	
				            this.props.farmersList.map((farmer, index) => {
				                return (
				                    <RenderTableRaw key={farmer.id} farmer={farmer} openFarmerForm={(farmer)=> this.openFarmerForm(farmer)}/>
				                );
				            })
				        }
				    </tbody>
	            </table>
	            <div>
	            	<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#farmerNew" onClick={()=>this.openFarmerForm(this.state.newFarmer)}>
						Create Farmer
					</button>
	            </div>
	            <div>
	            	<Modal
			          isOpen={this.state.showMadal}
			          
			          style={modalStyle}
			          contentLabel="Famer Form"
			          ariaHideApp={false}
			        >
			        <FarmerForm farmerFormDetail={this.state.updateFormDetails} handleCloseModel={this.handleCloseModel}/>
			        </Modal>
	            </div>
	        </div>
		)
	}
}