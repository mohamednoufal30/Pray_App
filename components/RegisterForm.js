import { TouchableOpacity,Text, SafeAreaView,ScrollView, StyleSheet,View,KeyboardAvoidingView,Dimensions,TouchableWithoutFeedback,Platform,Keyboard, Alert } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native'; 
import React,{useEffect,useState,useRef} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
// You can import supported modules from npm
import { Card ,RadioButton,TextInput,Button} from 'react-native-paper';
import Clock from '../components/clock';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import {apiLink, ip} from './axiosConfig';
import { ZoomIn } from 'react-native-reanimated';

const width=Dimensions.get('window').width;
const height=  Dimensions.get('window').height;



export default function RegisterForm() {
  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');

  const[name,setName]=useState('');
  // const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[phone,setPhone]=useState('');
  // const [userType, setUserType] = useState(''); 
  // const[secretText,setSecretText]=useState('');
  //   const [pin, setPin] = useState(['', '', '', '']);
  //     const inputRefs = useRef([]);

  useEffect(() => {
    var date = new Date().toDateString().toString();
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


const navigation=useNavigation();

  const handleSubmit=async()=>{
    // console.log(name+' ' +' '+phone+' '+password);
  

   const usersData={
      name,phone,password
    };

//  console.log(apiLink);

    try {
      if(!name || !phone || !password){
        Alert.alert("Please fill all the fields");  
        return;
      }
      if (password.length < 4) {
        Alert.alert("Password must be at least 4 characters long");
        return;
      }
      if (phone.length < 10) {
        Alert.alert("Phone number must be at least 10 digits long");
        return;
      }
      if (isNaN(phone)) {
        Alert.alert("Phone number must be a number");
        return;
      }
      if (isNaN(password)) {
        Alert.alert("Password must be a number");

        return;
      }
      
      const res = await axios.post(apiLink+'/usersRegister', usersData);
      // console.log(res.status);
  
      if (res.data.status === "ok") {
        Alert.alert("Registered Successfully");
        navigation.navigate('Forms');
      } else {
        Alert.alert("Phone number already exists");
      }
    } catch (e) {
      // console.error("Error submitting data:", e.response?.data || e.message);
      Alert.alert("Error registering user");
    }
}


  
  return (

    <ScrollView>
      <Animatable.View style={styles.contains} animation="zoomIn" duration={700} delay={50}>
<Text style={styles.userRegis}> USER REGISTRATION</Text>
<Text style={styles.textStyle}>  {currentDate} </Text>
<Clock/>


    <View style={styles.container}>
   
    <TextInput style={styles.textInput} label="UserName" mode='outlined' maxLength={25} onChangeText={name => setName(name)}
        defaultValue={name}   activeOutlineColor='black' left={<TextInput.Icon icon="account" size={25}/>}/>

    </View>
    {name.length<1 && <Text style={{color:'black',fontSize:14,alignSelf:'center',marginTop:5}}>  Enter your name </Text>}
    


    

    <View style={styles.container}>

    <TextInput style={styles.textInput} keyboardType='number-pad' label="PhoneNumber" mode='outlined' maxLength={10} onChangeText={phone => setPhone(phone)}
        defaultValue={phone}   activeOutlineColor='black' left={<TextInput.Icon icon="phone" size={20}/>} />

    </View>
    {phone.length<1 && <Text style={{color:'black',fontSize:14,alignSelf:'center',marginTop:5}}>  Enter your PhoneNumber </Text>}

    

    <View style={styles.container}>
  
       <TextInput style={styles.textInput} keyboardType='number-pad' label="Set 4-Digit Pin" mode='outlined' secureTextEntry={true} onChangeText={password => setPassword(password)}
        defaultValue={password}   activeOutlineColor='black' maxLength={4}  left={<TextInput.Icon icon="lock" size={20}/>} />
    </View>
{password.length<1 && <Text style={{color:'black',fontSize:14,alignSelf:'center',marginTop:5}}>  Set 4-Digit Pin </Text>}



<View style={styles.button}>

   <Button
             mode="contained"
             onPress={handleSubmit}
             style={styles.registerButton}
             labelStyle={{ fontSize: 15, fontWeight: 'bold',color: 'white' }}
             >
            Sign Up
            </Button>

</View>
  
         


</Animatable.View>

</ScrollView>
    
  );
}

const styles = StyleSheet.create({
    one:{
        flex:1,
          },
  contains:{
    flex:1,
  marginVertical: 80,
    display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#feada6',  // Light purple
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  borderRadius: 10,
  paddingHorizontal: 30,
  paddingVertical: 20, 

  },
  container: {
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor: '#ecf0f1',
    // padding:10,
    borderRadius:10,
    fontWeight:'bold',
    marginVertical:10 
  },
  userRegis:{
    fontSize: RFValue(30), 
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingBottom:10,
    textAlign:'center',
    fontSize:25

  },
  textInput:{
    width:280,
    height:45,
    marginLeft:10,
    textAlign:'left',
    borderRadius:5

  },
  button:{
  flexDirection:'row',
  marginTop:15,
  paddingBottom:5,
  justifyContent:'space-evenly',
  borderRadius:8
},
TO1:{
  borderRadius:5,
  padding:8,
  backgroundColor:'green'

},
TO2:{
  borderRadius:5,
  borderColor:'black',
  backgroundColor:'red',
  padding:8

},
TOtext:{
  color: 'white',
  fontSize:17

},
Text:{
  paddingTop:5,
  fontWeight:'bold',
  fontSize:15,
  textAlign:'left',
  textTransform:'uppercase',
  

},
txt:{
  textAlign:'center',
  padding:5,
  fontSize:15,
  
},
but:{
  
  justifyContent:'space-evenly',
  padding:5,
  margin:10,
  width:30
  
},
edit:{  
  padding: '10',
  width:80,
  margin:'auto',
  marginBottom:5,
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
  paddingBottom:10,
  textAlign: 'center',
  fontSize: 18,
  color: 'black',
  fontWeight:'bold'
},
RadioButtons:{
flexDirection:'column',
 paddingVertical:0,
 justifyContent:'space-evenly' 
},
conta: {
  padding: 20,
},
pinContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
pinInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  width: 50,
  height: 50,
  fontSize: 20,
  textAlign: 'center',
  borderRadius: 8,
  marginHorizontal: 5,
},
error: {
  color: 'red',
  marginTop: 10,
},
registerButton: {
  alignSelf: 'center',
  marginBottom: 10,
  marginTop: 10,
  borderRadius: 10,
  backgroundColor: '#6e45e2',
  // width: 120,
  // height: 50,
  justifyContent: 'center',
}
});
