import React, { Component } from 'react';

import { List } from 'semantic-ui-react';
import { Provider, connect } from 'react-redux';
import storeFactory from '../configureStore';
import Providers from '../ethereum/providers';


class Accounts extends Component {
	constructor(props) {
		super(props);
	}
	
	handleItemSelection = async (event, data) => {
		event.preventDefault();
		//console.log('account clicked ', data.content);
		this.props.onAccountClick(data.content);
	}

	render() {
		console.log('Accounts render ', this.props.selectedAccount);
		const { accounts } = this.props;
		// Convert accounts to a format that can be used as List items 
		var accountItems = [];
		//console.log('accounts ', accounts);
		for (let a in accounts) {
			var renderObj = { key: a, content: accounts[a], as: 'a' };
			if (accounts[a] === this.props.selectedAccount) {
				renderObj.active = true;
			}
			accountItems.push(renderObj);
		}

		return (
		   <div>
			<h1>Select an account</h1>
			<List
				items={ accountItems }
				selection
				onItemClick={this.handleItemSelection}
				horizontal
				size='small'
			/>
		   </div>
	)}
}

export default Accounts;