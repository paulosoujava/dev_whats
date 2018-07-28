import  { StackNavigator } from 'react-navigation';


import   ConversationList from './ConversationList';
import   MyConversation from './MyConversation';



const ConversationStackNavegation = StackNavigator({


	ConversationList:{
		screen:ConversationList
		
	},
	MyConversation:{
		screen:MyConversation,

	}
});

export default ConversationStackNavegation;