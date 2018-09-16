import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
import { Provider, connect } from 'react-redux';

import storeFactory from '../configureStore';
const { store, persistor } = storeFactory();

const mapStateToProps = (state) => {
	return { 
		 activeItem: state.menu.activeItem
		};
};

const mapDispatchersToProps = (dispatch) => {
	return {
		onMenuClick: (page) => {
			console.log('onMenuClick ', page);
			dispatch({
				type: 'NEW_PAGE',
				text: page
			});
		}
	}
}


class SiteMenu extends Component {
  //state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
	  
	  this.props.onMenuClick(name);
	  console.log('handleItemClick ', name);
	//this.setState({ activeItem: name })
  }

  render() {
	const { activeItem } = this.props;
	console.log('menu active item: ', activeItem);
  
	return (
	  <div>
		<Menu attached='top' tabular style={{ marginTop: '10px', marginBottom: '20px' }} size="massive">
		  <Menu.Item 
		  	name='home' 
		  	active={activeItem === 'home'} 
		    onClick={this.handleItemClick} 
		   >
			<Link route="/">
			  <a className="item">Home</a>
			</Link>
		  </Menu.Item>
		  <Menu.Item 
		  	name='proposals' 
		  	active={activeItem === 'proposals'}
		    onClick={this.handleItemClick} 
		  >
			<Link route="/proposals">
			    <a className="item">Proposals</a>
			</Link>
		  </Menu.Item>
		  <Menu.Item 
		  	name='members' 
		  	active={activeItem === 'members'} 
		  	onClick={this.handleItemClick}
		  >
			  <Link route="/members">
			    <a className="item">Members</a>
			  </Link>
		  </Menu.Item>
		  <Menu.Item 
		  	name='token' 
		  	active={activeItem === 'token'} 
		  	onClick={this.handleItemClick}
		  >
			  <Link route="/token">
			    <a className="item">Token</a>
			  </Link>
		  </Menu.Item>
		  <Menu.Item 
			  	name='account' 
			  	active={activeItem === 'account'} 
			  	onClick={this.handleItemClick}
		   >
			  <Link route="/account">
			    <a className="item">Account Settings</a>
			  </Link>
		   </Menu.Item>
		  </Menu>
	  </div>
	)
  }
}

export default connect(mapStateToProps, mapDispatchersToProps)(SiteMenu);
