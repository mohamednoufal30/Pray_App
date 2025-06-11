import { TouchableOpacity,Text, SafeAreaView,ScrollView, StyleSheet,View,Button,KeyboardAvoidingView,Dimensions,TouchableWithoutFeedback,Platform,Keyboard, Alert } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native'; 
import React,{useEffect,useState,useRef} from 'react';

import axios from 'axios';
// You can import supported modules from npm
import { Card ,RadioButton,TextInput} from 'react-native-paper';
import Clock from '../components/clock';

import {apiLink, ip} from './axiosConfig';

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
    console.log(name+' ' +' '+phone+' '+password);
  

   const usersData={
      name,phone,password
    };

 console.log(apiLink);

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
      console.log(res.status);
  
      if (res.data.status === "ok") {
        Alert.alert("Registered Successfully");
        navigation.navigate('Forms');
      } else {
        Alert.alert("Registration failed");
      }
    } catch (e) {
      console.error("Error submitting data:", e.response?.data || e.message);
      Alert.alert("Error registering user");
    }
}


// const handleChange = (text, index) => {
//   if (/^\d$/.test(text)) {
//     const newPin = [...pin];
//     newPin[index] = text;
//     setPin(newPin);
//     if (index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   } else if (text === '') {
//     const newPin = [...pin];
//     newPin[index] = '';
//     setPin(newPin);
//   }
// };

// const handleKeyPress = (e, index) => {
//   if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
//     inputRefs.current[index - 1].focus();
//   }
// };

// const combinedPin = pin.join('');

  
  return (

    <ScrollView>
      <View style={styles.contains}>
<Text style={styles.userRegis}> USER REGISTRATION</Text>
<Text style={styles.textStyle}>  {currentDate} </Text>
<Clock/>

{/* <View style={styles.RadioButtons}>
  <View>
    <Text style={{fontSize:15,fontWeight:'bold',textTransform:'uppercase',textAlign:'center',paddingVertical:20}}>Register As</Text>
  </View>
  <View style={{flexDirection:'row',justifyContent:'center'}}>
  <View style={{flexDirection:'row' }}>
     <RadioButton  value="option1" 
                        status={userType === 'MAdmin' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setUserType('MAdmin')} 
                        color="#007BFF"/>
    <Text style={{fontSize:18,flexDirection:'row'}}>MAdmin</Text>
    </View>
    
   <View style={{flexDirection:'row' }}>
     <RadioButton value="option2"
                        status={userType === 'ADMIN' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setUserType('ADMIN')} 
                        color="#007BFF"/>
    <Text style={{fontSize:18,flexDirection:'row'}}>Admin</Text>
    </View>
    <View style={{flexDirection:'row' }}>
     <RadioButton  value="option3"
                        status={userType === 'USER' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setUserType('USER')} 
                        color="#007BFF"/>
    <Text style={{fontSize:18,flexDirection:'row'}}>User</Text>
    </View>
    
    </View>
    {userType.length<1 && <Text style={{color:'red',fontSize:14,alignSelf:'center',marginTop:5}}>  Select UserType</Text>}
    
   
</View>   */}
{/* 
{userType=='MAdmin' ? (
  
<View style={styles.container}>
   
    <TextInput style={styles.textInput} label=" SecretText" mode='outlined' onChangeText={secretText => setSecretText(secretText)}
        defaultValue={secretText}/>

    </View>
):(
''
)} */}
    <View style={styles.container}>
   
    <TextInput style={styles.textInput} label="UserName" mode='outlined' maxLength={25} onChangeText={name => setName(name)}
        defaultValue={name}/>

    </View>
    {name.length<1 && <Text style={{color:'red',fontSize:14,alignSelf:'center',marginTop:5}}>  Enter your name </Text>}
    


    {/* <View style={styles.container}> 
   
   <TextInput style={styles.textInput} label="Email" required={true} mode='outlined' onChangeText={email => setEmail(email)}
        defaultValue={email}/>

    </View>
    {email.length<1 && <Text style={{color:'red',fontSize:14,alignSelf:'center',marginTop:5}}>  Enter your email </Text>} */}

    <View style={styles.container}>

    <TextInput style={styles.textInput} keyboardType='number-pad' label="PhoneNumber" mode='outlined' maxLength={10} onChangeText={phone => setPhone(phone)}
        defaultValue={phone}/>

    </View>
    {phone.length<1 && <Text style={{color:'red',fontSize:14,alignSelf:'center',marginTop:5}}>  Enter your PhoneNumber </Text>}

    

    <View style={styles.container}>
  
       <TextInput style={styles.textInput} keyboardType='number-pad' label="Set 4-Digit Pin" mode='outlined' secureTextEntry={true} onChangeText={password => setPassword(password)}
        defaultValue={password} maxLength={4}/>
    </View>
{password.length<1 && <Text style={{color:'red',fontSize:14,alignSelf:'center',marginTop:5}}>  Set 4-Digit Pin </Text>}


{/* <View style={styles.conta}>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.pinInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            secureTextEntry={true}
          />
        ))}
      </View>
      {combinedPin.length < 4 && (
        <Text style={styles.error}>Enter your 4-digit PIN</Text>
      )}
    </View> */}


{/* <View style={styles.RadioButtons}>
  <View>
    <Text style={{fontSize:20,fontWeight:'bold',textTransform:'uppercase',alignItems:'flex-start'}}>UserType :</Text>
  </View>
    
   <View style={{flexDirection:'row' }}>
     <RadioButton value="option1"
                        status={userType === 'ADMIN' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setUserType('ADMIN')} 
                        color="#007BFF"/>
    <Text style={{fontSize:25,flexDirection:'row'}}>Admin</Text>
    </View>
    <View style={{flexDirection:'row' }}>
     <RadioButton  value="option2"
                        status={userType === 'USER' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setUserType('USER')} 
                        color="#007BFF"/>
    <Text style={{fontSize:25,flexDirection:'row'}}>User</Text>
    </View>
   
</View>  
 */}

<View style={styles.button}>
 <TouchableOpacity style={styles.TO1}
    onPress={handleSubmit}>
    <Text style={styles.TOtext}>Submit</Text>

  </TouchableOpacity>
 {/* <TouchableOpacity style={styles.TO2}
    onPress={() => alert('You are Pressed Cancel!')}>
    <Text style={styles.TOtext}>Cancel</Text>

  </TouchableOpacity> */}
</View>
  
         


</View>

</ScrollView>
    
  );
}

const styles = StyleSheet.create({
    one:{
        flex:1,
          },
  contains:{
   backgroundColor:'#f2eece',
   marginVertical:65,
  //  borderWidth:2,
   borderRadius:10,
   marginHorizontal:10,
   width:'auto',
   padding:15

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
  paddingVertical:0,
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
}
});
