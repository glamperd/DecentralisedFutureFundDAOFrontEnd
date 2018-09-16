import React, { Component } from 'react';

import { Container, Header, Image, Label, Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import dffdao from '../../ethereum/dffdao';
import bttsTokenContract from '../../ethereum/bttsToken';

class TokenIndex extends Component {
	static async getInitialProps(props) {
		const tokenAddress = await dffdao.methods.bttsToken().call();
		console.log('tokenAddress', tokenAddress);
		const bttsToken = bttsTokenContract(tokenAddress);
		//console.log('bttsToken ', bttsToken);
	
		const results = await Promise.all([
			bttsToken.methods.name().call(),
			bttsToken.methods.symbol().call(),
			bttsToken.methods.decimals().call(),
			bttsToken.methods.bttsVersion().call()
		]);
		console.log('results ', results);
		
		return { 
			tokenAddress: tokenAddress,
			tokenDecimals: results[2],
			tokenName: results[0],
			tokenSymbol: results[1],
			bttsVersion: results[3]
		};
	}

	render() {	
		const {
			tokenAddress,
			tokenDecimals,
			tokenName,
			tokenSymbol,
			bttsVersion
		} = this.props;
		
		return (
		<Layout>
		<Segment>
			<Label as='a' color='teal' ribbon>BTTS Token</Label>
			
			<p>Token address: {tokenAddress}</p>
			<p>Token Name: {tokenName}</p>
			<p>Token Symbol: {tokenSymbol}</p>
			<p>BTTS Version: {bttsVersion}</p>
			
		</Segment>
		</Layout>
	)}
}

export default TokenIndex;