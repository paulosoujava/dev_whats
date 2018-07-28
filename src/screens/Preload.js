import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions} from 'react-navigation';
import { checkLogin } from '../actions/AuthActions';

export class Preload extends Component {

	static navigationOptions = {
		title:'',
		header:null,
		
	}

	constructor(props) {
		super(props);

		this.directPages = this.directPages.bind(this);
		this.props.checkLogin();

		window.globalNavigator = this.props.navigation;
	}

	directPages(){
		let page = '';
		 
		if(this.props.status == 1){
			page = 'Conversation';
			
		}
		if(this.props.status == 2){
		
			page = 'Home';
		}


		if( page != ''){
			
			//prevenindo o backPress para o preload
			this.props
			.navigation
			.dispatch(StackActions.reset(
                 {
			        index: 0,
			        actions: [
			            NavigationActions.navigate({ routeName: page})
			        ]
			    })
			 );

			}
		
	}
	// parecido com o onStart() android
	componentDidMount(){
		this.directPages();
	}

	componentDidUpdate(){
		this.directPages();
	}


	render() {
		return (
			<View style={styles.container}>
				<Text>WhaspApp Dev</Text>
				<Text>Carregando...</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		margin:10,
		flex:1,
		justifyContent:'center',
		alignItems: 'center'
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};
};

const PreloadConnect = connect(mapStateToProps, { checkLogin })(Preload);
export default PreloadConnect;
















