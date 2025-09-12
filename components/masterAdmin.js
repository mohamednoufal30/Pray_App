
import { TouchableOpacity,Text, SafeAreaView, StyleSheet,View,TextInput,Button, Alert,Dimensions, DevToolsSettingsManager } from 'react-native';
import { Link } from '@react-navigation/native'; 
import React,{useState,useEffect} from 'react';
import { logger } from 'react-native-logs';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import Home from '../components/home';
import Clock from '../components/clock';
import UserForm from '../components/userForm';
import RegisterForm from './RegisterForm';
import AdminsForm from '../components/adminsForm';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MasterAdmin({navigation}) {
  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');

  const[Email,setEmail]=useState('');
  const[Password,setPassword]=useState('');

  useEffect(() => {
    validateData();
    var date = new Date().toDateString();
    var month = new Date().getMonth();
    var year = new Date().getFullYear(); //Current Date
    var hours=new Date().getHours('hh');
    var minutes=new Date().getMinutes('mm');
    var seconds=new Date().getSeconds('ss');
    setCurrentDate(
      date
      
    );
    setCurrentTime(hours+'-'+minutes+'-'+seconds)
   
  }, []);

  const validateData=async()=>{
    const token= await AsyncStorage.getItem('token');
    // console.log(token,'token at masterAdmin.js');
  }

 
const handleLogout=()=>{
//  console.log('Logout clicked');
 AsyncStorage.removeItem('token');
 navigation.replace('Forms');
 
} 
  return (
<View style={styles.contains}>
<Text style={{textAlign:'center',fontSize:30}}>MasterAdmin</Text>

<Text style={styles.textStyle}>  {currentDate} </Text>
<Clock/>
   
<View style={styles.button}>
  <TouchableOpacity style={styles.TO1}
    onPress={()=>navigation.navigate('timings')}>
    <Text style={styles.TOtext}>Create Mosque</Text>

  </TouchableOpacity>
 <TouchableOpacity style={styles.TO1}
    onPress={()=>navigation.navigate('adminList')}>
    <Text style={styles.TOtext}>Admins</Text>

  </TouchableOpacity>
 <TouchableOpacity style={styles.TO1}
    onPress={() => navigation.navigate('userList')}>
    <Text style={styles.TOtext}>Users</Text>

  </TouchableOpacity>
  <TouchableOpacity style={styles.TO1}
    onPress={() => navigation.navigate('mosqueList')}>
    <Text style={styles.TOtext}>Mosques</Text>

  </TouchableOpacity>
  <TouchableOpacity style={styles.TO1}
    onPress={handleLogout}>
    <Text style={styles.TOtext}>Logout</Text>

  </TouchableOpacity>
</View>


</View>

 
  );
}

const styles = StyleSheet.create({

  contains:{
   backgroundColor:'yellow',
   marginVertical:100,
   borderWidth:2,
   borderRadius:10,
   margin:10
  },
  container: {
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor: '#ecf0f1',
    padding:10,
    borderRadius:10,
    fontWeight:'bold',
    marginVertical:20,
    marginHorizontal:15
     
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 20,
  },
  TO1: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 8,
    width: Dimensions.get('window').width * 0.42, // 42% of screen width
    alignItems: 'center',
    elevation: 4,
  },
  TOtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
// TO2:{
//   borderRadius:5,
//   borderColor:'black',
//   backgroundColor:'red',
//   padding:10

// },
// TOtext:{
//   color: 'white',
//   fontSize:20

// },
Text:{
  paddingTop:5

},
txt:{
  textAlign:'center',
  padding:5,
  fontSize:15
},
but:{
  
  justifyContent:'space-evenly',
  padding:5,
  margin:10,
  width:30
  
},
edit:{  
  padding: '10',
  width:100,
  margin:'auto',
  marginBottom:10,
  textAlign:'center',
  alignItems:'center',
  borderWidth:2,
  borderRadius:10,
  borderColor:'#FFFFFF',
  flexDirection:'row',
  justifyContent:'center',
  backgroundColor:'blue'

},
textStyle: {
  textAlign: 'center',
  fontSize: 18,
  color: 'black',
  fontWeight:'bold'
}
 
});
