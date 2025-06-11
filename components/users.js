import React, { useTransition,useState,useEffect } from "react";
import {FlatList,View,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
//import axios from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import {apiLink, ip} from './axiosConfig';
import { Checkbox,Button } from "react-native-paper";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator} from "react-native-paper";




export default function Users(){

  const [data, setData] = useState([{}]);
  const[loading,setLoading]=useState(true);
const navigation = useNavigation();
  useEffect(() => {
    axios.get(apiLink+`/Users`)
      .then(response => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const RemoveUser=async(id)=>{
   
    try{
      console.log(id);
      
       const response = await axios.delete(apiLink+`/Users/${id}`);

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

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.put(apiLink+`/Users/${userId}`, { userType: newRole });
      if (response.status === 200) {
        Alert.alert('Success', `User role updated to ${newRole}`);
        // Refresh the user list
        const updatedUsers = await axios.get(apiLink+`/Users`);
        setData(updatedUsers.data);
      } else {
        Alert.alert('Error', 'Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      Alert.alert('Error', 'An error occurred while updating user role');
    }
  };

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>UserName: {item.name}</Text>
     
      <Text style={styles.title}>PhoneNo: {item.phone}</Text>

       {/* <Checkbox.Item
      // label="Admin"
      style={{width: 200}}
      icon="account-check"
      // status={item.userType === 'ADMIN' ? 'checked' : 'unchecked'}
      onPress={() => {
        const newRole = item.userType === 'ADMIN' ? 'USER' : 'ADMIN';
        handleRoleChange(item._id, newRole);
      }}
      position="leading"
      color="#007BFF"
    /> 
     */}
   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
   <TouchableOpacity
  style={{backgroundColor: item.userType === 'ADMIN' ? 'green' : 'blue', padding: 10, borderRadius: 5,width: 120}}
  onPress={() => {handleRoleChange(item._id, item.userType === 'ADMIN' ? 'USER' : 'ADMIN');
    // navigation.navigate('adminList');
  }}
>
  <Text style={{color: 'white', textAlign: 'center'}}>
    {item.userType === 'ADMIN' ? 'Remove Admin' : 'Make Admin'}
  </Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.TO1} onPress={()=>RemoveUser(item._id)}>
      <Text style={styles.TOtext}>Remove</Text>
    
  </TouchableOpacity> 
      </View>
    </View>
  );
    return(

        
<View style={styles.container}>
  <View>
    <Text style={styles.h1}>USERS</Text>
    </View>
    {data.length === 0 ? (
  <View>
    <Text>No Users Found</Text>
  </View>
) : loading ? (
 <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={20} color="#0000ff" />
      <Text >Loading...</Text>
    </View>
) : (
  <FlatList
    data={data}
    renderItem={({ item }) => <Item item={item} />}
    keyExtractor={item => item._id?.toString()}
  />
)}
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