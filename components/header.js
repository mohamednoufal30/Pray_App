import {Image,View,Text, SafeAreaView, StyleSheet ,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import Clock from '../components/clock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




export default function Header() {

  const [currentDate, setCurrentDate] = useState('');
  const[currentTime,setCurrentTime]=useState('');

  
  
  

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
      
<View style={{flexDirection:'row',justifyContent:'space-evenly',textAlign:'center',marginVertical:15}}>
   
      <Image style={styles.img} source={require('../assets/allah.jpg')}/>
      
     
      <Text style={styles.text1}>தொழுகை நேரங்கள் </Text>

       <Image style={styles.img} source={require('../assets/muhammed.jpg')}
/>

</View>

<View style={styles.headings}>
      <Image style={styles.img1}  source={require('../assets/mosque.jpg')}/>
      <Text style={styles.textStyle}>  {currentDate} </Text>
     
      
     

 
      
      <Clock/>
      

</View>
</View>
  );
}

const styles = StyleSheet.create({
  headings:{
    alignItems:'center',
    paddingHorizontal:5
   
    
  },
  text1:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:10,
    textAlign:'center',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#ecf0f1',
    fontSize:18,
    fontWeight:'bold'
    
    
    },
    img:{
      height:75,
      width:75,
      padding:10,
      borderRadius:10
      
    },
    img1:{
      width:400,
      height:300,
      
      
    },
    textStyle: {
      paddingVertical:10,
      textAlign: 'center',
      fontSize: 18,
      color: 'black',
      fontWeight:'bold'
    }



});