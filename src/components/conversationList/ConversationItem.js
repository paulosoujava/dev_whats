import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class ConvesationItem extends Component{

	constructor(props){
		super(props);

		this.onCLick = this.onCLick.bind(this);
	}

	onCLick(){
		this.props.onPress(this.props.data);
	}

	render(){
		return(	
			
			<TouchableHighlight underlayColor='#DDD' onPress={this.onCLick} style={styles.btn}>
				<Text> 
					{this.props.data.title}
				</Text>
			</TouchableHighlight>
			
		);
	}
}

const styles = StyleSheet.create({
	btn	:{
		height: 40,
		flex:1,
		justifyContent: 'center',
		padding:10,
		borderBottomWidth:1,
		borderBottomColor: '#CCC'
	}
	
});