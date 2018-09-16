import React, { Component } from 'react';

import { Input, Menu, Button, Card, Icon, Label } from 'semantic-ui-react';
import dffdao from '../../ethereum/dffdao';
import Layout from '../../components/Layout';
import { Link } from '../../routes';
import web3 from '../../ethereum/web3';
import Members from '../../ethereum/Members';


class MembersIndex extends Component {	
	
	static async getInitialProps() {
		const members = new Members();
		await members.init();
		return { members };
	}

	renderMembers() {
		const { members } = this.props;
		const memberList = members.memberAddressMap;
		//console.log('renderMembers', memberList.length );
		const memberCards = [];
		//if (typeof memberList == 'Map') {
	    for (const [address, member] of memberList) {
			memberCards.push(
			<Card  key={member._index}>
				<Card.Header size='huge' >{member.name}<Icon name={member._governor ? 'favorite' : ''} color='purple' /></Card.Header>				
				<Card.Description>{member._exists ? 'Exists': 'Not active'}</Card.Description>
				<Card.Meta size='tiny'>{address}</Card.Meta>
			</Card>
		)};
		//} else {
		//	console.log('memberList is an unexpected type ', memberList, typeof memberList);
		//}
		
		return <Card.Group itemsPerRow={2}>{memberCards}</Card.Group>;
	}
	
	render() {
		const { members } = this.props;
		
		//console.log('render() ', this.props.memberList);
		
		return (
		<Layout>
		<div>
			<h3>Members</h3>
			<Label as='a' basic><Icon name='favorite' color='purple' />indicates Governor</Label>
			<Link route="/members/new" >
				<Button 
					content="Add Member"
					icon="add" 
					primary
					floated="right"
				/>
			</Link>
			{this.renderMembers()}
		</div>
		</Layout>
	)}
}

export default MembersIndex;