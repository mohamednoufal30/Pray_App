import React, { useState,useEffect } from 'react'; 
import {Image,View,Text, SafeAreaView, StyleSheet,Button,TouchableOpacity,ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Timings from './editTimings';
import RegisterForm from './RegisterForm';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
//import axios from 'axios';
import axios,{apiLink, ip} from './axiosConfig';
// You can import supported modules from npm

const wid=Dimensions.get('screen').width;

const MyComponent = () => {
  const navigation = useNavigation();

  const goToNextScreen = () => {
    navigation.navigate("timings");
  };
};

export default function StaticVagi() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  const goToNextScreen=()=>{navigation.navigate("timings")};
/* const [fajrbaang, setfajrbaang] = useState('4:45 AM');
const [zuhrbaang, setzuhrbaang] = useState('12:30 PM');
const [asrbaang, setasrbaang] = useState('3.40 PM');
const [magribbaang, setmagribbaang] = useState('6:30 PM');
const [ishabaang, setishabaang] = useState('7:45 PM');
const [jummahbaang, setjummahbaang] = useState('1:10 PM');
const [fajr, setfajr] = useState('5.35 AM');
const [zuhr, setzuhr] = useState('12:45 PM');
const [asr, setasr] = useState('3.55 PM');
const [magrib, setmagrib] = useState('6:35 PM');
const [isha, setisha] = useState('8:00 PM');
const [jummah, setjummah] = useState('1:20 PM');
 */

const[userData,setUserData]=useState('');
const[Name,setName]=useState('');
const[email,setEmail]=useState('');
const[phone,setPhone]=useState('');
const[id,setid]=useState('');


const [selectedMosque, setSelectedMosque] = useState('');
const [Data, setData] = useState("");
const [items, setItems] = useState([]);
const [timings, settimings] = useState([]);
const [loading, setLoading] = useState(true);




async function getData(){
const token=await AsyncStorage.getItem('token');
 const user=await AsyncStorage.getItem('user');
 const name=await AsyncStorage.getItem('name');
 const email=await AsyncStorage.getItem('email');
 const phone=await AsyncStorage.getItem('phone');
 const id=await AsyncStorage.getItem('id');


setUserData(user);
setName(name);
setEmail(email);
setPhone(phone);
setid(id);
/*

console.log("the data is "+userData);
console.log(name);
console.log(email)
console.log(phone); */

}
 
useEffect(()=>{
getData();

 axios.get('http://'+ip+':5000/Mosques')
.then(response => {
  setItems(response.data);
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching data: ', error);
}); 

},[]); 

const fetchData=async(itemValue)=>{
  const selection=itemValue;
  const email=email;
  axios.get(apiLink+'/selectedMosque',{
    params: { selection }})
  .then(response => {
    settimings(response.data);
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data: ', error);
  }); 
}

const handlePicker=async(itemValue)=>{
  setSelectedMosque(itemValue);
  fetchData(itemValue);

  } 
 

 const handleLogout=()=>{
AsyncStorage.removeItem('token');
 AsyncStorage.removeItem('user');
 AsyncStorage.removeItem('name');
 AsyncStorage.removeItem('email');
 AsyncStorage.removeItem('phone');
 navigation.replace('Loginform');
} 

  return (
<ScrollView horizontal={true}>



<View style={styles.container}>

<View style={styles.containers}>

       <Picker
        selectedValue={selectedMosque}
        style={styles.dropdown}
        placeholder='Select Mosque'
        onValueChange={(itemValue) => {handlePicker(itemValue)}}
      >
        <Picker.Item label='Select Mosque' />
       {items.map((item) => (
          <Picker.Item key={item._id} label={item.mosqueName} value={item.mosqueName}/>
        ))}
        
      </Picker>
      <TouchableOpacity style={{backgroundColor:'black',borderRadius:10}} 
      onPress={handleLogout}>
      
     <Text style={{ color: 'white',fontSize:20,margin:10}}>Logout</Text> 
  </TouchableOpacity>
 
    
    </View>

    <View>
    <Text style={styles.mosquename}>{selectedMosque}</Text>
    </View>
    
    <Text style={styles.mosquename}>WELCOME, {Name.toUpperCase()}!</Text>
   
    

<View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',marginTop:20,alignItems:'center'}}>
      
      
       <Image style={styles.img}
          source={require('../assets/prayer.jpg')}
         />
      <Text style={styles.text}>PRAYERS</Text>
      <Text style={styles.timings}>SALAH</Text>
      <Text style={styles.text}>IKAAMAT</Text>
        
</View>

        <View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',marginTop:20,  alignItems:'center'}}>
      
       <Image style={styles.img}
          source={require('../assets/fajr.png')}
         />
      <Text style={styles.text}>ஃபஜர்</Text>
 
      <Text style={styles.timings}>{timings.fajrSalah}</Text>
      <Text style={styles.text}>{timings.fajrIkaamat}</Text>

    
      
</View>
     
<View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',marginTop:20,alignItems:'center'}}>
      
       <Image style={styles.img}
          source={require('../assets/zuhr.png')}
         />

      <Text style={styles.text}>ஸுஹர்</Text>
      <Text style={styles.timings}>{timings.zuhrSalah}</Text>
      <Text style={styles.text}>{timings.zuhrIkaamat}</Text>
    
      
</View>

     <View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',marginTop:20,alignItems:'center'}}>
      
       <Image style={styles.img}
          source={require('../assets/asr.png')}
         />
      <Text style={styles.text}>அசர்</Text>
      <Text style={styles.timings}>{timings.asrSalah}</Text>
      <Text style={styles.text}>{timings.asrIkaamat}</Text>
  
      
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',marginTop:20,alignItems:'center'}}>
      
       <Image style={styles.img}
          source={require('../assets/magrib.png')}
         />
      <Text style={styles.text}>மக்ரிப்</Text>
      <Text style={styles.timings}>{timings.maghribSalah}</Text>
      <Text style={styles.text}>{timings.maghribIkaamat}</Text>
  
      
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',marginTop:20,alignItems:'center'}}>
      
       <Image style={styles.img}
          source={require('../assets/isha.png')}
         />
      <Text style={styles.text}>இஷா</Text>
      <Text style={styles.timings}>{timings.ishaSalah}</Text>
      <Text style={styles.text}>{timings.ishaIkaamat}</Text>
   
      
</View>


<View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',marginTop:20,alignItems:'center'}}>
      
       <Image style={styles.img}
          source={require('../assets/zuhr.png')}
         />
      <Text style={styles.text}>ஜும்மா</Text>
      <Text style={styles.timings}>{timings.jummahSalah}</Text>
      <Text style={styles.text}>{timings.jummahikaamat}</Text>
 
      
</View>

</View>
</ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    textAlign:'center',
    paddingHorizontal:'auto',
    backgroundColor:'yellow',
    width:wid,
    paddingHorizontal:10
  },
  img:{
    height:40,
    width:40
  },
  text:{
    fontSize:18,
    fontWeight:'bold',
    color:'#0d0d0d',
    alignSelf:'center',
    textTransform:'uppercase'
  },
   timings:{
    fontSize:18,
    fontWeight:'bold',
    color:'#0d0d0d',
    alignSelf:'center',
    padding:20,
    textTransform:'uppercase'
    
  },
  edit:{
    backgroundColor: '#000000',
    borderRadius: 8
  },
  editText:{
    fontSize:15,
    color:'yellow',
    padding:7
  },
  update:{
    color:'#000000',
    fontSize:15,
    fontWeight:'bold'
  }
  ,
  containers: {
    paddingVertical:8,
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    
  },
  containers1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10
  },
  dropdown: {
    width: 280,
    height: 50,
    borderWidth: 1,
    fontSize:15,
    // backgroundColor:'gray'
  },
  mosquename:{
    fontSize:25,
    fontWeight:'bold',
    color:'#0d0d0d',
    alignSelf:'center',
    paddingVertical:8
  },
  mosquenames:{
    fontSize:18,
    fontWeight:'bold',
    color:'#0d0d0d',
    alignSelf:'center',
    paddingVertical:8
  }

  
});
