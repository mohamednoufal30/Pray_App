
// import { TouchableOpacity,Text, SafeAreaView, StyleSheet,View, Alert,ScrollView } from 'react-native';
// import { Link, useNavigation } from '@react-navigation/native'; 
// import { TextInput } from 'react-native-paper';
// import React,{useState,useEffect,useCallback,useRef} from 'react';
// // import { logger } from 'react-native-logs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // You can import supported modules from npm
// // import { Card } from 'react-native-paper';
// // import Home from '../components/home';
// import Clock from '../components/clock';
// // import UserForm from '../components/userForm';
// // import RegisterForm from './RegisterForm';
// // import AdminsForm from '../components/adminsForm';
// // import NavigationContainer from '@react-navigation/native';
// //import axios from 'axios';
// import axios,{ip,apiLink} from './axiosConfig';
// // import * as Network from "expo-network";
// // import { useFonts } from 'expo-font';

// // import NetInfo, { NetworkInfo } from 'react-native-network-info';








// export default function Form() {
//   const [currentDate, setCurrentDate] = useState('');
//   const[currentTime,setCurrentTime]=useState('');
//   const hasLoaded = useRef(false);

//    const[email,setEmail]=useState('');
//   const[password,setPassword]=useState('');
//   const [token, setToken] = useState(AsyncStorage.getItem('token') || '');
//   const [message, setMessage] = useState('');

//  const[isLoggedIn,setIsLoggedIn]=useState(false);

//  const[IpAddress,setIPAddress]=useState('');
//  const[networkState,setNetworkState]=useState('');

//  /* const getIpAddress=async()=>{
//   const ip=await Network.getIpAddressAsync();
//   setIpAddress(ip);
//  };
//  getIpAddress();

//  const getNetworkState=async()=>{
//   const state=await Network.getNetworkStateAsync();
//   setNetworkState(JSON.stringify(state));
//  };
//  getNetworkState(); */

 
// //  const getIPPAddress = async () => {
// //   try {
// //     const ipInfo = await NetworkInfo.getIPAddress();
// //     const wifiIPAddress = ipInfo.ipAddress;
// //     console.log('WiFi IP Address:', wifiIPAddress);
// //     // Use the wifiIPAddress as needed
// //   } catch (error) {
// //     console.error('Error retrieving IP address:', error);
// //   }
// // };


// useEffect(() => {
//   if (hasLoaded.current) return;
//   hasLoaded.current = true; 
//   // Set Date & Time once
//   const date = new Date();
//   setCurrentDate(date.toDateString());
//   setCurrentTime(`${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`);

//   // Token check logic
 
// const checkTokenAndLoadData = async () => {

  
//   const token = await AsyncStorage.getItem('token');
//   if (!token) {
//     navigation.replace('Loginform');
//     return;
//   }

//   try {
//     const { data } = await axios.get(`http://${ip}:5000/protected`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setMessage(`Data loaded! ${data.message}`);
//     setToken(token);
//   } catch (error) {
//     setMessage('Token expired or invalid. Please login again.');
//     await AsyncStorage.removeItem('token');
//     setToken('');
//   }
// };
//   // checkTokenAndLoadData(); // ✅ Call the function once here

// }, []);

  




 
//   // useEffect(() => {
    
//   //   var date = new Date().toDateString();
//   //   var month = new Date().getMonth();
//   //   var year = new Date().getFullYear(); //Current Date
//   //   var hours=new Date().getHours('hh');
//   //   var minutes=new Date().getMinutes('mm');
//   //   var seconds=new Date().getSeconds('ss');
   
//   //   setCurrentDate(date);
//   //   setCurrentTime(hours+'-'+minutes+'-'+seconds);
      
//   // }, []);

//   const handleLogout=()=>{
//     // setUsername('');
//     // setPassword('');
//     // setToken('');
//     //  AsyncStorage.removeItem('token');
//     // setMessage('Logged out successfully!');
   
//    navigation.replace('Loginform');
   
//   } 
  
  

//   const navigation=useNavigation();

//  const handleSubmit=async()=>{

//         console.log(email+' '+password); 
//         const userData={  email,password};

// try{
   
//    axios.post(`http://`+ip+`:5000/login-user`,userData)
//     // axios.post(apiLink+'/login-user',userData)
//     .then(res=>{
//        const {token,user}=res.data;
//        setToken(token)
//       //  localStorage.setItem('token', token); 
//        console.log(user);
     
//     if(res.data.status=='ok'){
//       Alert.alert("Login Successful");
      
//       //console.log(res.data.user._id);
//         AsyncStorage.setItem('token',res.data.data);
//         AsyncStorage.setItem('User',JSON.stringify(res.data.user));
//         AsyncStorage.setItem('id',res.data.user._id);
//         AsyncStorage.setItem('name',res.data.user.name);
//         AsyncStorage.setItem('email',res.data.user.email);
//         AsyncStorage.setItem('phone',res.data.user.phone);
//         AsyncStorage.setItem('userType',res.data.user.userType);
//         AsyncStorage.setItem('isLoggedIn',JSON.stringify(true));
       
       
//         if(res.data.userType=='ADMIN'){
//                console.log(res.data.user._id);
//                navigation.navigate('home',{user})    
//       }
//       else if(res.data.userType=='USER'){
//                navigation.navigate('userForm',{user});
//       }  
//       else{
//         navigation.navigate('masterAdmin');
//       }
//   } else{
//       Alert.alert("user does not exist");
//   } 
//   });
// }catch (error) {
//   setMessage('Login failed! Invalid credentials.');
// }
// }



//  async function getData(){
//   try{
//   const token=await AsyncStorage.getItem('isLoggedIn');
 
//   console.log(token,'at App1.js');
//   }catch(error){
//     console.log(error);
//   }
// } 

//   return (

//     <ScrollView>
// <View style={styles.contains}>
// <Text style={{textAlign:'center',fontSize:30}}>LOGIN</Text>

// <Text style={styles.textStyle}>  {currentDate} </Text>
// <Clock/>

//     <View style={styles.container}>
       
//        <TextInput style={styles.textInput} label="Email" mode='outlined' onChangeText={email => setEmail(email)}
//           defaultValue={email}/>
  
//     </View>
//     {email.length<1 && <Text style={{color:'red',fontSize:14,alignSelf:'center',marginTop:5}}>  Enter your Email </Text>}

//     <View style={styles.container}>
//     {/* <Text style={styles.Text}> Password:
//     </Text> */}
//     <TextInput style={styles.textInput}  label="Password" mode='outlined' secureTextEntry={true}  onChangeText={password => setPassword(password)}
//         defaultValue={password} />
        
// </View>
// {password.length<1 && <Text style={{color:'red',fontSize:14,alignSelf:'center',marginTop:5}}>Enter your Password </Text>}

// <View style={styles.button}>
//  <TouchableOpacity style={styles.TO1}
//     onPress={handleSubmit}>
//     <Text style={styles.TOtext}>Submit</Text>

//   </TouchableOpacity>
//  <TouchableOpacity style={styles.TO2}
//     onPress={handleLogout}>
//     <Text style={styles.TOtext}>Cancel</Text>

//   </TouchableOpacity>
// </View>
// <View>

//   <Text style={styles.txt}> For new user , Register below</Text>  


 
//   <TouchableOpacity style={styles.edit} title="Register"
//       onPress={() => navigation.navigate("Register")}>
//      <Text style={{ color: 'white',fontSize:14,margin:5}}>Register</Text> 
//   </TouchableOpacity>

//   {/* <TouchableOpacity style={styles.edit} title="Register"
//       onPress={() => navigation.navigate("masterAdmin")}>
//      <Text style={{ color: 'white',fontSize:20,margin:10}}>Madmin</Text> 
//   </TouchableOpacity>
//  */}



//    </View>      

// </View>
// </ScrollView>


    
//   );
// }

// const styles = StyleSheet.create({

//   contains:{
//    backgroundColor:'#f2eece',
//    marginVertical:180,
//   //  borderWidth:1,
//    borderRadius:10,
//    margin:15,
//     paddingTop:10,
//     flexWrap:'wrap',
 
//    borderColor:'black',
//    shadowColor: "#000",
//   shadowOffset: {
//     width: 4,
//     height: 4,
//   },
//   shadowOpacity: 0.30,
//   shadowRadius: 4.65,
//   elevation: 8
//   },
//   container: {
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//     // backgroundColor: '#ecf0f1',
//     padding:5,
//     borderRadius:10,
//     fontWeight:'bold',
//     marginVertical:5,
//     marginHorizontal:10
     
//   },
//   textInput:{
    
//     width:280,
//     height:45,
//     marginLeft:10,
//     textAlign:'left',
//     borderRadius:5

//   },
//   button:{
//   flexDirection:'row',
//   margin:5,
//   paddingTop:10,
//   justifyContent:'space-evenly',
//   borderRadius:8
// },
// TO1:{
//   borderRadius:5,
//   padding:10,
//   textAlign:'center',
//   alignSelf:'center',
//   backgroundColor:'green'

// },
// TO2:{
//   borderRadius:5,
//   borderColor:'black',
//   backgroundColor:'red',
//   alignSelf:'center',
//   padding:10

// },
// TOtext:{
//   color: 'white',
//   fontSize:16

// },
// Text:{
//   paddingTop:0

// },
// txt:{
//   textAlign:'center',
//   padding:0,
//   fontSize:18
// },
// but:{
  
//   justifyContent:'space-evenly',
//   padding:5,
//   margin:10,
//   width:'auto'
  
// },
// edit:{  
//   padding: 8,
//   width:'auto',
//   margin:'auto',
//   marginBottom:10,
//   textAlign:'center',
//   alignItems:'center',
//   borderWidth:2,
//   borderRadius:10,
//   borderColor:'#FFFFFF',
//   flexDirection:'row',
//   justifyContent:'center',
//   backgroundColor:'#5e7480',
//   marginTop:10

// },
// textStyle: {
//   textAlign: 'center',
//   fontSize: 18,
//   color: 'black',
//   fontWeight:'bold'
// }

// });
