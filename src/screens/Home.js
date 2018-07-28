import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class Home extends Component {

	static navigationOptions = {
		title:'',
		header:null
	}

	constructor(props) {
		super(props);
		this.state = {};

		this.props.checkLogin();
		this.create = this.create.bind(this);
		this.login = this.login.bind(this);
	}

	create(){
		this.props.navigation.navigate('SignUp');
	}
	login(){
		this.props.navigation.navigate('SignIn');
	}

	render() {
		return (
					<View style={styles.container}>


						<TouchableHighlight onPress={this.login} style={ styles.touchableHightlight } underlayColor={ 'transparent' }>
		          			<View style={styles.button}>
		            			<Text style={styles.buttonText}>Login</Text>
		          			</View>
		        		</TouchableHighlight>
							
							 <View style={{ flexDirection: 'row', width: 300,justifyContent: 'center', alignItems: 'center', marginTop:20, marginBottom:20}}>
		        				<View style={{width: 100, height: 1, backgroundColor: '#878787', marginTop:10}} />
		        				<View style={{width: 50, height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}} >
		        					<Text style={{fontSize: 30}}>Ou</Text>
		        				</View>
		        				<View style={{width: 100, height: 1, backgroundColor: '#878787', marginTop:10}} />
		      				</View>

		        			<TouchableHighlight onPress={this.create} style={ styles.touchableHightlight } underlayColor={ 'transparent' }>
		          			<View style={[styles.button, {backgroundColor: '#597aaf'}]}>
		            			<Text style={styles.buttonText}>Create</Text>
		          			</View>
		        		</TouchableHighlight>

			        	
					</View>
					
          	
		);
	}

}

const styles = StyleSheet.create({
	
	container:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	or:{
		color: '#000',
		marginTop:20,
		marginBottom:20
	},
	orText:{
		fontSize:25
	},
	touchableHightlight:{
		borderRadius:20
	},
  	button: {
    	width: 260,
    	borderRadius:20,
    	alignItems: 'center',
    	backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};
};

const HomeConnect = connect(mapStateToProps, { checkLogin })(Home);
export default HomeConnect;
















