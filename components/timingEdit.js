import { TouchableOpacity,Text, SafeAreaView, StyleSheet,View,Button,ScrollView,TouchableWithoutFeedback,PermissionsAndroid,Platform,Keyboard, Alert, Image } from 'react-native';
import { Link } from '@react-navigation/native'; 
import React,{useEffect,useState} from 'react';
import { TextInput } from 'react-native-paper';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import Clock from '../components/clock';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiLink, ip} from './axiosConfig';
import { launchImageLibrary } from 'react-native-image-picker';

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
    const [userPhone, setUserPhone] = useState(AsyncStorage.getItem('phone'));
    const [userType, setUserType] = useState(timings.userType);
   
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
    
  const [selectedImage, setSelectedImage] = useState(timings.image);


// colon after two digit
 const formatTime = (text) => {
  const cleaned = text.replace(/[^0-9]/g, '');

  if (cleaned.length >= 3) {
    return cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
  }

  return cleaned;
};

   async function getData(){
      console.log(mosquename);
      console.log(id);
      console.log(userPhone._j);
      
   
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
     
      console.log("this is ",id);
   
       try{
        const updatedData={ fajrSalah,zuhrSalah,asrSalah,maghribSalah,ishaSalah,jummahSalah,fajrIkaamat,zuhrIkaamat,asrIkaamat,maghribIkaamat,ishaIkaamat,jummahikaamat}; 
   
    //   const formData = new FormData();

    // formData.append('id', id);
  
    // // Timings
    // formData.append('fajrSalah', fajrSalah);
    // formData.append('zuhrSalah', zuhrSalah);
    // formData.append('asrSalah', asrSalah);
    // formData.append('maghribSalah', maghribSalah);
    // formData.append('ishaSalah', ishaSalah);
    // formData.append('jummahSalah', jummahSalah);
    // formData.append('fajrIkaamat', fajrIkaamat);
    // formData.append('zuhrIkaamat', zuhrIkaamat);
    // formData.append('asrIkaamat', asrIkaamat);
    // formData.append('maghribIkaamat', maghribIkaamat);
    // formData.append('ishaIkaamat', ishaIkaamat);
    // formData.append('jummahikaamat', jummahikaamat);

    // // Only append image if a new one is picked
    // if (selectedImage) {
    //   formData.append('image', {
    //     uri: selectedImage.uri,
    //     name: selectedImage.fileName || 'mosque.jpg',
    //     type: selectedImage.type || 'image/jpeg',
    //   });
    // }
// console.log("this is updated data",updatedData);

   const userPhone=await AsyncStorage.getItem('phone');
     const mosqueData={
      id,
      mosquename,
     userPhone,
     
      
      }
 const response2 = await axios.put(`${apiLink}/updateMosque/${id}`,{ updatedData, mosqueData}
  // {
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },}
  );

 console.log("this is mosquedata",mosqueData);
     if(response2.status===200){
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

 
const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your media to upload images',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS handles it through Info.plist
};


  const handleImagePick =async () => {
    const permissionGranted = await requestPermission();
  if (!permissionGranted) {
    Alert.alert("Permission denied", "Cannot access media library.");
    return;
  }

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setSelectedImage({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName,
        });
      }
    });
  };

const prayerInputs = [
  { label: 'FAJR-ADHAAN', value: fajrSalah, onChange: setfajrTime },
  { label: 'FAJR-IKAAMAT', value: fajrIkaamat, onChange: setfajr },
  { label: 'ZUHR-ADHAAN', value: zuhrSalah, onChange: setzuhrTime },
  { label: 'ZUHR-IKAAMAT', value: zuhrIkaamat, onChange: setzuhr },
  { label: 'ASR-ADHAAN', value: asrSalah, onChange: setasrTime },
  { label: 'ASR-IKAAMAT', value: asrIkaamat, onChange: setasr },
  { label: 'MAGRIB-ADHAAN', value: maghribSalah, onChange: setmagribTime },
  { label: 'MAGRIB-IKAAMAT', value: maghribIkaamat, onChange: setmagrib },
  { label: 'ISHA-ADHAAN', value: ishaSalah, onChange: setishaTime },
  { label: 'ISHA-IKAAMAT', value: ishaIkaamat, onChange: setisha },
  { label: 'JUMMA-ADHAAN', value: jummahSalah, onChange: setjummahTime },
  { label: 'JUMMA-IKAAMAT', value: jummahikaamat, onChange: setjummah }
];



  return (
    <ScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.contains}>
     
<Text style={styles.userRegis}> PRAYER TIMINGS</Text>
<Text style={styles.textStyle}> {currentDate}</Text>
<Clock/>



    {/* <View style={styles.container}>

    <TextInput style={styles.textInput} maxLength={5} label=" FAJR-ADHAAN" mode='outlined' value={fajrSalah} onChangeText={setfajrTime}/>
    
    </View>

    <View style={styles.container}>

    <TextInput style={styles.textInput} maxLength={5} label=" FAJR-IKAAMAT" mode='outlined' value={fajrIkaamat} onChangeText={setfajr}/>

    </View>

    <View style={styles.container}>
  
    <TextInput style={styles.textInput} maxLength={5} label=" ZUHR-ADHAAN" mode='outlined' value={zuhrSalah} onChangeText={setzuhrTime} />

    </View>

    <View style={styles.container}>
 
    <TextInput style={styles.textInput} maxLength={5} label=" ZUHR-IKAAMAT" mode='outlined' value={zuhrIkaamat} onChangeText={setzuhr}/>

    </View>

    <View style={styles.container}>
  
    <TextInput style={styles.textInput} maxLength={5} label=" ASR-ADHAAN" mode='outlined' value={asrSalah} onChangeText={setasrTime}/>

    </View>

    <View style={styles.container}>

    <TextInput style={styles.textInput} maxLength={5} label=" ASR-IKAAMAT" mode='outlined' value={asrIkaamat} onChangeText={setasr}/>

    </View>

    <View style={styles.container}>

    <TextInput style={styles.textInput} maxLength={5} label=" MAGRIB-ADHAAN" mode='outlined' value={maghribSalah} onChangeText={setmagribTime}/>

    </View>

    <View style={styles.container}>
   
    <TextInput style={styles.textInput} maxLength={5} label=" MAGRIB-IKAAMAT" mode='outlined' value={maghribIkaamat} onChangeText={setmagrib}/>

    </View>


    <View style={styles.container}>
   
    <TextInput style={styles.textInput} maxLength={5} label=" ISHA-ADHAAN" mode='outlined' value={ishaSalah} onChangeText={setishaTime}/>

    </View>

    <View style={styles.container}>
   
    <TextInput style={styles.textInput} maxLength={5} label=" ISHA-IKAAMAT" mode='outlined' value={ishaIkaamat} onChangeText={setisha}/>

    </View>

    <View style={styles.container}>
   
    <TextInput style={styles.textInput} label=" JUMMA-ADHAAN" mode='outlined' value={jummahSalah} onChangeText={setjummahTime}/>

    </View>

    <View style={styles.container}>
    
    <TextInput style={styles.textInput} maxLength={5} label=" JUMMA-IKAAMAT" mode='outlined' value={jummahikaamat} onChangeText={setjummah}/>

    </View>  */}

{prayerInputs.map((input, index) => (
      <View style={styles.container} key={index}>
    <TextInput
      style={styles.textInput}
      maxLength={5}
      label={input.label}
      mode="outlined"
      value={input.value}
      keyboardType="numeric"
      onChangeText={(text) => input.onChange(formatTime(text))}
    />
  </View>
    ))}



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
   backgroundColor:'#f2eece',
   borderColor:'black',
   height:'auto',
   marginHorizontal:15,
   padding:10,
   paddingVertical:0,
   marginVertical:40
   

  },
  container: {
    height:60,
    flexDirection:'row',
    justifyContent:'center',
    // backgroundColor: '#ecf0f1',
    padding:5,
    borderRadius:10,
    fontWeight:'bold',
    marginVertical:13 ,
    alignItems:'center'
    
  },
  userRegis:{
    textAlign:'center',
    fontSize:30

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
  margin:10,
  paddingBottom:10,
  justifyContent:'space-evenly',
  borderRadius:8,
  marginVertical:10
},
TO1:{
  borderRadius:5,
  padding:8,
  textAlign:'center',
  alignSelf:'center',
  backgroundColor:'green'

},
TO2:{
  borderRadius:5,
  borderColor:'black',
  backgroundColor:'red',
  alignSelf:'center',
  padding:8

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
  },
   containerButton: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
   TOtextButton: {
    color: 'white',
    fontSize: 18,
  },
  editButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
  },
 
});
