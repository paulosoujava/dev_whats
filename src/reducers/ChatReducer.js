const initialState = {
	chats:[],
	contacts:[],
	activeChat: '',
	activeChatTitle: '',
	activeChatMessage:[],
};

const ChatReducer = (state = initialState, action) => {
	switch( action.type){
		 case  'setContactList' : 
		 	return { ...state, contacts: action.payload.users};
		 case 'setActiveChat':
		 let chatTitle = '';
		 for( var i in state.chats ){
		 	if( state.chats[i].key == action.payload.chatId ){
		 		chatTitle = state.chats[i].title;
		 	}
		 }
		 	return { ...state, activeChat: action.payload.chatId, activeChatTitle:chatTitle};	
		 case 'setChatList':
		 	return { ...state, chats: action.payload.chats};		
		
		case 'setActiveChatMessage':
 			return { ...state, activeChatMessage: action.payload.msgs};	
		default:
			return state;	
	}
};
export default  ChatReducer;