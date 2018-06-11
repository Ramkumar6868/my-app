import React from 'react';

function renderTableRaw(item){
	return(
		<tr key={item.id}>
			<td>{item.firstName + " " + item.lastName}</td>
			<td>{item.fatherName}</td>
			<td>{item.village}</td>
			<td>{item.city}</td>
			<td>{item.mobileNumber}</td>
			<td>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#farmerNew">
					Edit
				</button>
	            <div className="modal fade" id="farmerNew" tabIndex="-1" role="dialog" aria-labelledby={"farmerNew"+item.id + "Label"} aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        ...
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="button" className="btn btn-primary">Save changes</button>
				      </div>
				    </div>
				  </div>
				</div>
			</td>
		</tr>
	)
}

export default function FarmerList(props) {
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
							<th></th>
						</tr>
					</thead>
					<tbody>
						{	
				            props.farmersList.map((item, index) => {
				                return (
				                    renderTableRaw(item)
				                );
				            })
				        }
				    </tbody>
	            </table>
	            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
  Open modal
</button>

<div className="modal" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">Modal Heading</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>


      <div className="modal-body">
        Modal body..
      </div>


      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
	        </div>
	)
}