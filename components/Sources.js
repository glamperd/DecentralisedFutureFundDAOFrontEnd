import React, { Component } from 'react';

import { List } from 'semantic-ui-react';
import Providers from '../ethereum/providers';
import { Provider, connect } from 'react-redux';
import storeFactory from '../configureStore';


class Sources extends Component {
	constructor(props) {
		super(props);
	}
	
	handleItemSelection = async (event, data) => {
		event.preventDefault();
		console.log('list item clicked ', data.content);
		this.props.onSignerClick(data.content);
	}

	render() {
		console.log('Sources render ', this.props);
		var providers = new Providers(this.props.selectedSigner);
		var sourceItems = [];
		var sources = providers.sources();
		for (let s in sources) {
			var srcObj = sources[s];
			var renderObj = { key: srcObj.source, content: srcObj.text, as: 'ui' };
			//renderObj.disabled=!srcObj.available;
			if (srcObj.selected) { renderObj.active=true };
			sourceItems.push(renderObj);
			//console.log('s', srcObj, renderObj);
		}

		return (
		   <div>
			<h1>How do you wish to access your wallet?</h1>
			<List 
				items={ sourceItems }
				selection
				onItemClick={this.handleItemSelection}
				size='big'
			/>
		   </div>
	)}
}

export default Sources;