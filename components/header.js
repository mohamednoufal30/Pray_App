import {Image,View,Text, SafeAreaView, StyleSheet ,TouchableOpacity,Dimensions} from 'react-native';
import React,{useEffect,useState} from 'react';
import Clock from '../components/clock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ip,apiLink } from './axiosConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default function Header({imageUrl}) {

  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');
  const[loading,setLoading]=useState(true);

  
  
  

  useEffect(() => {
    var date = new Date().toDateString().toString();
    var month = new Date().getMonth();
    var year = new Date().getFullYear(); //Current Date
    var hours=new Date().getHours('hh');
    var minutes=new Date().getMinutes('mm');
    var seconds=new Date().getSeconds('ss');
    setCurrentDate(
      date,
      
      
    );
    setCurrentTime(hours+'-'+minutes+'-'+seconds);
   
  }, []);
  
  return (

    <View>
      
{/* <View style={{flexDirection:'row',justifyContent:'space-evenly',textAlign:'center',marginVertical:7}}>
   
      <Image style={styles.img} source={require('../assets/allah.jpg')}/>
      
     
      <Text style={styles.text1}>தொழுகை நேரங்கள் </Text>

       <Image style={styles.img} source={require('../assets/muhammed.jpg')}
/>


</View> */}
<View style={styles.headerRow}>
  <Image style={styles.img} source={require('../assets/allah.jpg')} />
  <Text style={styles.text1}>தொழுகை நேரங்கள்</Text>
  <Image style={styles.img} source={require('../assets/muhammed.jpg')} />
</View>

    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5}}>
         <Text style={styles.textStyle}>{currentDate}  /</Text>
     
      <Clock/>
      </View>

<View style={styles.headings}>
  {/* {imageUrl */}
      <Image style={styles.img1}  source={{ uri: apiLink+`/uploads/${imageUrl}` }} />
      
      
  {/* } */}
</View>
</View>
  );
}

const styles = StyleSheet.create({
  headings:{
    alignItems:'center',
    paddingHorizontal:5

  },
  // text1:{
  //   paddingTop:10,
  //   height:50,
  //   paddingBottom:10,
  //   paddingLeft:10,
  //   paddingRight:10,
  //   borderRadius:10,
  //   textAlign:'center',
  //   alignItems:'center',
  //   alignSelf:'center',
  //   backgroundColor:'#ecf0f1',
  //   fontSize:18,
  //   fontWeight:'bold'
 
  //   },
  //   img:{
  //     height:60,
  //     width:60,
  //     padding:10,
  //     borderRadius:10
      
  //   },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: hp('1%'),
    // paddingHorizontal: wp('1%'),
    height: 'auto',
  },
  img: {
    width: wp('12%'),
    height: wp('12%'),
    resizeMode: 'contain',
    borderRadius: 10,
  },
  text1: {
    fontSize: wp('4.7%'), // Adjust as needed
    fontWeight: 'bold',
    color: '#000',
    height: hp('3.5%'),
    textAlign: 'center',
  },
    // img1:{
    
    //   width: Dimensions.get('screen').width*0.99,  // 90% of screen width
    //   height: Dimensions.get('screen').height * 0.36, // Maintain aspect ratio (adjust as needed)
    //   resizeMode: 'cover',       // or 'contain' depending on your need
    //   borderRadius: 5,
    //   alignSelf: 'center',
      
      
    // },
      img1: {
    width: wp('99%'),            // 99% of screen width
    height: hp('36%'),           // 36% of screen height
    resizeMode: 'cover',         // Adjust based on need
    borderRadius: wp('2%'),      // Scales better than fixed pixels
    alignSelf: 'center',
  },
    textStyle: {
      paddingVertical:6,
      textAlign: 'center',
      fontSize: 18,
      width:'50%',
      textTransform: 'uppercase',
      color: 'black',
      fontWeight:'bold'
    }



});