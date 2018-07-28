import React, { Component } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

export default class LoadItem extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<Modal animationType="none" visible={this.props.visible}>
				<View style={styles.loading}>
					<ActivityIndicator  size="large"/>
				</View>
			</Modal>
			);
	}
}

const styles = StyleSheet.create({
	loading:{
		position: 'absolute',
		top:0,
		bottom:0,
		left:0,
		right:0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#000",
		opacity:0.8
	}
});