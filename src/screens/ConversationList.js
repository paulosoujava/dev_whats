import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getChatList, setActiveChat} from '../actions/ChatActions'
import ConversationItem from '../components/conversationList/ConversationItem'

export class ConversationList extends Component {

	static navigationOptions = {
		header:null,
		tabBarLabel: 'teste'
		
	}

	constructor(props) {
		super(props);
		this.state = {
			load:true
		}
		this.props.getChatList(this.props.uid, ()=>{ this.setState({load:false}) }  );
		this.conversationClick = this.conversationClick.bind(this);
	}

	conversationClick(data){
		this.props.setActiveChat(data.key);
		this.props.navigation.navigate('MyConversation', {title: this.props.activeChatTitle});
		
	}

	componentDidUpdate(){
		if( this.props.activeChat != ''){
			this.props.navigation.navigate('MyConversation', {title: this.props.activeChatTitle});
		}
	}

	render() {
		return (
			<View style={styles.container}>
			{this.state.load && <ActivityIndicator  size="large" />}
				<FlatList 
					data={this.props.chats}
					renderItem={({item})=><ConversationItem data={item} onPress={this.conversationClick} />}
				/>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		marginTop:40
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		uid:state.auth.uid,
		activeChat:state.chat.activeChat,
		activeChatTitle:state.chat.activeChatTitle, 
		chats: state.chat.chats
	};
};

const ConversationListConnect = connect(mapStateToProps, { getChatList, setActiveChat })(ConversationList);
export default ConversationListConnect;
















