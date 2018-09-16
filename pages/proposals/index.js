import React, { Component } from 'react';
import { Link } from '../../routes';
import { Button,  Pagination } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Proposal from '../../components/Proposal';
import dffdao from '../../ethereum/dffdao';
import Members from '../../ethereum/Members';
import BigNumber from 'big-number';
import web3 from '../../ethereum/web3';


import Providers, { SourceEnum } from '../../ethereum/providers';
import { Provider, connect } from 'react-redux';

import storeFactory from '../../configureStore';

const { store, persistor } = storeFactory();

const mapStateToProps = (state) => {

	console.log('state.selectedAccount', state.accounts.selectedAccount);
	return { 
			 selectedSigner: state.provider.selectedSigner,
			 selectedAccount: "0xa22AB8A9D641CE77e06D98b7D7065d324D3d6976" //state.accounts.selectedAccount
		};
};

const mapDispatchersToProps = (dispatch) => {
	return {
		onVoteClick: (vote) => {
			console.log('onVoteClick:', vote);
			dispatch({
				type: 'SET_VOTE',
				text: vote
			});
		}
	}
}

const ConnectedProposal = connect(mapStateToProps, mapDispatchersToProps)(Proposal);


class ProposalShow extends Component {
	/*state = {
			value: '',
			errorMessage: '',
			loading: false,
			activeProposal: 1,
			proposal: {},
			members: {}
		};
	*/
	/**
	 * Called on selection of page in the Pagination controller
	 * N.B. Pagination controller starts at 1, whereas proposals in the contract are indexed from 0.
	 * Hence, subtract 1 to retrieve the correct proposal.
	 */
	//TODO: reduxify this
	handlePaginationChange = async (e, { activeProposal, members }) => {
		console.log('handlePaginationChange', activeProposal)
		proposal = ProposalShow.getProposal(activeProposal-1, members);

		this.setState({ activeProposal, proposal })
	}

	static async getInitialProps(props) {
		console.log('getInitialProps');
		const members = new Members;
		const results = await Promise.all([
			dffdao.methods.numberOfProposals().call(),
			members.init()
		]);
		
		const propCount = results[0];
		
		//console.log('results[1]', results[1]);
		
		const prop = (propCount > 0) ? await ProposalShow.getProposal(0, members) : {};
		
		//const selectedAccount = sessionStorage.getItem("selectedAccount");
		//console.log("getinitprops- selectedAccount: ", selectedAccount);
		return ({
			numberOfProposals: propCount,
			proposal: prop,
			members: members
		});
	}	
	
	/* Load proposal from blockchain
	 * 
	 */ 
	static async getProposal (proposalId, members) {
		console.log('get proposal no ', proposalId);
		const proposalData = await Promise.all([
			dffdao.methods.getProposalData1(proposalId).call(),
			dffdao.methods.getProposalData2(proposalId).call(),
			dffdao.methods.getProposalData3(proposalId).call(),
			dffdao.methods.TOKEN_DECIMALSFACTOR().call()]);
		//console.log(memberAddressMap);
		
		const addr0 = new BigNumber(0);
		
		const proposer = proposalData[0]._proposer;
		const proposerName = members.getName(proposer);
		const governor = (governor == addr0) ? 'n/a' :proposalData[0]._governor;
		const governorName = members.getName(governor);
		const executor = proposalData[2]._executor;
		const executorName = (executor == addr0) ? 'n/a' : members.getName(executor);
		
		console.log('proposerName', proposerName, ' executorName', executorName);
		
		return { 
			id: proposalId,
			type: proposalData[0]._proposalType,
			proposer: proposer,
			proposerName: proposerName,
			governor: governor,
			governorName: governorName,
			description: proposalData[0]._description,
			address1: proposalData[1]._address1,
			address2: proposalData[1]._address2,
			recipient: proposalData[1]._recipient,
			tokenContract: proposalData[1]._tokenContract,
			amount: Math.round(parseInt(proposalData[1]._amount) / proposalData[3]),
			memberNoVotes: proposalData[2]._memberVotedNo,
			memberYesVotes: proposalData[2]._memberVotedYes,
			govNoVotes: proposalData[2]._governorVotedNo,
			govYesVotes: proposalData[2]._governorVotedYes,
			executor: executor,
			executorName: executorName,
			open: proposalData[2]._open
		};
	}
	
	render () {
	    const { activeProposal } = 0; //this.state
	    const { numberOfProposals, proposal } = this.props;
	    console.log('index render()');

	    return (
  		  <Layout store={store}>
		   <Provider store={store}>
		    <div>
			<Pagination 
				defaultActivePage={0} //this.state.activeProposal} 
				totalPages={this.props.numberOfProposals} 
				onPageChange={this.handlePaginationChange} 
			/>
			<Link route="/proposals/new" >
				<a>
				  <Button 
						content="Create Proposal"
						icon="add" 
						primary
						floated="right"					
				  />
				</a>
			</Link>
			<ConnectedProposal proposal={proposal} />
			</div>
		  </Provider>
		</Layout>
	    )
	};
}

export default ProposalShow;
