import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, 
        TextInput, 
        Text, 
        StyleSheet, 
        TouchableHighlight, 
        TouchableOpacity,
        Keyboard } from 'react-native';

import { changeEmail,
         changePassword,
         entryLogin } from '../actions/AuthActions';

import LoadItem from '../components/LoadItem';

export class SignIn extends Component {

  static navigationOptions = {
    title:'Login',
    headerStyle: {
      elevation: 1
      },
    
  }

  constructor(props) {
    super(props);
    this.state={
      loading: false
    }
    this.login = this.login.bind(this);
  }
  componentDidUpdate(){
    if( this.props.status == 1 ){
      Keyboard.dismiss();
      this.props.navigation.navigate('Conversation');
    }
  }
  login(){

    let flag = true;
    //this.setState({loading:true});
    //validation
    /*if(this.props.name.length <= 2){
      alert( "Check o nome");
      flag = false;
    }else if( this.props.email.length <= 5){
      flag = false;
    }else if( this.props.password.length <= 5){
      flag = false;
    }else if( this.props.rep_password.length <= 5){
      flag = false;
    }else if( this.props.password !== this.props.rep_password){
      flag = false;
    }
    */
    if( flag )
      this.props.entryLogin(this.props.email, this.props.password, ()=>{
        this.setState({loading:false});
      })
  }

    render() {
    return (
      
      
      <View style={styles.container}>
      
            <Text style={{marginLeft:30,}} >Email</Text>
             <TextInput
                style={{height: 45, 
                      width:300,
                      marginLeft:30,
                      paddingLeft:10,
                      marginBottom:35,
                      borderBottomColor: '#000',
                borderBottomWidth: 1,
                fontSize:20,
                backgroundColor: null
              }}
                  placeholder=" seu email aqui..."
                  value={this.props.email}
                  onChangeText={this.props.changeEmail}
              />

              <Text style={{marginLeft:30,}} >Senha</Text>
             <TextInput
                style={{height: 45, 
                      width:300,
                      marginLeft:30,
                      paddingLeft:10,
                      marginBottom:35,
                      borderBottomColor: '#000',
                borderBottomWidth: 1,
                fontSize:30,
                backgroundColor: null
              }}
                  placeholder=" sua senha..."
                  secureTextEntry={true}
                  value={this.props.password}
                  onChangeText={this.props.changePassword}
              />

              
          <View style={styles.containerBt}>
                  <TouchableHighlight onPress={this.login} style={ styles.touchableHightlight } underlayColor={ 'transparent' }>
                    <View style={[styles.button, {backgroundColor: '#2196F3'}]}>
                      <Text style={styles.buttonText}>Logar</Text>
                    </View>
                </TouchableHighlight>
          </View>

          <LoadItem visible={this.state.loading}/>
      </View>
      
    );
  }

}

const styles = StyleSheet.create({
  container:{
    marginTop:10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  containerBt:{
    marginLeft:50,
    alignItems: 'center',
      justifyContent: 'center',
  },
  touchableHightlight:{
    borderRadius:20
  },
    button: {
      width: 260,
      borderRadius:20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }

});

const mapStateToProps = (state) => {
  return {
    uid:state.auth.uid,
    status:state.auth.status,
    email:state.auth.email,
    password:state.auth.password,
    
  };
};

const SignInConnect = connect(mapStateToProps, {changeEmail,
                                                changePassword,
                                                entryLogin 
                                                })(SignIn);
export default SignInConnect;