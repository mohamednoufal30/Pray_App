
import { TouchableOpacity,Text, SafeAreaView, StyleSheet,View,TextInput,Button, Alert,ScrollView } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native'; 
import React,{useState,useEffect} from 'react';
// import { logger } from 'react-native-logs';
import AsyncStorage from '@react-native-async-storage/async-storage';
// You can import supported modules from npm
// import { Card } from 'react-native-paper';
// import Home from '../components/home';
import Clock from '../components/clock';
// import UserForm from '../components/userForm';
// import RegisterForm from './RegisterForm';
// import AdminsForm from '../components/adminsForm';
// import NavigationContainer from '@react-navigation/native';
//import axios from 'axios';
import axios,{ip,api} from './axiosConfig';
// import * as Network from "expo-network";
// import { useFonts } from 'expo-font';

// import NetInfo, { NetworkInfo } from 'react-native-network-info';








export default function Form() {
  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');
 

   const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
 const[isLoggedIn,setIsLoggedIn]=useState(false);

 const[IpAddress,setIPAddress]=useState('');
 const[networkState,setNetworkState]=useState('');

 /* const getIpAddress=async()=>{
  const ip=await Network.getIpAddressAsync();
  setIpAddress(ip);
 };
 getIpAddress();

 const getNetworkState=async()=>{
  const state=await Network.getNetworkStateAsync();
  setNetworkState(JSON.stringify(state));
 };
 getNetworkState(); */

 
//  const getIPPAddress = async () => {
//   try {
//     const ipInfo = await NetworkInfo.getIPAddress();
//     const wifiIPAddress = ipInfo.ipAddress;
//     console.log('WiFi IP Address:', wifiIPAddress);
//     // Use the wifiIPAddress as needed
//   } catch (error) {
//     console.error('Error retrieving IP address:', error);
//   }
// };




 
  useEffect(() => {
    
    var date = new Date().toDateString();
    var month = new Date().getMonth();
    var year = new Date().getFullYear(); //Current Date
    var hours=new Date().getHours('hh');
    var minutes=new Date().getMinutes('mm');
    var seconds=new Date().getSeconds('ss');
   
    setCurrentDate(date);
    setCurrentTime(hours+'-'+minutes+'-'+seconds);
   
  //  console.log(getIPPAddress());
   
    
    
  }, []);

  const handleLogout=()=>{
   
   navigation.replace('Loginform');
   
  } 
  
  

  const navigation=useNavigation();
 const handleSubmit=async()=>{
    console.log(email+' '+password); 

   
   const userData={  
     email,password
      
    
    };
   
    axios.post('http://'+ip+':5000/login-user',userData)
    .then(res=>{
       const {token,user}=res.data;
       //console.log(token);
     // console.log(user);
     
    if(res.data.status=='ok'){
      Alert.alert("Login Successful");
      
      //console.log(res.data.user._id);
        AsyncStorage.setItem('token',res.data.data);
        AsyncStorage.setItem('User',JSON.stringify(res.data.user));
        AsyncStorage.setItem('id',res.data.user._id);
        AsyncStorage.setItem('name',res.data.user.name);
        AsyncStorage.setItem('email',res.data.user.email);
        AsyncStorage.setItem('phone',res.data.user.phone);
        AsyncStorage.setItem('userType',res.data.user.userType);
       
        AsyncStorage.setItem('isLoggedIn',JSON.stringify(true));
        //const userType1=AsyncStorage.setItem('userType',res.data.data);
       
        if(res.data.userType=='ADMIN'){
     
         console.log(res.data.user._id);
        
         navigation.navigate('home',{user});
       
      }else if(res.data.userType=='USER'){
        //console.log(res.data.user.name);
        navigation.navigate('userForm',{user});
      }  else{
        //console.log(res.data);
        navigation.navigate('masterAdmin');

      }
  } else{
      Alert.alert("user does not exist");
  }

   
  });
 }



 async function getData(){
  try{
  const token=await AsyncStorage.getItem('isLoggedIn');
 
  console.log(token,'at App1.js');
  }catch(error){
    console.log(error);
  }
} 

  return (

    <ScrollView>
<View style={styles.contains}>
<Text style={{textAlign:'center',fontSize:30}}>LOGIN</Text>

<Text style={styles.textStyle}>  {currentDate} </Text>
<Clock/>

{/* <Text style={styles.Text}> {IpAddress}</Text>
<Text style={styles.Text}> {networkState}</Text> */}

    <View style={styles.container}>
    <Text style={styles.Text}> Email :
    </Text>
    
    <TextInput style={styles.textInput} placeholder="Enter Email"  onChangeText={email => setEmail(email)}
        defaultValue={email}/>
   
    </View>
    {email.length<1 && <Text style={{color:'red',fontSize:18,paddingHorizontal:30}}>  Enter your Email </Text>}

    <View style={styles.container}>
    <Text style={styles.Text}> Password:
    </Text>
    <TextInput style={styles.textInput}  placeholder="Enter Password" secureTextEntry={true}  onChangeText={password => setPassword(password)}
        defaultValue={password} />
</View>
{password.length<1 && <Text style={{color:'red',fontSize:18,paddingHorizontal:30}}>Enter your Password </Text>}

<View style={styles.button}>
 <TouchableOpacity style={styles.TO1}
    onPress={handleSubmit}>
    <Text style={styles.TOtext}>Submit</Text>

  </TouchableOpacity>
 <TouchableOpacity style={styles.TO2}
    onPress={handleLogout}>
    <Text style={styles.TOtext}>Cancel</Text>

  </TouchableOpacity>
</View>
<View>

  <Text style={styles.txt}> For new user , Register below</Text>  


 
  <TouchableOpacity style={styles.edit} title="Register"
      onPress={() => navigation.navigate("Register")}>
     <Text style={{ color: 'white',fontSize:20,margin:10}}>Register</Text> 
  </TouchableOpacity>

  {/* <TouchableOpacity style={styles.edit} title="Register"
      onPress={() => navigation.navigate("masterAdmin")}>
     <Text style={{ color: 'white',fontSize:20,margin:10}}>Madmin</Text> 
  </TouchableOpacity>
 */}



  

  

   </View>      

</View>
</ScrollView>


    
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
  textInput:{
    width:200,
    marginLeft:10,
    textAlign:'center',
    borderRadius:5

  },
  button:{
  flexDirection:'row',
  margin:10,
  paddingVertical:10,
  justifyContent:'space-evenly',
  borderRadius:8
},
TO1:{
  borderRadius:5,
  padding:10,
  backgroundColor:'green'

},
TO2:{
  borderRadius:5,
  borderColor:'black',
  backgroundColor:'red',
  padding:10

},
TOtext:{
  color: 'white',
  fontSize:20

},
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
  width:'auto'
  
},
edit:{  
  padding: '10',
  width:'auto',
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
