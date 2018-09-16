import React, { Component } from 'react';

import { Input, Menu, Icon, Label, List } from 'semantic-ui-react';
import { Link } from '../../routes';
//import web3 from '../../ethereum/web3';
import Providers, { SourceEnum } from '../../ethereum/providers';
import { Provider, connect } from 'react-redux';

import storeFactory from '../../configureStore';
import Layout from '../../components/Layout';
import Sources from '../../components/Sources';
import Accounts from '../../components/Accounts';
import { getAccounts } from '../../actions/actions';

const { store, persistor } = storeFactory();

//import Members from '../../ethereum/Members';

const mapStateToProps = (state) => {

	console.log('state.selectedAccount', state.accounts.selectedAccount);
	return { 
			 selectedSigner: state.provider.selectedSigner,
			 accounts: state.accounts.accounts,
			 selectedAccount: state.accounts.selectedAccount
		};
};

const mapDispatchersToProps = (dispatch) => {
	return {
		onSignerClick: (prov) => {
			console.log('onSignerClick:', prov);
			dispatch({
				type: 'SET_SIGNER',
				text: prov
			});
			dispatch(getAccounts(prov));
		},
		setAccounts: (acc) => {
			dispatch({
				type: 'SET_ACCOUNTS',
				text: acc
			})
		},
		onAccountClick: (account) => {
			console.log('onAccountClick', account);
			dispatch({
				type: 'SELECT_ACCOUNT',
				text: account
			})
		}
	}
}

const ConnectedSources = connect(mapStateToProps, mapDispatchersToProps)(Sources);
const ConnectedAccounts = connect(mapStateToProps, mapDispatchersToProps)(Accounts);

class AccountsIndex extends Component {
	constructor(props, context) {
		super(props, context);
		//console.log('AccountsIndex context ', props);
	}
	
	render() {
		console.log('render', this.props.selectedAccount);
		//const { state } = this.props;
		return (
		  <Layout store={store}>
			<Provider store={store}>
		     <div>
			    <h3>Account Settings</h3>
				<ConnectedSources  selectedSigner={this.props.selectedSigner} />
				<ConnectedAccounts selectedAccount={this.props.selectedAccount} />
		     </div>
			</Provider>
		  </Layout>
	)}
}

export default AccountsIndex;