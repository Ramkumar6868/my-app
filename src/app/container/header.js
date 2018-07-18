import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
	render() {

		return(
			<nav className="navbar navbar-expand-lg bg-dark">
			    <a className="navbar-brand" href="/">GroundNut</a>
			    <div className="collapse navbar-collapse" id="navbarSupportedContent">
			      <ul className="navbar-nav">
			        <li className="nav-item active">
			          <Link to='/' className="nav-link">Home</Link>
			        </li>
			        <li className="nav-item">
			          <Link to='/farmer' className="nav-link">Farmer</Link>
			        </li>
			        <li className="nav-item">
			          <Link to='/agreement' className="nav-link">Agreement</Link>
			        </li>
			      </ul>
			    </div>
			  </nav>
		)
	}
} 