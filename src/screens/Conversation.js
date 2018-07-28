import React, { Component } from 'react';
import  { TabNavigator } from 'react-navigation';


import   ConversationStack from './ConversationStack';
import   ContactList from './ContactList';
import   Config from './Config';

const ConversationNavegation = TabNavigator({

	
	ContactList:{
		screen:ContactList
		
	},
	ConversationStack:{
		screen:ConversationStack,
		navigationOptions:{tabBarLabel: 'Conversas'}
	},
	Config:{
		screen:Config
	},
},{
	tabBarPosition: 'top',



	
});

export default ConversationNavegation;

