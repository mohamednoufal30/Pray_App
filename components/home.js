import React, { useEffect, useState } from 'react';
import {Image,View,Text, SafeAreaView, StyleSheet,Dimensions,ScrollView } from 'react-native';

import Vagi  from '../components/vagt';
import Header  from '../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';






export default function Home() {

  

  return (
    
    
    <ScrollView>

       {/* <Header/> */}
 
       <Vagi/> 

       
       
    </ScrollView>
    


  );
}

