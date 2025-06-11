import React,{useState,useEffect} from 'react';
import {Image,View,Text, SafeAreaView, StyleSheet,Dimensions,ScrollView } from 'react-native';

import StaticVagi  from '../components/staticVagi';
import Header  from '../components/header';
import UserHeading from '../components/userHeadings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




export default function UserForm() {
  

  return (
    
    
    <ScrollView>

       <UserHeading/>

       <StaticVagi/> 

       
       
    </ScrollView>
    


  );
}
