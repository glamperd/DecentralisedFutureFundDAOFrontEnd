import React, { Component } from 'react';
import { Link } from '../routes';
import { Button, Table, Card, Grid, Segment, Label, Icon, Statistic, Container } from 'semantic-ui-react';
import dffdao from '../ethereum/dffdao';
import { web3, personal } from '../ethereum/web3';
//import personal from 'web3-eth-personal';

class Proposal extends Component {
	state = {
		value: '',
		errorMessage: '',
		loading: false
	};
		
	//TODO: reduxify this
	onSubmit = async (isYes) => {
			event.preventDefault();
			this.setState({ loading: true, errorMessage: '' });

			try {
				console.log('Proposal.onSubmit', isYes, 'prop', this.props.proposal.id, 'acc', this.props.selectedAccount);
				//const accounts = await web3.eth.getAccounts();
				
				console.log('personal ', personal);
				// Unlock account (if using geth as wallet)
				await personal.unlockAccount(this.props.selectedAccount, "", 60);
				console.log('account unlocked');

				var txHash;
				if (isYes) {
					dffdao.methods
						.voteYes(this.props.proposal.id)
						.send({
							from: this.props.selectedAccount
						})
						.then((hash, err) => {
							if (err) {
								console.log('Error sending vote transaction:', err.message);
							} else {
								console.log('vote tx returned', hash);
								txHash = hash;
							}
						})
				} else {
					txHash = await dffdao.methods
					.voteNo(this.props.proposal.id)
					.send({
						from: this.props.selectedAccount
					});
					
				}
				console.log('vote transaction sent');
				//Router.pushRoute('/');
			} catch (err) {
				console.log('Error sending transaction ', err.message);
				this.setState({errorMessage: err.message});
			}
			this.setState({ loading: false })
	};

	
	render () {
		const { proposal } = this.props;
		
		//const proposalApproved = this.props.proposal.memberYesVotes > proposal.memberNoVotes;
		
		//console.log('render() ', this.props);
		var typeText = '';
		var amountDenom = '';
		switch (proposal.type) {
			case '0': 
				typeText = "Ether Payment";
				amountDenom = 'ETH';
				break;
			case '1':
				typeText = "DFF Token Payment";
				amountDenom = 'DFF';
				break;
			case '2':
				typeText = "Other Token Payment";
				amountDenom = 'X'
				break;
			case '3':
				typeText = "Mint Tokens";
				break;
			case '4':
				typeText = "AddRule";
			case '5': 
				typeText = "Delete Rule";
				break;
			case '6':
				typeText = "Update BTTS Token";
				break;
			case '7':
				typeText = "Update DAO";
				break;
			case '8':
				typeText = "Add Member";
				break;
			case '9':
				typeText = "Add Governor";
				break;
			case '10':
				typeText = "Remove Member";
		};
		
		const voteResult = "PENDING";
		const openText = proposal.open ? "OPEN" : "CLOSED";
		const labelColour="teal";

	    return (
	      <div>
			<Grid columns={2}>
			 <Grid.Row>
			  <Grid.Column>
			   <Segment.Group>
			  	<Segment>
			        <Label as='a' color={labelColour} ribbon>Description</Label>
			        {proposal.description}
		        </Segment>
			  	<Segment>
			        <Label as='a' color={labelColour} ribbon>Type</Label>
			        {typeText}
			    </Segment>
			    <Segment>
			        <Label as='a' color={labelColour} ribbon>Amount</Label>
			        <Statistic horizontal value={proposal.amount}
			        	label={amountDenom} />
			    </Segment>
			    <Segment>
			        <Label as='a' color={labelColour} ribbon>Token</Label>
			        {proposal.tokenContract}
			    </Segment>
			    <Segment>
			        <Label as='a' color={labelColour} ribbon>Votes</Label>
			        <Table definition columns='3'>
				        <Table.Header>
				         <Table.Row>
				          <Table.HeaderCell />
				          <Table.HeaderCell textAlign='center'><Icon name="checkmark" color="red" size="large"  /></Table.HeaderCell>
				          <Table.HeaderCell textAlign='center' ><Icon name="remove" color="green"  size="large" /></Table.HeaderCell>
				         </Table.Row>
				        </Table.Header>
	
				        <Table.Body>
				         <Table.Row>
				          <Table.Cell>Governors</Table.Cell>
				          <Table.Cell textAlign='center' size='big'>{proposal.govYesVotes}</Table.Cell>
				          <Table.Cell textAlign='center' size='big'>{proposal.govNoVotes}</Table.Cell>
				         </Table.Row>
				         <Table.Row>
				          <Table.Cell>Members</Table.Cell>
				          <Table.Cell textAlign='center' size='big'>{proposal.memberYesVotes}</Table.Cell>
				          <Table.Cell textAlign='center' size='big'>{proposal.memberNoVotes}</Table.Cell>
				         </Table.Row>
				        </Table.Body>
				        <Label style={{ marginTop: '10px', marginBottom: '20px' }} >Result: </Label>
				        {voteResult}
			        </Table>
			    </Segment>
				 <Segment>
				 	<Label as='a' color={labelColour} ribbon>Cast Your Vote</Label>
				     <Button 
				        	positive 
				        	onClick={event => this.onSubmit({ isYes: true })}
				        	loading={this.state.loading}
				        	circular>Vote Yes</Button>
			        <Button 
			        	negative 
			        	onClick={event => this.onSubmit({ isYes: false })}
			        	loading={this.state.loading}
			        	circular>Vote No</Button>
				 </Segment>
		      </Segment.Group>

			  </Grid.Column>
			  <Grid.Column>
			  		<Container textAlign='center'>
			          <Label as='a' color={proposal.open ? 'green' : 'black'} size="huge" >
			        	{openText}
			          </Label>
			        </Container>
					<Segment.Group>
				  	 <Segment>
				        <Label as='a' color={labelColour} ribbon>Proposer</Label>
				        <p>{proposal.proposerName}</p>
				        <p>{proposal.proposer}</p>
			         </Segment>
				  	 <Segment>
				        <Label as='a' color={labelColour} ribbon>Governor</Label>
				        <p>{proposal.governorName}</p>
				        <p>{proposal.governor}</p>
				     </Segment>
				  	 <Segment>
				        <Label as='a' color={labelColour} ribbon>Addresses</Label>
				        <p>{proposal.address1}</p>
				        <p>{proposal.address2}</p>
				     </Segment>
				  	 <Segment>
				        <Label as='a' color={labelColour} ribbon>Recipient</Label>
				        {proposal.recipient}
				     </Segment>
				  	 <Segment>
				        <Label as='a' color={labelColour} ribbon>Executor</Label>
				        <p>{proposal.executorName}</p>
				        <p>{proposal.executor}</p>
				     </Segment>
			      </Segment.Group>
			  
			  </Grid.Column>
			 </Grid.Row>
			 
			</Grid>
		  </div>
	    )
	};
}

export default Proposal;
