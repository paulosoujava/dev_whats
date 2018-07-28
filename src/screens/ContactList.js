import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getContactList,createChat } from '../actions/ChatActions';
import  ContactItem  from '../components/contactList/ContactItem';

export class ContactList extends Component {

	static navigationOptions = {
		header:null
	
	}

	constructor(props) {
		super(props);
		this.state = {
			load:true
		}
		
		this.props.getContactList( this.props.uid, ()=>{
        			this.setState({load:false});
      			});
		this.contactClick = this.contactClick.bind(this	);

		
	}
	contactClick(item){
		
		this.props.createChat( this.props.uid, item.key);
		this.props.navigation.navigate('ConversationStack',{test:item.key});

	}

	render() {
		return (
			<View style={styles.container}>
			{this.state.load && <ActivityIndicator  size="large" />}
				<FlatList
					data={this.props.contacts}
					renderItem={({item})=><ContactItem data={item} onPress={this.contactClick} />} 
				/>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		marginTop:10
	}
});

const mapStateToProps = (state) => {
	return {
		uid: state.auth.uid,
		contacts: state.chat.contacts

	};
};

const ContactListListConnect = connect(mapStateToProps, { getContactList,createChat })(ContactList);
export default ContactListListConnect;
















