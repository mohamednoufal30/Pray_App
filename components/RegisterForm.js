import { TouchableOpacity,Text, SafeAreaView,ScrollView, StyleSheet,View,TextInput,Button,KeyboardAvoidingView,Dimensions,TouchableWithoutFeedback,Platform,Keyboard, Alert } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native'; 
import React,{useEffect,useState} from 'react';

// You can import supported modules from npm
import { Card ,RadioButton} from 'react-native-paper';
import Clock from '../components/clock';
//import axios from 'axios';
import axios,{ip} from './axiosConfig';

const width=Dimensions.get('window').width;
const height=  Dimensions.get('window').height;



export default function RegisterForm() {
  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');

  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[phone,setPhone]=useState('');
  const [userType, setUserType] = useState(''); 
  const[secretText,setSecretText]=useState('');

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
  const handleSubmit=()=>{
    console.log(name+' '+email+' '+phone+' '+password+' '+userType);
    
    if(userType=='MAdmin' && secretText!='MAdmin'){
      Alert.alert("invalid MAdmin");
      navigation.replace('Loginform');
     }
    //else if(userType=='ADMIN' && secretText!='Admin'){
    //  Alert.alert('invalid admin');
    //  navigation.replace('Loginform');
    // }
    else{

   const usersData={
      name,email,phone,password,userType
    };

 
    axios.post('http://'+ip+':5000/usersRegister',usersData)
    .then(res=>{
      console.log(res.data)
    if(res.data.status=="ok"){
      Alert.alert("Registered Successfully");
      navigation.navigate('Loginform');
    }else{
      Alert.alert("Registered failed");
    }

    })
.catch(e=>console.log(e)); 
  }}


  
  return (

    <ScrollView>
      <View style={styles.contains}>
<Text style={styles.userRegis}> USER REGISTRATION</Text>
<Text style={styles.textStyle}>  {currentDate} </Text>
<Clock/>

<View style={styles.RadioButtons}>
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
    {userType.length<1 && <Text style={{color:'red',fontSize:18,paddingHorizontal:30}}>  Select UserType</Text>}
    
   
</View>  
{userType=='MAdmin' ? (
  
<View style={styles.container}>
    <Text style={styles.Text}> Secret Text :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter SecretText" onChangeText={secretText => setSecretText(secretText)}
        defaultValue={secretText}/>

    </View>
):(
''
)}
    <View style={styles.container}>
    <Text style={styles.Text}> UserName :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter UserName" onChangeText={name => setName(name)}
        defaultValue={name}/>

    </View>
    {name.length<1 && <Text style={{color:'red',fontSize:17,paddingHorizontal:30}}>  Enter your name </Text>}
    


    <View style={styles.container}>
    <Text style={styles.Text}> Email :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter Email" required={true} onChangeText={email => setEmail(email)}
        defaultValue={email}/>

    </View>
    {email.length<1 && <Text style={{color:'red',fontSize:17,paddingHorizontal:30}}>  Enter your email </Text>}

    <View style={styles.container}>
    <Text style={styles.Text}> PhoneNo :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter PhoneNo" onChangeText={phone => setPhone(phone)}
        defaultValue={phone}/>

    </View>
    {phone.length<1 && <Text style={{color:'red',fontSize:17,paddingHorizontal:30}}>  Enter your phoneno </Text>}

    

    <View style={styles.container}>
    <Text style={styles.Text}> Password:
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter Password" secureTextEntry={true} onChangeText={password => setPassword(password)}
        defaultValue={password} length='10'/>
</View>
{password.length<1 && <Text style={{color:'red',fontSize:17,paddingHorizontal:30}}>  Enter your password </Text>}


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
 <TouchableOpacity style={styles.TO2}
    onPress={() => alert('You are Pressed Cancel!')}>
    <Text style={styles.TOtext}>Cancel</Text>

  </TouchableOpacity>
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
   backgroundColor:'yellow',
   marginVertical:70,
   borderWidth:2,
   borderRadius:10,
   marginHorizontal:10,
   width:'auto',
   padding:10

  },
  container: {
    height:60,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#ecf0f1',
    padding:10,
    borderRadius:10,
    fontWeight:'bold',
    marginVertical:20 
  },
  userRegis:{
    textAlign:'center',
    fontSize:30

  },
  textInput:{
    
    width:200,
    marginLeft:20,
    textAlign:'left',
    alignItems:'center',

  },
  button:{
  flexDirection:'row',
  margin:10,
  paddingBottom:10,
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
  paddingVertical:10,
  textAlign: 'center',
  fontSize: 18,
  color: 'black',
  fontWeight:'bold'
},
RadioButtons:{
flexDirection:'column',
 paddingVertical:10,
 justifyContent:'space-evenly'

 
}
});
