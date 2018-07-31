import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';



const styles = {
  root: {
    flexGrow: 1,
  },
};

class AppMenu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			anchorEl: null,
			menuDetail: this.props.menuDetail
		};
	}

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    if(this.props.menuDetail.name){
	    return (
	      <div>
	        <Button
	          aria-owns={anchorEl ? 'simple-menu' : null}
	          aria-haspopup="true"
	          onClick={this.handleClick}
	          color="inherit"
	        >
	          {this.state.menuDetail.name}
	        </Button>
	        <Menu
	          id="simple-menu"
	          anchorEl={anchorEl}
	          open={Boolean(anchorEl)}
	          onClose={this.handleClose}
	        >
	        	{
	        		this.state.menuDetail.links.map((item, index) => {
	        			return (
	          				<MenuItem key={index} onClick={this.handleClose}><Link to={item.linkName}>{item.name}</Link></MenuItem>
	        				
	        			)
	        		})
	        	}
	        </Menu>
	      </div>
	    );
	} else {
		return (<div></div>)
	}
  }
}

class AppNavBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			farmerMenu: {
				name: 'farmer',
				links: [
					{
						name: 'Farmer List',
						linkName: '/farmer'
					},
					{
						name: 'Create Farmer',
						linkName: '/farmer/new'
					}
				]
			},
			agreementMenu: {
				name: 'agreements',
				links:[
					{
						name: 'Agreements List',
						linkName: '/agreement'
					},
					{
						name: 'New Agreement',
						linkName: '/agreement/new'
					}
				]
			},
			exportsEntitiesMenu: {
				name: "Exports Entities",
				links: [
					{
						name: 'Exports Entities List',
						linkName: '/exportsEntities'
					},
					{
						name: 'Create Exports Entity',
						linkName: '/exportsEntities/new'
					}
				]
			},
			exportsMenu: {
				name: "Exports",
				links: [
					{
						name: "Exports List",
						linkName: '/exports'
					},
					{
						name: "New Exports",
						linkName: '/exports/new'
					}
				]
			}
		};
	}
	
	render(){
		return (
				<AppBar position="fixed" className="appBar">
					<Toolbar>
						<Typography variant="title" color="inherit">
							GroundNut Business Managment
						</Typography>
						<Button color="inherit"><Link to='/' className="nav-link" color="inherit">Home</Link></Button>
						<AppMenu menuDetail={this.state.farmerMenu}/>
						<AppMenu menuDetail={this.state.agreementMenu}/>
						<AppMenu menuDetail={this.state.exportsMenu}/>
						<AppMenu menuDetail={this.state.exportsEntitiesMenu}/>
					</Toolbar>
				</AppBar>
		);
	}
}



export default withStyles(styles)(AppNavBar); 
			// <nav className="navbar navbar-expand-lg bg-dark">
			//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
			//       <ul className="navbar-nav">
			//         <li className="nav-item active">
			//           <Link to='/' className="nav-link">Home</Link>
			//         </li>
			//         <li className="nav-item">
			//           <Link to='/farmer' className="nav-link">Farmer</Link>
			//         </li>
			//         <li className="nav-item">
			//           <Link to='/agreement' className="nav-link">Agreement</Link>
			//         </li>
			//       </ul>
			//     </div>
			//   </nav>