// import React, { useState,useEffect } from 'react'; 
// import {Image,View,Text, SafeAreaView, StyleSheet,Button,TouchableOpacity,ScrollView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { DataTable } from 'react-native-paper';
// import Timings from '../components/editTimings';
// import RegisterForm from './RegisterForm';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// //import axios from 'axios';
// import axios,{apiLink, ip} from './axiosConfig';
// // You can import supported modules from npm

// const MyComponent = () => {
//   const navigation = useNavigation();

//   const goToNextScreen = () => {
//     navigation.navigate("timings");
//   };
  
// };


//   const logout=()=>{
   
//     console.log("this is logout page");
 
//   }

  



// export default function Vagi() {
//   const navigation = useNavigation();
//   const goToNextScreen=()=>{navigation.navigate("timings")};
// const [fajrbaang, setfajrbaang] = useState('5.30 AM');
// const [zuhrbaang, setzuhrbaang] = useState('12:30 PM');
// const [asrbaang, setasrbaang] = useState('3.40 PM');
// const [magribbaang, setmagribbaang] = useState('6:30 PM');
// const [ishabaang, setishabaang] = useState('7:45 PM');
// const [jummahbaang, setjummahbaang] = useState('1:10 PM');
// const [fajr, setfajr] = useState('5.35 AM');
// const [zuhr, setzuhr] = useState('12:45 PM');
// const [asr, setasr] = useState('3.55 PM');
// const [magrib, setmagrib] = useState('6:35 PM');
// const [isha, setisha] = useState('8:00 PM');
// const [jummah, setjummah] = useState('1:20 PM');



// const[userData,setUserData]=useState('');
// const[Name,setName]=useState('');
// const[email,setEmail]=useState('');
// const[phone,setPhone]=useState('');
// const[id,setid]=useState('');
// const[userType,setUserType]=useState('');

// const [selectedValue, setSelectedValue] = useState('');
// const [selectedMosque, setSelectedMosque] = useState('');
// const [Data, setData] = useState("");
// const [items, setItems] = useState([]);
// const [timings, settimings] = useState([]);


// const salahNames = React.useState([
//   {
//     key: 1,
//     name: 'ஃபஜர்',
 
//   },
//   {
//     key: 2,
//     name: 'ஸுஹர்',
  
//   },
//   {
//     key: 3,
//     name: 'அசர்',
  
//   },
//   {
//     key: 4,
//     name: 'மக்ரிப்',
   
//   },
//   {
//     key: 5,
//     name: 'இஷா',
  
//   },
//   {
//     key: 6,
//     name: 'ஜும்மா',
   
//   },
//  ]);

// async function getData(){
// const token=await AsyncStorage.getItem('token');
//  const user=await AsyncStorage.getItem('User');
//  const name=await AsyncStorage.getItem('name');
//  const email=await AsyncStorage.getItem('email');
//  const phone=await AsyncStorage.getItem('phone');
//  const id=await AsyncStorage.getItem('id');
//  const userType=await AsyncStorage.getItem('userType');

// setName(name);
// setEmail(email);
// setPhone(phone);
// setid(id);
// setUserType(userType);
// setUserData(user);
// //console.log(userData);
// //console.log(name);
// //console.log(email);
// //console.log(phone);
// //console.log(id);
// //console.log("the data is "+user.toString());

// `http://${ip}:6000/login-user`
// axios.get(`http://${ip}:6000/Mosques/${email}`)
// .then(response => {
//   setItems(response.data);
//   console.log(response.data);
  
// })
// .catch(error => {
//   console.error('Error fetching data: ', error);
// }); 


// }

// useEffect((User)=>{
 
// getData();


// /* const Email=email;
// axios.get(`http://192.168.109.83:5000/Mosques/${Email}`)
// .then(response => {
//   setItems(response.data);
//   console.log(response.data);
// })
// .catch(error => {
//   console.error('Error fetching data: ', error);
// });  */
 
//  //getAdmin(email);


// },[]); 



// const handlePicker=async(itemValue)=>{
 
//   //setSelectedMosque(itemValue);
//   //fetchData(itemValue);
 
//    //AsyncStorage.setItem('Timings',JSON.stringify(timings));

//    const selection=itemValue;
//    const email=email;
//    axios.get(`http://${ip}:6000/selectedMosque`,{
//      params: { selection }})
//    .then(response => {
//      settimings(response.data);
//      console.log(response.data);
//      AsyncStorage.setItem('Timings',JSON.stringify('timings'));
//      console.log("timings are"+selection);
    
//    })
//    .catch(error => {
//      console.error('Error fetching data: ', error);
//    }); 
//    setSelectedMosque(itemValue);
//    //AsyncStorage.setItem('Timings',JSON.stringify('timings'));
//    console.log(timings.mosqueName);
   
//   } 
 

//  const handleLogout=()=>{
//   AsyncStorage.removeItem('token');
//  AsyncStorage.removeItem('user');
//  AsyncStorage.removeItem('name');
//  AsyncStorage.removeItem('email');
//  AsyncStorage.removeItem('phone');
//  navigation.replace('Loginform');
 
// } 

//   return (
// <ScrollView horizontal={true}>
// <View style={styles.container}>
//      <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingHorizontal:10,paddingVertical:20}}>
     
       
      
//       <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
//       onPress={()=>navigation.navigate('timings')}>
//      <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>Create</Text> 
//     </TouchableOpacity>

//     <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
//       onPress={()=>navigation.navigate('timingEdit',{timings})}>
//      <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>Edit</Text> 
//     </TouchableOpacity>

//     <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
//       onPress={()=>navigation.navigate('userForm')}>
//      <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>View</Text> 
//     </TouchableOpacity>
   
   
//       <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
//       onPress={handleLogout}>
//      <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>Logout</Text> 
//   </TouchableOpacity>
     
//     </View>
//     <View>
//     <Picker
//         selectedValue={selectedMosque}
//         style={styles.dropdown}
//         onValueChange={(itemValue) => {handlePicker(itemValue)}}
//       >
//         <Picker.Item label='Select Mosque' />

//        {items.map((item) => (
//           <Picker.Item key={item._id} label={item.mosqueName} value={item.mosqueName}/>
//         ))}
        
//       </Picker>
//     <Text style={{alignSelf:'center',paddingVertical:10,fontWeight:'bold',fontSize:20}}>{timings.mosqueName}</Text>
//     <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold'}}>WELCOME, {Name.toUpperCase()}!</Text>
   
//     </View>
// <View style={styles.rowWise}>
      
      
//        <Image style={styles.img}
//           source={require('../assets/prayer.jpg')}
//          />
//       <Text style={styles.text}>PRAYERS</Text>
//       <Text style={styles.text}>SALAH</Text>
//       <Text style={styles.text}>IKAAAMAT</Text>
        
// </View>

//         <View style={styles.rowWise}>
      
//        <Image style={styles.img}
//           source={require('../assets/fajr.png')}
//          />
//       <Text style={styles.text}>ஃபஜர்</Text>
 
//       <Text style={styles.text}>{timings.fajrSalah}</Text>
//       <Text style={styles.text}>{timings.fajrIkaamat}</Text>

//     <TouchableOpacity style={styles.edit} 
//     onPress={goToNextScreen }>
    

//      </TouchableOpacity>
      
// </View>
     
// <View style={styles.rowWise}>
      
//        <Image style={styles.img}
//           source={require('../assets/zuhr.png')}
//          />

//       <Text style={styles.text}>ஸுஹர்</Text>
//       <Text style={styles.text}>{timings.zuhrSalah}</Text>
//       <Text style={styles.text}>{timings.zuhrIkaamat}</Text>
//      <TouchableOpacity style={styles.edit}
//      onPress={goToNextScreen }>
    

// </TouchableOpacity>
      
// </View>

//      <View style={styles.rowWise}>
      
//        <Image style={styles.img}
//           source={require('../assets/asr.png')}
//          />
//       <Text style={styles.text}>அசர்</Text>
//       <Text style={styles.text}>{timings.asrSalah}</Text>
//       <Text style={styles.text}>{timings.asrIkaamat}</Text>
//   <TouchableOpacity style={styles.edit}
//       onPress={goToNextScreen }>
   

//   </TouchableOpacity>
      
// </View>

// <View style={styles.rowWise}>
      
//        <Image style={styles.img}
//           source={require('../assets/magrib.png')}
//          />
//       <Text style={styles.text}>மக்ரிப்</Text>
//       <Text style={styles.text}>{timings.maghribSalah}</Text>
//       <Text style={styles.text}>{timings.maghribIkaamat}</Text>
//   <TouchableOpacity style={styles.edit}
//     onPress={goToNextScreen }>
 

//   </TouchableOpacity>
      
// </View>

// <View style={styles.rowWise}>
      
//        <Image style={styles.img}
//           source={require('../assets/isha.png')}
//          />
//       <Text style={styles.text}>இஷா</Text>
//       <Text style={styles.text}>{timings.ishaSalah}</Text>
//       <Text style={styles.text}>{timings.ishaIkaamat}</Text>
//    <TouchableOpacity style={styles.edit}
//       onPress={goToNextScreen }>
    
// </TouchableOpacity>
      
// </View>


// <View style={styles.rowWise}>
      
//        <Image style={styles.img}
//           source={require('../assets/zuhr.png')}
//          />
//       <Text style={styles.text}>ஜும்மா</Text>
//       <Text style={styles.text}>{timings.jummahSalah}</Text>
//       <Text style={styles.text}>{timings.jummahikaamat}</Text>
//   <TouchableOpacity style={styles.edit}
//     onPress={goToNextScreen }>
   

//   </TouchableOpacity>
      
// </View>

// </View>
// </ScrollView>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     textAlign:'center',
//     paddingHorizontal:8,
//     backgroundColor:'#f2eece',
//     width:410
    
    
    
//   },
//   img:{
//     height:40,
//     width:35
//   },
//   rowWise:{
//     flexDirection:'row',
//     justifyContent:'space-around',
//     textAlign:'center',
//     marginTop:20,
//     paddingVertical:10,
//     width:410
    
//   },
//   text:{
//     fontSize:18,
//     fontWeight:'bold',
//     color:'#0d0d0d',
//    paddingVertical:10,
//     textTransform:'uppercase',
//     justifyContent:'space-evenly'
//   },
//    timings:{
//     fontSize:18,
//     fontWeight:'bold',
//     color:'#0d0d0d',
//     alignItems:'center',
//     padding:15,
//     textTransform:'uppercase',
//     justifyContent:'space-evenly'
    
//   },
//   edit:{
//     backgroundColor: '#000000',
//     borderRadius: 8
//   },
//   editText:{
//     fontSize:15,
//     color:'yellow',
//     padding:7
//   },
//   update:{
//     color:'#000000',
//     fontSize:15,
//     fontWeight:'bold'
//   }
  
// });

import React, { useState, useEffect } from 'react';
import {
  Image, View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert,Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLink, ip } from './axiosConfig';
import axios from 'axios';
import Header from './header';
import { set } from 'mongoose';
import { ActivityIndicator } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Vagi() {
  const navigation = useNavigation();
  const [timings, setTimings] = useState({});
  const [items, setItems] = useState([]);
  const [selectedMosque, setSelectedMosque] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [phone, setPhone] = useState('');
  const[imageUrl,setImageUrl]=useState('');
  const[loading,setLoading]=useState(true);
  const [isTokenValid, setIsTokenValid] = useState(true);

  // ⛔ Logout Function
  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsTokenValid(false);
    
    Alert.alert("Thanking you for using Prayer app,Login Again !");
    navigation.replace('Forms');

  };

  // ✅ Validate Token & Fetch User Data
  const validateTokenAndFetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // const userEmail = await AsyncStorage.getItem('email');
      const userName = await AsyncStorage.getItem('name');
      const userPhone = await AsyncStorage.getItem('phone');
      const type=await AsyncStorage.getItem('userType');
      
      console.log("token is", token);
      console.log("page Rendered");

      // if (!token || !userPhone) {
      //   handleLogout();
      //   return;
      // }

      // Optional: validate token by pinging backend if needed
      const res = await axios.get(apiLink+`/protected`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.valid !== true) {
        handleLogout();
        return;
      }

      // Token valid, fetch user-related data
      setName(userName);
      setUserType(type);
      // setEmail(userEmail);

      // const mosqueRes = await axios.get(`http://${ip}:6000/Mosques/${userEmail}`);
      const mosqueRes = await axios.get(apiLink+`/Mosques`);
      const data = mosqueRes.data;
      setItems(data);

      
//       console.log("the timings are",timings.mosqueName);
// console.log("the timings are",timings);
      
      // ✅ Use data instead of items here
      if (data.length > 0) {
        setSelectedMosque(data[0].mosqueName);
        handlePicker(data[0].mosqueName);
        
        
      }


    } catch (err) {
      console.error("Token validation or data fetch failed:", err);
      handleLogout();
    }
  };

  // ✅ Mosque Selection Handler
  const handlePicker = async (itemValue) => {
    try {
      if (!itemValue) return; // No selection made
      setSelectedMosque(itemValue);

      const res = await axios.get(apiLink+`/selectedMosque`, {
        params: { selection: itemValue }
      });

      setTimings(res.data);
      setImageUrl(res.data.image);
      console.log("the timings are",res.data.image);
//       console.log("the timings are",timings.mosqueName);
// console.log("the timings are",timings);
      // console.log("Selected mosque timings:", timings);
      await AsyncStorage.setItem('Timings', JSON.stringify(res.data));
      // setLoading(false);

    } catch (err) {
      console.error('Error fetching mosque timings:', err);
    }
  };

  useEffect(() => {
  
   validateTokenAndFetchData(); // Validate token and fetch data on component mount
     // Set a timeout to remove the token after 1 minute
  // const removeTokenTimeout = setTimeout(async () => {
  //   try {
  //     console.log("Removing token after 1 minute...");
  //     await AsyncStorage.removeItem('token');
  //     navigation.replace('Loginform');
  //   } catch (err) {
  //     console.error('Failed to remove token:', err);
  //   }
  // }, 600000); // 1 minute

  // Regularly check token every 10 seconds (or any shorter interval)
  // const interval = setInterval(async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     console.log("Checking token:", token);
  //     if (!token) {
  //       setIsTokenValid(false);
  //       handleLogout(); // Will navigate to LoginForm
  //     } else {
  //       setIsTokenValid(true);
  //     }
  //   } catch (error) {
  //     console.error('Token check failed:', error);
  //     handleLogout();
  //   }
  // }, 50000); // Check every 60 seconds
// console.log("the timings are",timings.mosqueName);
// console.log("the timings are",timings.imageUrl);
  return () => {
    // clearInterval(interval);
    // clearTimeout(removeTokenTimeout);
  };
  }, []);

  return (
    // loading ? (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <ActivityIndicator size="large" color="#0000ff" />
    //     <Text style={styles.textHeader}>Loading...</Text>
    //   </View>
    // ) : 
    isTokenValid ? (
     
       
        <ScrollView >
        <View>
        <Header imageUrl={imageUrl} />
        </View>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 10 }}>
            <Text style={styles.textHeader}>WELCOME, {name.toUpperCase()}!</Text>
              {userType === 'ADMIN' && (
                <TouchableOpacity
                  style={styles.edit}
                  onPress={() => navigation.navigate('timingEdit', { timings })}
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.edit} onPress={handleLogout}>
                <Text style={styles.editText}>Logout</Text>
              </TouchableOpacity>
            </View>
  <View style={{ flexDirection: 'row', justifyContent: 'center',alignSelf: 'center'}}>
            <Text style={{fontSize: 16, height: 30,marginBottom:8,fontWeight:300 }}>
               பள்ளிவாசலை தேர்ந்தெடுங்கள்
            </Text>
  </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMosque}
                style={styles.dropdown}
                onValueChange={handlePicker}
              >
                {/* <Picker.Item label="Select Mosque" value="" /> */}
                {items.map(item => (
                  <Picker.Item key={item._id} label={item.mosqueName} value={item.mosqueName} />
                ))}
              </Picker>
            </View>
  
           
            {/* <Text style={styles.textHeader}>WELCOME, {name.toUpperCase()}!</Text> */}
            {renderTimingRow('தொழுகை', 'பாங்கு', 'இகாமத்', require('../assets/prayer.jpg'))}
            {renderTimingRow('ஃபஜர்', timings.fajrSalah +" AM", timings.fajrIkaamat +" AM", require('../assets/fajr.png'))}
            {renderTimingRow('லுஹர்', timings.zuhrSalah+" PM", timings.zuhrIkaamat+" PM", require('../assets/zuhr.png'))}
            {renderTimingRow('அஸர்', timings.asrSalah+" PM", timings.asrIkaamat+" PM", require('../assets/asr.png'))}
            {renderTimingRow('மக்ரிப்', timings.maghribSalah+" PM", timings.maghribIkaamat+" PM", require('../assets/magrib.png'))}
            {renderTimingRow('இஷா', timings.ishaSalah+" PM", timings.ishaIkaamat+" PM", require('../assets/isha.png'))}
            {renderTimingRow('ஜும்மா', timings.jummahSalah+" PM", timings.jummahikaamat+" PM", require('../assets/zuhr.png'))}
          </View>
        </ScrollView>
    
    ) : (
      <View style={styles.container}>
        <Text style={styles.textHeader}> Token Expired,Please log in again.</Text>
      </View>
    )
  );
}

// 🧩 Helper: Render one row
const renderTimingRow = (name, salah, ikaamat, icon) => (
  <View style={styles.rowWise}>
    <View style={styles.cell}><Image style={styles.img} source={icon} /></View>
    <View style={styles.cell}><Text style={styles.text}>{name || '--:--'}</Text></View>
    <View style={styles.cell}><Text style={styles.text}>{salah || '--:--'}</Text></View>
    <View style={styles.cell}><Text style={styles.text}>{ikaamat || '--:--'}</Text></View>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 0,
    backgroundColor: '#f2eece',
    width: 'auto'
  },
  // rowWise: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   // marginTop: 8,
  //   // paddingVertical: 2,
  //   width: '100%',
  //   height: 70,
  // },
  
  // cell: {
  //   flex: 1,
  //   height: 60,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  
  // img: {
  //   height: 35,
  //   width: 35,
  //   resizeMode: 'contain',
  // },
  
  // text: {
  //   fontSize: 15,
  //   height: 30,
  //   fontWeight: 'bold',
  //   color: '#0d0d0d',
  //   textTransform: 'uppercase',
  //   textAlign: 'center',
  // },
  edit: {
    backgroundColor: '#000000',
    borderRadius: wp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    margin: wp('3%'),
  },
  editText: {
    fontSize: wp('4%'), // roughly 15 on standard devices
    color: 'white',
    textAlign: 'center',
  },
   textHeader: {
    alignSelf: 'center',
    paddingVertical: hp('2%'),
    fontWeight: 'bold',
    fontSize: wp('5%'), // approximately 18px on standard screens
    textAlign: 'center',
  },
  dropdown: {
   height:hp('6%'),
    width: wp('85%'),
    
 
   
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5, 
    width: '85%',
    alignSelf: 'center',
  },

   rowWise: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    width: wp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: wp('8%'),
    height: hp('4%'),
    borderRadius:5
  },
  text: {
    fontSize: wp('3.2%'),
    height: hp('4%'),
    fontWeight: 'bold',
    color: '#333',
  },

});
