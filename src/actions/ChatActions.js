import firebase from '../FirebaseConnection';

const USER = 'user';
const CHATS = 'chats';
const MEMBERS = 'members';
const MESSAGE = 'message';
const IMAGE = 'image';


export  const sendImage = (blob, progress, callback) =>{
	return ( dispatch ) => {
		let tmpKey =  firebase.database().ref(CHATS).push().key;	
		
		let fbImage = firebase.storage().ref().child(IMAGE).child(tmpKey);	
		
		fbImage.put(blob, {contentType: 'image/jpeg'})
		.on('state_changed', progress,
		(error)=>{
				alert(error.code)
		}, 
		()=>{
			fbImage.getDownloadURL().then((url)=>{
				callback(url);
			});
			
		});
		// .then( ()=>{
		// 	callback( tmpKey);
		// }).catch( (error)=>{
		// 	alert(error.code)
		// });
	}
};

export  const getContactList = ( userUid, callback) =>{ 
	return ( dispatch ) => {
		firebase.database().ref( USER ).orderByChild('name').once( 'value' ).then( ( snapshot ) => {
			let users = [];
			snapshot.forEach ( ( childItem ) =>{
				
				if( childItem.key != userUid ){ //please all, less me 
					users.push({
						key:childItem.key,
						name:childItem.val().name,
					});	
				}
				
			});
			callback();
			dispatch( {
				type: 'setContactList',
				payload:{
					users: users
				}
			});
		});
	};
};

export const createChat = (userUid, friendUid) =>{
	return ( dispatch ) => {

		//criacao do chat
		let newChat = firebase.database().ref(CHATS).push();
		newChat.child(MEMBERS).child(userUid).set({
			id:userUid
		});
		newChat.child(MEMBERS).child(friendUid).set({
			id:friendUid
		});
		//associacao dos envolvidos
		let chatId = newChat.key;

		firebase.database().ref(USER).child(friendUid).once('value').then((snapshot)=>{
			firebase.database().ref(USER).child(userUid).child(CHATS).child(chatId).set({
				id:chatId,
				title: snapshot.val().name
			});
		});

		firebase.database().ref(USER).child(userUid).once('value').then((snapshot)=>{
			firebase.database().ref(USER).child(friendUid).child(CHATS).child(chatId).set({
				id:chatId,
				title:  snapshot.val().name
			}).then(()=>{
						dispatch({
				 			type: 'setActiveChat',
				 			payload:{
				 				chatId: chatId
				 			}
				 		});
				});
		});
		
	}
};

export const getChatList = ( uid, callback )=>{
	return ( dispatch ) => {

		 firebase.database().ref(USER).child(uid).child(CHATS).on('value', (snapshot) =>{
		 	let chats = [];
		 	snapshot.forEach ( ( childItem ) =>{
		 		chats.push({
		 			key: childItem.key,
		 			title: childItem.val().title
		 		});

		 	});
		 	callback();
		 	dispatch({
				type: 'setChatList',
				payload:{
					chats: chats
				}
			});
		 
		 });
	};
};
export const  setActiveChat = ( chatId ) =>{
	return{
		type: 'setActiveChat',
		payload:{
		  chatId: chatId
		}
	}
};

export const sendMessage = ( type, msg, author, uidChat)=>{
	return (dispatch)=>{
		let currentDay = '';
		let cDate = new Date();
		currentDay = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate()+' '+ cDate.getHours()+':'+cDate.getMinutes()+":"+cDate.getSeconds();
		let msgId = firebase.database().ref(CHATS).child(uidChat).child(MESSAGE).push();
		
			msgId.set({
				msgType: (type == 'text') ? 'text' : 'image',
				date: currentDay,
				m:msg,
				uid:author
			});
		
	}
};
export const unlistenerChat = (uidChat) =>{
	return (dispatch)=>{//se passar nada no off retira todos os listeners
		firebase.database().ref(CHATS).child(uidChat).child(MESSAGE).off('value');
	}
}
export const listenerChat = (uidChat) =>{
	return (dispatch)=>{
		firebase.database().ref(CHATS).child(uidChat).child(MESSAGE).orderByChild('date').on( 'value', (snapshot)=>{
			let arrMsg = [];
			snapshot.forEach( (childItem) =>{
				arrMsg.push({
					key: childItem.key,
					date: childItem.val().date,
				    msgType: (childItem.val().msgType == 'text') ? 'text' : 'image',
					m: childItem.val().m,
					uid: childItem.val().uid,
				});
			});
			dispatch({
				type: 'setActiveChatMessage',
				payload:{
					msgs: arrMsg
				}
			});
		});
	}	
}


