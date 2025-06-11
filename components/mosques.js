import React,{useEffect,useState} from "react";
import {FlatList,View,Text,StyleSheet,ScrollView,SafeAreaView} from 'react-native';
import axios from "axios";
import {apiLink, ip} from './axiosConfig';
import { ActivityIndicator } from "react-native-paper";


 
 const Item = ({title}) => (

   <View style={styles.item}>
   <Text style={styles.title}>{title}</Text>
     
    </View>
  
 );

export default function Mosques(){
  const [data, setData] = useState([{}]);
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    // axios.get('http://'+ip+':5000/Mosques')
    axios.get(apiLink+`/Mosques`)
      .then(response => {
        setData(response.data);
        // console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        // console.error('Error fetching data: ', error);
      });
  }, []);


  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {/* MosqueName:  */}
        {item.mosqueName}</Text>
      
      
    </View>
  );
  
    return(

      <View style={styles.container}>
      <View>
        <Text style={styles.h1}>Mosques</Text>
        </View>
        {data.length === 0 ? (  <View><Text>No Mosques Found</Text></View>) : loading ?
         (
 <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={20} color="#0000ff" />
      <Text >Loading...</Text>
    </View>
) : (
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item._id}
      
      />)}
    
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
    item: {
      backgroundColor: '#ccffcc',
      padding: 20,
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