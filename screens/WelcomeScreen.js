import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView, ViewComponent } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '', 
      isModalVisible: false,
      address: '',
      contact:'',
      firstName:'',
      lastName:'',
      confirmPassword:''
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password) =>{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }

  showModal=()=>{
    return(
      <Modal animationType="fade"
      transparent={true}
    visible={this.state.isModalVisible}>
        <View style=styles.modalContainer> 
          <ScrollView style={{width:"100%"}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text style = {styles.modalTitle}>
          Sign Up
          </Text>
          <TextInput style = {styles.formTextInput}
          placeholder={"First Name"}
          maxLength={10}
          onChangeText={(text)=>{
            this.setState({
              firstName:text
            })
          }}
          />
          
          <TextInput style = {styles.formTextInput}
          placeholder={"Last Name"}
          maxLength={20}
          onChangeText={(text)=>{
            this.setState({
              lastName:text
            })
          }}
          />
          <TextInput style = {styles.formTextInput}
          placeholder={"Contact"}
          maxLength={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact:text
            })
          }}
          />
          <TextInput style = {styles.formTextInput}
          placeholder={"Address"}
          multiline={true}
          onChangeText={(text)=>{
            this.setState({
              address:text
            })
          }}
          />
          <TextInput style = {styles.formTextInput}
          placeholder={"Email"}
          keyboardType={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId:text
            })
          }}
          />
          <TextInput style = {styles.formTextInput}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
              password:text
            })
          }}
          />
          <TextInput style = {styles.formTextInput}
          placeholder={"Confirm Password"}
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
              confirmpassword:text
            })
          }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity style={styles.registerButton}
            onPress = {()=>
            this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}>
              <Text style={styles.registerButtonText}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity style={styles.cancelButton}
            onPress={()=>{
              this.setState({"isModalVisible":false})
            }}>
              Text
            </TouchableOpacity>
          </KeyboardAvoidingView>
      </Modal>
    )
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <SantaAnimation/>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
