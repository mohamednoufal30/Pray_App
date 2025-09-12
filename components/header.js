import {Image,View,Text, SafeAreaView, StyleSheet ,TouchableOpacity,Dimensions} from 'react-native';
import React,{useEffect,useState} from 'react';
import Clock from '../components/clock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ip,apiLink } from './axiosConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { FlipInEasyX } from 'react-native-reanimated';




export default function Header({imageUrl}) {

  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');
  const[loading,setLoading]=useState(true);

  
  // console.log('Image URL:', imageUrl);
  

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

<View style={styles.headerRow}>

  <Animatable.Image style={styles.img} source={require('../assets/muhammed.jpg')} animation="slideInLeft" />
  <Animatable.Text style={styles.text1} animation="zoomIn" duration={500}>தொழுகை நேரங்கள்</Animatable.Text>
  <Animatable.Image style={styles.img} source={require('../assets/allah.jpg')} animation="slideInRight" />
</View>

    {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5}}>
         <Text style={styles.textStyle}>{currentDate}  /</Text>
     
      <Clock/>
      </View> */}

<View style={styles.headings}>
 
    {/* {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )} */}

       {imageUrl ? (
        <Animatable.Image
          animation="zoomIn"
          duration={500}
          style={styles.img1}
          source={{ uri: imageUrl }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      ) : (
        <View>
          <Image
            source={{ uri: 'https://via.placeholder.com/300x200?text=No+Image' }}
            style={styles.img1}
          />
        </View>
      )}

</View>
</View>
  );
}

const styles = StyleSheet.create({
  headings:{
    alignItems:'center',
    paddingHorizontal:5

  },
 
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp('10%'), // Adjust height as needed
    // marginVertical: hp('1%'),
    
    // height: 'auto',
  },
  img: {
    width: wp('12%'),
    height: wp('12%'),
    resizeMode: 'contain',
    borderRadius: 10,
  },
  text1: {
    fontSize: wp('4.4%'), // Adjust as needed
    fontWeight: 'bold',
    color: '#000',
    height: hp('4.2%'),
    textAlign: 'center',
  },
    img1:{
    
      width: Dimensions.get('screen').width*0.90,  // 90% of screen width
      height: Dimensions.get('screen').height * 0.30, // Maintain aspect ratio (adjust as needed)
      resizeMode: 'cover',       // or 'contain' depending on your need
      borderRadius: 5,
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
    },
    loadingIndicator: {
    position: 'absolute',
    zIndex: 1,
  }


});