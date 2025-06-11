import React, { useEffect, useState } from 'react';
import {Image,View,Text, SafeAreaView, StyleSheet,Dimensions,ScrollView } from 'react-native';

import Vagi  from '../components/vagt';
import Header  from '../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { set } from 'mongoose';





export default function Home() {

  /*   
     const[userData,setUserData]=useState('');
     const[Name,setName]=useState('');
     const[email,setEmail]=useState('');
     const[phone,setPhone]=useState('');
     
 
     async function getData(){
     const token=await AsyncStorage.getItem('token');
      const user=await AsyncStorage.getItem('user');
      const name=await AsyncStorage.getItem('name');
      const email=await AsyncStorage.getItem('email');
      const phone=await AsyncStorage.getItem('phone');
     
     setUserData(user);
     setName(name);
     setEmail(email);
     setPhone(phone);
    
     //console.log("the data is "+userData);
     console.log(name);
     console.log(email)
     console.log(phone);
    
     
    
     }
   
     useEffect(()=>{
      
     getData();
     
     },[]);  */
/*
   async function getData(){
    const token=await AsyncStorage.getItem('token');
    console.log(token);

    
    axios.get('http:// 192.168.89.83:5000/userData',{token:token})
    .then(res=>{
      console.log(res.data);
     // console.log(token,'at home.js');
      setUserData(res.data.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }
useEffect(()=>{
    //getData();
    userData

},[]);   
 */


 

  return (
    
    
    <ScrollView>

       {/* <Header/> */}
 
       <Vagi/> 

       
       
    </ScrollView>
    


  );
}

