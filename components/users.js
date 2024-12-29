import React, { useTransition,useState,useEffect } from "react";
import {FlatList,View,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
//import axios from "axios";
import { Alert } from "react-native";
import axios,{ip} from './axiosConfig';





export default function Users(){

  const [data, setData] = useState([{}]);

  useEffect(() => {
    axios.get('http://'+ip+':5000/Users')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const RemoveUser=async(id)=>{
   
    try{
      console.log(id);
      
       const response = await axios.delete(`http://`+ip+`:5000/Users/${id}`);

      if(response.status===200){
        Alert.alert('Success', 'Item deleted successfully');
      setData(data.filter(item => item._id !== id));
      }else{
        Alert.alert("unable to delete");
      }
    }catch(error){
     
      console.log(error);
    } 
  
  };

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>UserName: {item.name}</Text>
      <Text style={styles.title}>Email: {item.email}</Text>
      <Text style={styles.title}>PhoneNo: {item.phone}</Text>
      <TouchableOpacity style={styles.TO1} onPress={()=>RemoveUser(item._id)}>
     <Text style={styles.TOtext}>Remove</Text>

  </TouchableOpacity> 
      
    </View>
  );
    return(

        
<View style={styles.container}>
  <View>
    <Text style={styles.h1}>USERS</Text>
    </View>
  <FlatList
    data={data}
    renderItem={Item}
    keyExtractor={item => item._id}
  
  />

  </View>
        
    );
}



const styles=StyleSheet.create({

  container:{
    marginVertical:30,
    marginHorizontal:10,
    
  },
  h1:{
  fontSize:28,
  textAlign:'center',
  paddingVertical:5,
  
  },
  TO1:{
    borderRadius:5,
    padding:10,
    backgroundColor:'red',
    width:80,
  
  },
  TOtext:{
    color:'white',
    textAlign:'center'
  },
    item: {
      backgroundColor: '#ccffcc',
     paddingHorizontal:20,
     paddingVertical:10,
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius:10,
      borderColor:'#000000',
      borderWidth:2,
      borderRadius:20,
      flexDirection:'column'
     
    },
    
    title:{
      fontSize: 20,
      textAlign:'left',
      paddingVertical:7

    }
    

})