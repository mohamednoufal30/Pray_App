import { TouchableOpacity,Text, SafeAreaView, StyleSheet,View,Alert,TextInput,Button,KeyboardAvoidingView,TouchableWithoutFeedback,Platform,Keyboard } from 'react-native';
// import { Link } from '@react-navigation/native'; 
import React,{useEffect,useState} from 'react';
// You can import supported modules from npm
// import { Card } from 'react-native-paper';
import Clock from '../components/clock';
//import axios from 'axios';
import axios,{apiLink, ip} from './axiosConfig';



export default function AdminsForm() {
  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');

  const[adminName,setName]=useState('');
  const[adminEmail,setEmail]=useState('');
  const[adminMosque,setAdminMosque]=useState('');
  const[adminPassword,setPassword]=useState('');
  const[adminPhone,setPhone]=useState('');

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


  const handleSubmit=()=>{
    console.log(adminName+' '+adminMosque+' '+adminEmail+' '+adminPhone+' '+adminPassword);

     const adminData={
      adminName,adminMosque,adminEmail,adminPhone,adminPassword
    };
    axios.post(apiLink+'/adminRegister',adminData)
    .then(res=>{
      console.log(res.data)
    if(res.data.status=="ok"){
      Alert.alert("Registration Success");  
    }
    else if(res.data.status=="error"){
      Alert.alert("User Already Exists");
    }else{
      Alert.alert("Registration Failed");
    }
    })
.catch(e=>console.log(e)); 
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.contains}>
     
<Text style={styles.userRegis}> ADMIN REGISTRATION</Text>
<Text style={styles.textStyle}>  {currentDate} </Text>
<Clock/>
    <View style={styles.container}>
    <Text style={styles.Text}> UserName :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter UserName" onChangeText={adminName => setName(adminName)}
        defaultValue={adminName} />

    </View>
    <View style={styles.container}>
    <Text style={styles.Text}> MosqueName :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter MosqueName" onChangeText={adminMosque => setAdminMosque(adminMosque)}
        defaultValue={adminMosque}/>

    </View>


    <View style={styles.container}>
    <Text style={styles.Text}> Email :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter Email" onChangeText={adminEmail => setEmail(adminEmail)}
        defaultValue={adminEmail}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> PhoneNo :
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter PhoneNo"  onChangeText={adminPhone => setPhone(adminPhone)}
        defaultValue={adminPhone}/>

    </View>

    

    <View style={styles.container}>
    <Text style={styles.Text}> Password:
    </Text>
    <TextInput style={styles.textInput} placeholder="Enter Password" secureTextEntry={true} onChangeText={adminPassword => setPassword(adminPassword)}
        defaultValue={adminPassword} />
</View>


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
  
         




</KeyboardAvoidingView>
    
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
   padding:10

  },
  container: {
    height:50,
    flexDirection:'row',
    justifyContent:'center',
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
    marginLeft:10,
    textAlign:'center',
    borderRadius:5

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
}
 
});
