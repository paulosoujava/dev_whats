import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationActions,StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { exit } from '../actions/AuthActions'

export class Config extends Component {

	static navigationOptions = {
		title:'',
		tabBarLabel:'Config',
		header:null
	}

	constructor(props) {
		super(props);
		
		this.exit = this.exit.bind(this);

		
	}

	exit(){
		this.props.exit();
		window.globalNavigator.navigate('Home');
		
		/*this.props
			.navigation
			.dispatch(StackActions.reset(
                 {
			        index: 0,
			        actions: [
			            NavigationActions.navigate({ routeName: 'Home'})
			        ]
			    })
			 );
			*/
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title="Sair" onPress={this.exit}/>
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
	};
};

const ConfigConnect = connect(mapStateToProps, { exit })(Config);
export default ConfigConnect;
















