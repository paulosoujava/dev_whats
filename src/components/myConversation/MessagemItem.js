import React, { Component } from 'react';
import { View, Text,  StyleSheet, Image } from 'react-native';

export default class MessageItem extends Component{

	constructor(props){
		super(props);

		let bgColor = '#a4d392';
		let align = 'flex-start';
		let msg = 'left';
		let color = '#000';

		if( this.props.data.uid == this.props.me){
			bgColor = '#9999FF';
			align = 'flex-end';
			msg = 'right';
			color = '#fff';	
		}
		this.state = {
			bgColor: bgColor,
			align: align,
			msg:msg,
			color:color,
			date: this.formaterDate(this.props.data.date)
		}
	}

	formaterDate(originalDate){

		let cDate = new Date();
		let mDate = originalDate.split(' ');
		let today = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();
		let newDate = mDate[1].split(":");
		newDate = ((newDate[0]<10 ) ? '0'+newDate[0]: newDate[0] )+":"+ ( (newDate[1]<10)? '0'+newDate[1]: newDate[1]);

		if( today != mDate[0]){
			let newDateDays = mDate[0].split('-');
			newDate = newDateDays[2]+"/"+newDateDays[1]+"/"+newDateDays[0]+" "+newDate;
		}
		return newDate;
	}
	render(){
		return(	
			<View style={[styles.container, {alignSelf: this.state.align, backgroundColor: this.state.bgColor}]}>
				{this.props.data.msgType == 'text' &&
					<Text style={{textAlign:this.state.msg, color:this.state.color}}> {this.props.data.m}</Text>
				}
				{this.props.data.msgType == 'image' &&
					<Image style={{height:200, width:200}} source={{uri:this.props.data.m}} />
				}
				<Text style={[styles.date,{color:this.state.color}]}> {this.state.date}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		marginTop: 5,
		marginBottom: 5,
		marginRight: 10,
		marginLeft: 10,
		padding:10,
		maxWidth: '80%',
		borderRadius:10,
		backgroundColor:'#c5c8cc'
	},
	date:{
		fontSize:11,
		textAlign: 'right'
	}
	
});