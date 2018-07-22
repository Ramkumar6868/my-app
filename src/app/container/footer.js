import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


export default class Footer extends React.Component {
	
	render(){
		return(
			<footer className="footer">
				<BottomNavigation className="center grey darken-4 " showLabels >
					<BottomNavigationAction className="grey-text footer-label" label="Powered By: @ Ram Kumar Kulriya"/>
				</BottomNavigation>
			</footer>
		)
	}
}
			
// <nav className="navbar navbar-expand-sm fixed-bottom center grey darken-4">
// 				  <ul className="navbar-nav">
// 				    <li className="nav-item">
// 				      <span>Powered By: @ Ram Kumar Kulriya</span>
// 				    </li>
// 				  </ul>
// 			</nav>


				// <AppBar className="grey darken-4">     <Toolbar
				// className="center">         <span>Powered By: @ Ram Kumar
				// Kulriya</span>     </Toolbar> </AppBar>
