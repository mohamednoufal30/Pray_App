import React,{useEffect,useState} from "react";
import {FlatList,View,Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity, Alert, Button} from 'react-native';
import axios from 'axios';
import {apiLink, ip} from './axiosConfig';
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { set } from "mongoose";
/* const DATA = [
    {
     id: '1',
     title: 'First Item',
     mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
     
   },
   {
     id: '2',
     title: 'Second Item',
     mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
   },
   {
     id: '3',
     title: 'Third Item',
     mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
   },
   {
       id: '4',
       title: 'Fourth Item',
       mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
     },
     {
       id: '5',
       title: 'Fifth Item',
       mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
     },
     {
       id: '6',
       title: 'Six Item',
       mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
      },
     {
       id: '7',
       title: 'Seventh Item',
       mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
     },
     {
         id: '8',
         title: 'Eighth Item',
         mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
       },
       {
         id: '9',
         title: 'Ninth Item',
         mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
       },
       {
         id: '10',
         title: 'Tenth Item',
         mosquename:'mosque1',
     username:'name1',
     email:'admin1@gmail.com',
     phone:'123456789'
       }
 ];
 
 
 const Item = ({title,username,email,phone,mosquename}) => (

   <View style={styles.item}>
 <Text style={styles.title}>{title}</Text>
   <Text>{username}</Text>
   <Text>{email}</Text>
   <Text>{phone}</Text>
   <Text>{mosquename}</Text>
     
    </View>
  
 ); */





export default function Admins(){

  const [data, setData] = useState([]);
  const[loading,setLoading]=useState(true);
  const navigation = useNavigation();

  useEffect(() => {
   fetchItems();
  }, []);

   const fetchItems = async () => {
    // await axios.get('http://'+ip+':5000/Admins')
    await axios.get(apiLink+`/Admins`)
    .then(response => {
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
    };

  const RemoveAdmin=async(id)=>{
   
    try{
      console.log(id);
      
       const response = await axios.delete(apiLink+`/Admins/${id}`);

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

  const RemovePrivilege= (userId) => {
    handleRoleChange(userId, 'USER');
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
      <Text style={styles.title}>AdminName: {item.name}</Text>
      {/* <Text style={styles.title}>Email: {item.email}</Text> */}
      <Text style={styles.title}>Phone: {item.phone}</Text>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity style={styles.TO1} onPress={()=>{RemovePrivilege(item._id);
        // navigation.navigate('userList');
      }}>
     <Text style={styles.TOtext}>Remove admin</Text>
  </TouchableOpacity> 
      <TouchableOpacity style={styles.TO1} onPress={()=>RemoveAdmin(item._id)}>
     <Text style={styles.TOtext}>RemoveData</Text>

  </TouchableOpacity> 
     </View>
    </View>
  );
  


    return(

<SafeAreaView style={styles.container}>


<View>
    <Text style={styles.h1}>ADMINS</Text>
    </View>
    {data.length === 0
      ? (  <View><Text>No Admins Found</Text></View>) :
     loading ? (
     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={20} color="#0000ff" />
          <Text >Loading...</Text>
        </View>
    ) :(
  <FlatList
    data={data}
    renderItem={(item) => <Item item={item.item} />}
    keyExtractor={item => item._id}
  
  />)}

</SafeAreaView>
 
);

} 



const styles=StyleSheet.create({
  container:{
    marginVertical:30,
    marginHorizontal:10,
    
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
  h1:{
  fontSize:28,
  textAlign:'center',
  paddingVertical:5,
  
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