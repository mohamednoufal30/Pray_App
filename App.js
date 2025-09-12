import React from 'react';
import { useEffect, useState } from 'react';
import {Image,View,Text, SafeAreaView, StyleSheet,Dimensions,ScrollView } from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-get-random-values';
import Home from './components/home';
import RegisterForm from './components/RegisterForm';
import Timings from './components/editTimings';
import AdminsForm from './components/adminsForm';
import UserForm from './components/userForm';
import StaticVagi from './components/staticVagi';
import MasterAdmin from './components/masterAdmin';
import Admins from './components/admins';
import Users from './components/users';
import Mosques from './components/mosques';
import EditTimings from './components/timingEdit';
import Forms from './components/Forms';
import Vagi from './components/vagt';


const { width, height } = Dimensions.get('window');


const Stack = createNativeStackNavigator();

 function App() {
  

  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="Forms" screenOptions={{headerShown:false}}>
      <Stack.Screen name="masterAdmin" component={MasterAdmin}/>
      {/* <Stack.Screen name="Loginform" component={Form}/> */}
      <Stack.Screen name="Register" component={RegisterForm}/>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="timings" component={Timings}/>
      <Stack.Screen name="admins" component={AdminsForm}/>
       <Stack.Screen name="userForm" component={UserForm}/> 
      <Stack.Screen name="staticVagi" component={StaticVagi}/>  
      <Stack.Screen name="adminList" component={Admins}/>  
      <Stack.Screen name="userList" component={Users}/>  
      <Stack.Screen name="mosqueList" component={Mosques}/> 
      <Stack.Screen name="timingEdit" component={EditTimings}/>
      <Stack.Screen name="Forms" component={Forms}/>
      <Stack.Screen name="Vagt" component={Vagi}/>
   
    </Stack.Navigator>
    </NavigationContainer>


    
    
  );
}


function hello(){
 

return(
  <NavigationContainer>
 {isLoggedIn && userType1=='ADMIN'?(<Home/>):isLoggedIn && userType1=='USER' ? (<UserForm/>):(<hello/>)}
  </NavigationContainer>

  

);
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    textAlign:'center',
    padding: 8,
    backgroundColor:'#ffff80',
    maxHeight:height*1.5,
    maxWidth:width*1.5
    
  },
  text:{
  padding:10,
  borderRadius:10,
  textAlign:'center',
  alignItems:'center',
  alignSelf:'center',
  backgroundColor:'#ecf0f1',
  fontSize:18,
  fontWeight:'bold'
  
  
  },
  img:{
    height:75,
    width:75,
    padding:10,
    borderRadius:10
    
  }
});

export default App;


