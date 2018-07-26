import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

export default class DropMenu extends React.Component {
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