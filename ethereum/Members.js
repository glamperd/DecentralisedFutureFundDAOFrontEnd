/**
 * Get members from the DFF DAO contract
 */
import web3 from './web3';
import dffdao from './dffdao';

class Members {
	async loadMemberList () {
		console.log('get members');
		// Get member addresses from the contract
		const addresses = await dffdao.methods.getMembers().call();
		
		// For each address, get the member details 
		const members = await Promise.all(
			addresses.map(address => {
			  console.log('address', address);
			  return dffdao.methods.getMemberData(address).call();
			})
		);
		console.log('members', members);
		
		// Augment with address and name
		return members.map(
			(member, index) => {
				member.address = addresses[index];
				//console.log(member._name);
				// Convert name from bytes32
				try {
					// Remove leading /x0000 chars (and other unprintables)
					member.name = web3.utils.toAscii(member._name).replace(/[^ -~]+/g, "");
				} catch (err) {member.name = err.message};
				//console.log('member ', member);
				return member;
		});
	}
	
	async getMemberAddressMap() {
		const addressMap = new Map();
		const p = this.loadMemberList();
		console.log('loadMemberList() returns', p);
		p.then( memberList => {
			//console.log('getMemberAddresses', memberList);
			memberList.forEach(member => {
				addressMap.set(member.address, member)
			})
		});
		await p;
		return addressMap;
	}
	
	memberAddressMap = new Map();
	async init() {
		this.memberAddressMap = (await this.getMemberAddressMap())._c;
		//console.log('init ', this.memberAddressMap);
		return true;
	}
	
	getMemberList() {
		return this.memberAddressMap.values();
	}
	
	getName(address) {
		if (address != undefined) {
			return this.memberAddressMap.get(address).name;
		} else {
			return '';
		}
	}
}

export default Members;
