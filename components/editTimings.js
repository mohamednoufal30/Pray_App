import { TouchableOpacity,Text, SafeAreaView, StyleSheet,View,TextInput,Button,ScrollView,TouchableWithoutFeedback,Platform,Keyboard } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native'; 
import React,{useEffect,useState} from 'react';
// You can import supported modules from npm
// import { Card } from 'react-native-paper';
import Clock from '../components/clock';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { set } from 'mongoose';
//import axios from 'axios';
import { Alert } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import axios,{ip} from './axiosConfig';




export default function Timings() {
  const[ isDatePickerVisible,setDatePickerVisible]=useState(false);
  const[sampletime,setsampletime]=useState('');
  console.log(sampletime);

  const showTimePicker=()=>{
    setDatePickerVisible(true);
  }

  const hideTimePicker=()=>{
    setDatePickerVisible(false);
  }

  const handleConfirm=(sampletime)=>{
    console.log(sampletime);
    hideTimePicker();
  }


    const [currentDate, setCurrentDate] = useState('');
    const[currentTime,setCurrentTime]=useState('');
    

    useEffect(() => {
      var date = new Date().toDateString().toString();
      var month = new Date().getMonth();
      var year = new Date().getFullYear(); //Current Date
      var hours=new Date().getHours('hh');
      var minutes=new Date().getMinutes('mm');
      var seconds=new Date().getSeconds('ss');
      const name= AsyncStorage.getItem('Name');
     
      setCurrentDate(
        date
        
      );
      setCurrentTime(hours+'-'+minutes+'-'+seconds)
    }, []);



    const [mosqueName, setmosqueName] = useState('');
    const [location, setlocation] = useState('');
    const [fajrTime, setfajrTime] = useState('');
    const [zuhrTime, setzuhrTime] = useState('');
    const [asrTime, setasrTime] = useState('');
    const [magribTime, setmagribTime] = useState('');
    const [ishaTime, setishaTime] = useState('');
    const [jummaTime, setjummahTime] = useState('');
    const [fajrIkaamat, setfajr] = useState('');
    const [zuhrIkaamat, setzuhr] = useState('');
    const [asrIkaamat, setasr] = useState('');
    const [magribIkaamat, setmagrib] = useState('');
    const [ishaIkaamat, setisha] = useState('');
    const [jummahikaamat, setjummah] = useState('');
    const [email, setEmail] = useState('');





const navigation=useNavigation();
    const handleSubmit=async()=>{
     
  
     const email=await AsyncStorage.getItem('email');
     const userType=await AsyncStorage.getItem('userType');
     setEmail(email);
     setEmail(userType);
     console.log(userType);
     console.log(email);

     console.log( mosqueName+location+fajrTime+fajrIkaamat+zuhrTime+zuhrIkaamat+asrTime+asrIkaamat+magribTime+magribIkaamat+
      ishaTime+ishaIkaamat+jummaTime+jummahikaamat+email+userType); 

     const mosqueData={
       mosqueName,location,email,userType,fajrTime,fajrIkaamat,zuhrTime,zuhrIkaamat,asrTime,asrIkaamat,magribTime,magribIkaamat,
       ishaTime,ishaIkaamat,jummaTime,jummahikaamat
      };
      axios.post('http://'+ip+':5000/mosqueRegister',mosqueData,email,userType)
    .then(res=>{
      console.log(res.data);
    if(res.data.status=="ok"){
      Alert.alert("Registered Successfully");
      navigation.navigate('home');
    }else{
      Alert.alert("Registered failed");
    }

    })
    }

  return (



    <ScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.contains}>
     
<Text style={styles.userRegis}> PRAYER TIMINGS</Text>
<Text style={styles.textStyle}> {currentDate}</Text>
<Clock/>

<View style={styles.container}>
    <Text style={styles.Text}>   MOSQUENAME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER MOSQUENAME" onChangeText={mosqueName => setmosqueName(mosqueName)}
        defaultValue={mosqueName} />

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}>   MOSQUE-LOCATION :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER MOSQUE-LOCATION" onChangeText={location => setlocation(location)}
        defaultValue={location} />

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> FAJR-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER FAJR-TIME" onChangeText={fajrTime => setfajrTime(fajrTime)}
        defaultValue={fajrTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> FAJR IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER FAJR-IKAAMAT" onChangeText={fajrIkaamat => setfajr(fajrIkaamat)}
        defaultValue={fajrIkaamat}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ZUHR-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ZUHR-TIME" onChangeText={zuhrTime => setzuhrTime(zuhrTime)}
        defaultValue={zuhrTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ZUHR-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ZUHR-IKAAMAT" onChangeText={zuhrIkaamat => setzuhr(zuhrIkaamat)}
        defaultValue={zuhrIkaamat}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ASR-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ASR-TIME" onChangeText={asrTime => setasrTime(asrTime)}
        defaultValue={asrTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}>ASR-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ASR-IKAAMAT" onChangeText={asrIkaamat => setasr(asrIkaamat)}
        defaultValue={asrIkaamat}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> MAGRIB-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER MAGRIB-TIME" onChangeText={magribTime => setmagribTime(magribTime)}
        defaultValue={magribTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> MARGIB-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER MAGRIB-IKAAMAT" onChangeText={magribIkaamat => setmagrib(magribIkaamat)}
        defaultValue={magribIkaamat}/>

    </View>


    <View style={styles.container}>
    <Text style={styles.Text}> ISHA-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ISHA-TIME" onChangeText={ishaTime => setishaTime(ishaTime)}
        defaultValue={ishaTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ISHA-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ISHA-IKAAMAT" onChangeText={ishaIkaamat => setisha(ishaIkaamat)}
        defaultValue={ishaIkaamat}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> JUMMA-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER JUMMA-TIME" onChangeText={jummaTime => setjummahTime(jummaTime)}
        defaultValue={jummaTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> JUMMA-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER JUMMA-IKAAMAT" onChangeText={jummahikaamat => setjummah(jummahikaamat)}
        defaultValue={jummahikaamat}/>

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

{/* <View style={styles.container}>
    <Text style={styles.Text}> JUMMA-IKAAMAT :
    </Text>
     <TextInput style={styles.textInput}  placeholder="ENTER JUMMA-IKAAMAT" onChangeText={sampletime => setsampletime(sampletime)}
        defaultValue={sampletime} onFocus={showTimePicker} />  
 
      <DateTimePicker isVisible={isDatePickerVisible}  onFocus={showTimePicker}  mode="time" onConfirm={handleConfirm} onCancel={hideTimePicker} 
      timeZoneOffsetInMinutes={0} locale="en_GB"/>
    


    </View> */}
  
        

</ScrollView>
    
  );
}

const styles = StyleSheet.create({
    
  contains:{
   backgroundColor:'yellow',
   marginVertical:10,
   borderColor:'black',
   height:'auto',
   marginHorizontal:10,
   padding:10,
   paddingVertical:15,
   marginVertical:20
   

  },
  container: {
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor: '#ecf0f1',
    padding:10,
    borderRadius:10,
    fontWeight:'bold',
    marginVertical:20 ,
    
  },
  userRegis:{
    textAlign:'center',
    fontSize:30

  },
  textInput:{
    
    width:200,
    marginLeft:10,
    textAlign:'center',
    borderRadius:5,
    

  },
  button:{
  flexDirection:'row',
  margin:10,
  paddingBottom:10,
  justifyContent:'space-evenly',
  borderRadius:8,
  marginVertical:10
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
  fontSize:15

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
