import React, { Component } from 'react';

import { Container, Header, Image } from 'semantic-ui-react';
import Layout from '../components/Layout';
import dffdao from '../ethereum/dffdao';
//import logo from '../dfftxt.png';

class DffDaoIndex extends Component {
	static async getInitialProps(props) {
		console.log('/ getInitialProps');
		//console.log('(init)tokenAddress promise:', p);
		var tokenAddress = await dffdao.methods.bttsToken().call();
		console.log('(init)tokenAddress:', typeof tokenAddress);
		const tokenDecimals = await dffdao.methods.TOKEN_DECIMALS().call();
		var tokensGov = await dffdao.methods.tokensForNewGoverningMembers().call();
		var tokensMem = await dffdao.methods.tokensForNewMembers().call();
		
		return { 
			tokenAddress: tokenAddress,
			tokenDecimals: tokenDecimals,
			tokensGov: Math.round(tokensGov/(Math.pow(10,tokenDecimals))),
			tokensMem: Math.round(tokensMem/(Math.pow(10,tokenDecimals)))			
		};
	}

	render() {	
		const {
			tokenAddress,
			tokenDecimals,
			tokensGov,
			tokensMem
		} = this.props;
		console.log('render', this.props);
		
		return (
		<Layout>
		<Container>
			<Header as='h2'>The Decentralised Future Fund DAO</Header>
			
			<p>Token address: {tokenAddress}
			</p>
			<p>Tokens for new governors: {tokensGov}
			</p>
			<p>Tokens for new members: {tokensMem}
			</p>
			
			<Image src='./dfftxt.png' size='medium' centered />
			<p>Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine definitiones. Quot wisi 
			nulla ex duo. Vis sint solet expetenda ne, his te phaedrum referrentur consectetuer. Id vix 
			fabulas oporteat, ei quo vide phaedrum, vim vivendum maiestatis in.

			Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut facer dolores 
			adolescens, no illum aperiri quo, usu odio brute at. Qui te porro electram, ea dico facete 
			utroque quo. Populo quodsi te eam, wisi everti eos ex, eum elitr altera utamur at. Quodsi 
			convenire mnesarchum eu per, quas minimum postulant per id.
			</p>
		</Container>
		</Layout>
	)}
}

export default DffDaoIndex;