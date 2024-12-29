import React, { useState,useEffect } from 'react'; 
import {Image,View,Text, SafeAreaView, StyleSheet,Button,TouchableOpacity,ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Timings from '../components/editTimings';
import RegisterForm from './RegisterForm';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import axios from 'axios';
import axios,{ip} from './axiosConfig';
// You can import supported modules from npm

const MyComponent = () => {
  const navigation = useNavigation();

  const goToNextScreen = () => {
    navigation.navigate("timings");
  };
  
};


  const logout=()=>{
   
    console.log("this is logout page");
 
  }

  



export default function Vagi() {
  const navigation = useNavigation();
  const goToNextScreen=()=>{navigation.navigate("timings")};
const [fajrbaang, setfajrbaang] = useState('5.30 AM');
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



const[userData,setUserData]=useState('');
const[Name,setName]=useState('');
const[email,setEmail]=useState('');
const[phone,setPhone]=useState('');
const[id,setid]=useState('');
const[userType,setUserType]=useState('');

const [selectedValue, setSelectedValue] = useState('');
const [selectedMosque, setSelectedMosque] = useState('');
const [Data, setData] = useState("");
const [items, setItems] = useState([]);
const [timings, settimings] = useState([]);


async function getData(){
const token=await AsyncStorage.getItem('token');
 const user=await AsyncStorage.getItem('User');
 const name=await AsyncStorage.getItem('name');
 const email=await AsyncStorage.getItem('email');
 const phone=await AsyncStorage.getItem('phone');
 const id=await AsyncStorage.getItem('id');
 const userType=await AsyncStorage.getItem('userType');

setName(name);
setEmail(email);
setPhone(phone);
setid(id);
setUserType(userType);
setUserData(user);
//console.log(userData);
//console.log(name);
//console.log(email);
//console.log(phone);
//console.log(id);
//console.log("the data is "+user.toString());


axios.get(`http://`+ip+`:5000/Mosques/${email}`)
.then(response => {
  setItems(response.data);
  console.log(response.data);
  
})
.catch(error => {
  console.error('Error fetching data: ', error);
}); 


}

useEffect((User)=>{
 
getData();


/* const Email=email;
axios.get(`http://192.168.109.83:5000/Mosques/${Email}`)
.then(response => {
  setItems(response.data);
  console.log(response.data);
})
.catch(error => {
  console.error('Error fetching data: ', error);
});  */
 
 //getAdmin(email);


},[]); 



const handlePicker=async(itemValue)=>{
 
  //setSelectedMosque(itemValue);
  //fetchData(itemValue);
 
   //AsyncStorage.setItem('Timings',JSON.stringify(timings));

   const selection=itemValue;
   const email=email;
   axios.get('http://'+ip+':5000/selectedMosque',{
     params: { selection }})
   .then(response => {
     settimings(response.data);
     console.log(response.data);
     AsyncStorage.setItem('Timings',JSON.stringify('timings'));
     console.log("timings are"+selection);
    
   })
   .catch(error => {
     console.error('Error fetching data: ', error);
   }); 
   setSelectedMosque(itemValue);
   //AsyncStorage.setItem('Timings',JSON.stringify('timings'));
   console.log(timings.mosqueName);
   
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
     <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingHorizontal:10,paddingVertical:20}}>
     
       
      
      <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
      onPress={()=>navigation.navigate('timings')}>
     <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>Create</Text> 
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
      onPress={()=>navigation.navigate('timingEdit',{timings})}>
     <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>Edit</Text> 
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
      onPress={()=>navigation.navigate('userForm')}>
     <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>View</Text> 
    </TouchableOpacity>
   
   
      <TouchableOpacity style={{backgroundColor:'black',borderRadius:10,width:'auto'}} 
      onPress={handleLogout}>
     <Text style={{ color: 'white',fontSize:20,margin:10,textAlign:'center'}}>Logout</Text> 
  </TouchableOpacity>
     
    </View>
    <View>
    <Picker
        selectedValue={selectedMosque}
        style={styles.dropdown}
        onValueChange={(itemValue) => {handlePicker(itemValue)}}
      >
        <Picker.Item label='Select Mosque' />

       {items.map((item) => (
          <Picker.Item key={item._id} label={item.mosqueName} value={item.mosqueName}/>
        ))}
        
      </Picker>
    <Text style={{alignSelf:'center',paddingVertical:10,fontWeight:'bold',fontSize:20}}>{timings.mosqueName}</Text>
    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold'}}>WELCOME, {Name.toUpperCase()}!</Text>
   
    </View>
<View style={styles.rowWise}>
      
      
       <Image style={styles.img}
          source={require('../assets/prayer.jpg')}
         />
      <Text style={styles.text}>PRAYERS</Text>
      <Text style={styles.text}>SALAH</Text>
      <Text style={styles.text}>IKAAAMAT</Text>
        
</View>

        <View style={styles.rowWise}>
      
       <Image style={styles.img}
          source={require('../assets/fajr.png')}
         />
      <Text style={styles.text}>ஃபஜர்</Text>
 
      <Text style={styles.text}>{timings.fajrSalah}</Text>
      <Text style={styles.text}>{timings.fajrIkaamat}</Text>

    <TouchableOpacity style={styles.edit} 
    onPress={goToNextScreen }>
    

     </TouchableOpacity>
      
</View>
     
<View style={styles.rowWise}>
      
       <Image style={styles.img}
          source={require('../assets/zuhr.png')}
         />

      <Text style={styles.text}>ஸுஹர்</Text>
      <Text style={styles.text}>{timings.zuhrSalah}</Text>
      <Text style={styles.text}>{timings.zuhrIkaamat}</Text>
     <TouchableOpacity style={styles.edit}
     onPress={goToNextScreen }>
    

</TouchableOpacity>
      
</View>

     <View style={styles.rowWise}>
      
       <Image style={styles.img}
          source={require('../assets/asr.png')}
         />
      <Text style={styles.text}>அசர்</Text>
      <Text style={styles.text}>{timings.asrSalah}</Text>
      <Text style={styles.text}>{timings.asrIkaamat}</Text>
  <TouchableOpacity style={styles.edit}
      onPress={goToNextScreen }>
   

  </TouchableOpacity>
      
</View>

<View style={styles.rowWise}>
      
       <Image style={styles.img}
          source={require('../assets/magrib.png')}
         />
      <Text style={styles.text}>மக்ரிப்</Text>
      <Text style={styles.text}>{timings.maghribSalah}</Text>
      <Text style={styles.text}>{timings.maghribIkaamat}</Text>
  <TouchableOpacity style={styles.edit}
    onPress={goToNextScreen }>
 

  </TouchableOpacity>
      
</View>

<View style={styles.rowWise}>
      
       <Image style={styles.img}
          source={require('../assets/isha.png')}
         />
      <Text style={styles.text}>இஷா</Text>
      <Text style={styles.text}>{timings.ishaSalah}</Text>
      <Text style={styles.text}>{timings.ishaIkaamat}</Text>
   <TouchableOpacity style={styles.edit}
      onPress={goToNextScreen }>
    
</TouchableOpacity>
      
</View>


<View style={styles.rowWise}>
      
       <Image style={styles.img}
          source={require('../assets/zuhr.png')}
         />
      <Text style={styles.text}>ஜும்மா</Text>
      <Text style={styles.text}>{timings.jummahSalah}</Text>
      <Text style={styles.text}>{timings.jummahikaamat}</Text>
  <TouchableOpacity style={styles.edit}
    onPress={goToNextScreen }>
   

  </TouchableOpacity>
      
</View>

</View>
</ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    textAlign:'center',
    paddingHorizontal:8,
    backgroundColor:'yellow',
    width:410
    
    
    
  },
  img:{
    height:40,
    width:35
  },
  rowWise:{
    flexDirection:'row',
    justifyContent:'space-around',
    textAlign:'center',
    marginTop:20,
    paddingVertical:10,
    width:410
    
  },
  text:{
    fontSize:18,
    fontWeight:'bold',
    color:'#0d0d0d',
   paddingVertical:10,
    textTransform:'uppercase',
    justifyContent:'space-evenly'
  },
   timings:{
    fontSize:18,
    fontWeight:'bold',
    color:'#0d0d0d',
    alignItems:'center',
    padding:15,
    textTransform:'uppercase',
    justifyContent:'space-evenly'
    
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
  
});
