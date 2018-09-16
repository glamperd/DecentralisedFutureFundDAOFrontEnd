import React, { Component } from 'react';

import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from '../../routes';
import dffdao from '../../ethereum/dffdao';
import Layout from '../../components/Layout';


class DffDaoIndex extends Component {	
	static async getInitialProps() {
		const propCount = await dffdao.methods.numberOfProposals().call();
		console.log("NumberOfProposals: ", propCount);
		const proposals = [];
		for (var i=0; i<propCount; i++) {
			const proposal = await dffdao.methods.getProposalData1(i).call();
			console.log('Got proposal ', i);
			proposals.push(proposal._description);
		}
		
		return { proposals };
	}

	renderProposals() {
		const items = this.props.proposals.map((prop, index) => {
			console.log('proposal ', prop);
			return {
				header: prop,
				description: (
					<Link route={`/proposals/${index}`}>
						<a>View Proposal</a>
					</Link>
				),
				fluid: true
			}
		});
		
		return <Card.Group items={items} />;
	}
	
	render() {
		
		return (
		<Layout>
		<div>
			<h3>Current Proposals</h3>
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
			{this.renderProposals()}
		</div>
		</Layout>
	)}
}

export default DffDaoIndex;