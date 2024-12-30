import { TouchableOpacity,Text, SafeAreaView, StyleSheet,View,TextInput,Button,ScrollView,TouchableWithoutFeedback,Platform,Keyboard, Alert } from 'react-native';
import { Link } from '@react-navigation/native'; 
import React,{useEffect,useState} from 'react';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import Clock from '../components/clock';
//import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios,{apiLink, ip} from './axiosConfig';


export default function EditTimings({route}) {

  const navigation = useNavigation();
  const {timings}=route.params;
    const [currentDate, setCurrentDate] = useState('');
    const[currentTime,setCurrentTime]=useState('');
    const[data,setData]=useState({});
    const [Timings, setTimings] = useState([]);

    const [id, setid] = useState(timings._id);
    const[mosquename,setMosquename]=useState(timings.mosqueName);
    const [email, setEmail] = useState(timings.Email);
   
    const [fajrSalah, setfajrTime] = useState(timings.fajrSalah);
    const [zuhrSalah, setzuhrTime] = useState(timings.zuhrSalah);
    const [asrSalah, setasrTime] = useState(timings.asrSalah);
    const [maghribSalah, setmagribTime] = useState(timings.maghribSalah);
    const [ishaSalah, setishaTime] = useState(timings.ishaSalah);
    const [jummahSalah, setjummahTime] = useState(timings.jummahSalah);
    const [fajrIkaamat, setfajr] = useState(timings.fajrIkaamat);
    const [zuhrIkaamat, setzuhr] = useState(timings.zuhrIkaamat);
    const [asrIkaamat, setasr] = useState(timings.asrIkaamat);
    const [maghribIkaamat, setmagrib] = useState(timings.maghribIkaamat);
    const [ishaIkaamat, setisha] = useState(timings.ishaIkaamat);
    const [jummahikaamat, setjummah] = useState(timings.jummahikaamat);
    


   async function getData(){
      console.log(mosquename);
      console.log(id);
    } 

   
  
    useEffect(() => {
      
      var date = new Date().toDateString().toString();
      var month = new Date().getMonth();
      var year = new Date().getFullYear(); //Current Date
      var hours=new Date().getHours('hh');
      var minutes=new Date().getMinutes('mm');
      var seconds=new Date().getSeconds('ss');
      setCurrentDate(date);
      setCurrentTime(hours+'-'+minutes+'-'+seconds);
  
     
   getData();
   

  /*  axios.get('http://192.168.109.83:5000/Mosques')
      .then(response => {
        setData(response.data);
        console.log(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });   */
 
    
    }, []);

    const handleUpdate=async(id)=>{
      
     // navigation.navigate('home');
     
      console.log(id);
     //  console.log(fajrSalah,zuhrSalah,asrSalah,maghribSalah,ishaSalah,jummahSalah,fajrIkaamat,zuhrIkaamat,asrIkaamat,maghribIkaamat,ishaIkaamat,jummahikaamat); 

   const updatedData={ fajrSalah,zuhrSalah,asrSalah,maghribSalah,ishaSalah,jummahSalah,fajrIkaamat,zuhrIkaamat,asrIkaamat,maghribIkaamat,ishaIkaamat,jummahikaamat }; 
   //console.log(updatedData);
       try{
     const response=await axios.put(apiLink+`/Mosques/${id}`,{updatedData});
     if(response.status===200){
       navigation.navigate('home');
       Alert.alert("Data updated");
       //console.log(response.data);

     
     }else{
     Alert.alert("Failed to update data");
     }
    }
  catch(error){
  console.log(error);
  }
      
     
   
    }


  return (
    <ScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.contains}>
     
<Text style={styles.userRegis}> PRAYER TIMINGS</Text>
<Text style={styles.textStyle}> {currentDate}</Text>
<Clock/>



    <View style={styles.container}>
    <Text style={styles.Text}> FAJR-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER FAJR-TIME" value={fajrSalah} onChangeText={setfajrTime}/>
    
    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> FAJR IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER FAJR-IKAAMAT" value={fajrIkaamat} onChangeText={setfajr}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ZUHR-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ZUHR-TIME" value={zuhrSalah} onChangeText={setzuhrTime} />

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ZUHR-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ZUHR-IKAAMAT" value={zuhrIkaamat} onChangeText={setzuhr}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ASR-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ASR-TIME" value={asrSalah} onChangeText={setasrTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}>ASR-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ASR-IKAAMAT" value={asrIkaamat} onChangeText={setasr}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> MAGRIB-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER MAGRIB-TIME" value={maghribSalah} onChangeText={setmagribTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> MAGRIB-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER MAGRIB-IKAAMAT" value={maghribIkaamat} onChangeText={setmagrib}/>

    </View>


    <View style={styles.container}>
    <Text style={styles.Text}> ISHA-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ISHA-TIME" value={ishaSalah} onChangeText={setishaTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> ISHA-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER ISHA-IKAAMAT" value={ishaIkaamat} onChangeText={setisha}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> JUMMA-TIME :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER JUMMA-TIME" value={jummahSalah} onChangeText={setjummahTime}/>

    </View>

    <View style={styles.container}>
    <Text style={styles.Text}> JUMMA-IKAAMAT :
    </Text>
    <TextInput style={styles.textInput} placeholder="ENTER JUMMA-IKAAMAT" value={jummahikaamat} onChangeText={setjummah}/>

    </View>


   


<View style={styles.button}>
 <TouchableOpacity style={styles.TO1}
    onPress={()=>handleUpdate(id)}>
    <Text style={styles.TOtext}>Submit</Text>

  </TouchableOpacity>
 <TouchableOpacity style={styles.TO2}
    onPress={() => alert('You are Pressed Cancel!')}>
    <Text style={styles.TOtext}>Cancel</Text>

  </TouchableOpacity>
</View>
  
        

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
    height:60,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor: '#ecf0f1',
    padding:10,
    borderRadius:10,
    fontWeight:'bold',
    marginVertical:20 ,
    alignItems:'center'
    
  },
  userRegis:{
    textAlign:'center',
    fontSize:30

  },
  textInput:{
    height:50,
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
  fontSize:15,

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
