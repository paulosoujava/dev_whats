import React, { Component } from 'react';
import { Platform,	View, Text, StyleSheet, KeyboardAvoidingView, TouchableHighlight, Image, BackHandler, FlatList, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat,sendMessage, unlistenerChat, listenerChat, sendImage} from '../actions/ChatActions';
import MessagemItem from '../components/myConversation/MessagemItem';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;
//conversa interna
export class MyConversation extends Component {

	static navigationOptions = ({navigation}) =>({
		title: navigation.state.params.title,
		headerLeft:(
			<TouchableHighlight onPress={()=>{ 
				navigation.state.params.backFunction()
			}} underlayColor={false}>
				<Image source={require('react-navigation/src/views/assets/back-icon.png')} style={{width:25, height:25, marginLeft:10}} />
			</TouchableHighlight>

		), tabBarVisible:false

	});


	constructor(props) {
		super(props);
		this.state={ inpText: '', imageTmp: '', pct:0 }

		this.backPress = this.backPress.bind(this);
		this.sendMsg = this.sendMsg.bind(this);
		this.chooseImage = this.chooseImage.bind(this);
	}

	sendMsg(){
		let input = this.state.inpText;
		let state = this.state;
		this.state.inpText= '';
		this.setState(state);
		this.props.sendMessage('text', input, this.props.uid, this.props.activeChat);
	}
	componentDidMount(){
		this.props.navigation.setParams({backFunction:this.backPress});
		BackHandler.addEventListener('hardwareBackPress', this.backPress);
		this.props.listenerChat(this.props.activeChat);
	}

	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.backPress);
		
	}

	backPress(){
		this.props.unlistenerChat(this.props.activeChat);
		this.props.setActiveChat('');
		this.props.navigation.goBack();
		return true;
	}
	chooseImage(){
		ImagePicker.showImagePicker(null, (r)=>{
			if( r.uri){
				// let img = {uri:r.uri};
				// let state = this.state;
				// state.imageTmp = img;
				// this.setState(state);
				let uri = r.uri.replace('file://', '');
				RNFetchBlob.fs.readFile(uri, 'base64')
				.then( (data)=>{
					return RNFetchBlob.polyfill.Blob.build(data, {type: 'image/jpeg;BASE64'})
				}).then( (blob)=>{

					this.props.sendImage(blob, 
						(snapshot)=>{
							let pct = (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
							let state = this.state;
							state.pct = pct;
							this.setState(state);
						},
						(img)=>{
							let state = this.state;
							state.pct = 0;
							this.setState(state);
						this.props.sendMessage('image', img, this.props.uid, this.props.activeChat);
					});
				});
			}
		});

	}

	render() {
		let containerBehavior = Platform.select({ 
			ios : 'padding',
			android : null
		});
		let containerOffSet = Platform.select({ 
			ios : 64,
			android : null
		});
		return (
			<KeyboardAvoidingView 
				behavior={containerBehavior} keyboardVerticalOffset={124} //change to containerOffSet
				style={styles.container}>
				<FlatList
					ref={(ref)=>{this.containerChat = ref}}
					onLayout={()=>{ this.containerChat.scrollToEnd({animated:true}) }}
					onContentSizeChange={()=>{ this.containerChat.scrollToEnd({animated:true})}}
				 	style={styles.containerChat}
				 	data={this.props.activeChatMessage}
				 	renderItem={({item})=><MessagemItem
				 						  data={item}
				 						  me={this.props.uid}/>}
				 />
				 {this.state.pct > 0 &&
					 <View style={{height:10}}>
					 	<View style={[{width:this.state.pct+'%'},{height:4, backgroundColor:'#000'}]}></View>
					 	{/*<Image source={this.state.imageTmp} style={{width:40, height:40}} />*/}
					 </View>
				}
				 <View style={styles.sendMessage}>
				 	<TouchableHighlight style={styles.imgBtn} onPress={this.chooseImage} underlayColor='#FFF'>
				 		<Image source={require('../image/no_image.png')} style={{width:30, height:30}} />
				 	</TouchableHighlight>

				 	<TextInput style={styles.sendInput}  value={this.state.inpText} onChangeText={(inpText) =>this.setState({inpText})} />
				 	<TouchableHighlight onPress={this.sendMsg} style={styles.sendBtn} underlayColor='#FFF'>
				 		<Image source={require('../image/send.png')} style={{width:50, height:50}} />
				 	</TouchableHighlight>
				 </View>
			</KeyboardAvoidingView>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:4
	},
	imgBtn:{
		width:50,
		height:50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerChat:{
		flex:1,
		backgroundColor:'#EEE',
	},
	sendMessage:{
		height:50,
		backgroundColor:'#EFF',
		flexDirection: 'row',
		borderRadius:20,
		marginLeft:5,
		marginRight:5
	},
	sendInput:{
		flex:1,
		height:50,
		paddingLeft:10,
		marginLeft:10,
		
	},
	sendBtn:{
		width:50,
		height:50,
		justifyContent: 'center',
		alignItems: 'center',
		
		borderRadius:20,
		borderColor: '#000'

	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		uid:state.auth.uid,
		activeChat: state.chat.activeChat,
		activeChatMessage: state.chat.activeChatMessage,
	};
};

const MyConversationConnect = connect(mapStateToProps, {sendImage, unlistenerChat, listenerChat, setActiveChat,sendMessage })(MyConversation);
export default MyConversationConnect;
















