import {
    TouchableOpacity, Text, SafeAreaView, FlatList, StyleSheet, View, Alert, ScrollView, Dimensions,
    KeyboardAvoidingView
  } from 'react-native';
  import  axios  from "axios";
  import { useNavigation } from '@react-navigation/native'; 
  import { TextInput,ActivityIndicator,Button, Icon } from 'react-native-paper';
  import React, { useState, useEffect, useRef } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Clock from '../components/clock';
  import { apiLink, ip } from './axiosConfig';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'react-native-linear-gradient';

   const { wid } = Dimensions.get('window');


  export default function Forms() {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const hasLoaded = useRef(false);
    const [pin, setPin] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const[loading,setLoading]=useState(false);
    const [isFocused, setIsFocused] = useState(false);
   const [suggestions, setSuggestions] = useState([]);
 const [isListVisible, setIsListVisible] = useState(false);
    const [filtered, setFiltered] = useState([]);
 



    useEffect(() => {
            

    

    const checkTokenAndLoadData = async () => {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            setLoading(false);
            return;
          }
  
          const res = await axios.get(apiLink+`/protected`, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          if (res.data.valid) {
            const userType = await AsyncStorage.getItem('userType');
            const user = JSON.parse(await AsyncStorage.getItem('User'));
  
            if (userType === 'ADMIN') {
              setLoading(false);
              navigation.replace('home', { user });
            } else if (userType === 'USER') {
              setLoading(false);
              navigation.replace('home', { user });
            }else if (token === '') {
              setLoading(false);
              navigation.replace('Forms');
            } 
            else {
              setLoading(false);
              // navigation.replace('home', { user });
              navigation.replace('masterAdmin', { user });
            }
          } else {
            // await AsyncStorage.clear();
            return;
            
          }
        } catch (err) {
          // console.error('Token expired or invalid:', err);
          await AsyncStorage.clear();
        Alert.alert('Token expired or invalid. Please login again.');
          setLoading(false);
        }
      };
  
      checkTokenAndLoadData();
   
    
    
    }, []);

  
  
    const handleLogout = () => {
      navigation.replace('Forms');
    };
    // export const apiLink = `https://pray-app-backend.onrender.com`;
    const handleSubmit = async () => {


     
      if (!email || !password) {
        Alert.alert("Please fill in both fields");
        return;
      }

      // console.log("Attempting user login...");

      const userData = {
        email,
        password
      };
    
      // console.log(userData, 'userData');
    
      try {
        const res = await axios.post(apiLink+`/login-user`, userData); // FIXED
      
          const { status, user, data } = res.data;
          // console.log(res.data, 'response data');
         
          if (status === 'ok') {
           
         
            await AsyncStorage.setItem('token', data);
            await AsyncStorage.setItem('User', JSON.stringify(user));
            await AsyncStorage.setItem('id', user._id);
            await AsyncStorage.setItem('name', user.name);
            await AsyncStorage.setItem('phone', user.phone);
            await AsyncStorage.setItem('userType', user.userType);
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        
            setToken(token);
         
          
           
     
            if (user.userType === 'ADMIN') {
           
              
              
              navigation.navigate('Vagt', { user });
            } else if (user.userType === 'USER') {
             
              navigation.navigate('home', { user });
            } else {
              
              navigation.navigate('masterAdmin',{user});
            }
        
          } else {
            Alert.alert("User does not exist");
          }
        } 
        catch (error) {
          
  Alert.alert(
    "Login Failed",
    "Please check your PhoneNumber and password, then try again."
  );
  setMessage('Login failed! Invalid credentials.');
        }
     
    };
    
    

    const handleChange = (text, index) => {
      if (/^\d$/.test(text)) {
        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);
        if (index < 3) {
          inputRefs.current[index + 1].focus();
        }
      } else if (text === '') {
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
      }
    };
  
    const handleKeyPress = (e, index) => {
      if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    const combinedPin = pin.join('');



const fetchSuggestions = async (query) => {
  if (query.length < 4) {
    suggestions.data = [];
    // Hide list if query is too short
    return;
  }

  try {
    const res = await axios.get(`${apiLink}/phonehistory?search=${query}`);
    // console.log('Suggestions response:', res.data);
    if (res.data) {
   // Show list if suggestions are available
      setSuggestions(res.data);
      // console.log(suggestions.data)
    }else {
      setSuggestions([]);
    }
  } catch (error) {
    Alert.alert("Error fetching suggestions. Please try again.");
    // console.error('Error fetching suggestions:', error);
  }
};

    const handleChanges = (text) => {
  setEmail(text);
  fetchSuggestions(text);
};



    return (
      loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.textHeader}>Loading...</Text>
    </View>
      ) : (
      <ScrollView>
        <Animatable.View  animation="zoomIn" duration={500} delay={200}>
          <LinearGradient
          colors={['#ff9a9e', '#fad0c4']}
  //  colors={['#ffecd2', '#fcb69f']}
    style={styles.contains}
  >
          <Text style={{ textAlign: 'center', fontSize: RFValue(30),fontFamily:'Nunito-Bold',
            //  fontWeight: 'bold', color: 'black',letterSpacing: 1.5 
             }}>
  LOGIN
</Text>
          {/* <Text style={styles.textStyle}>{currentDate}</Text> */}
          <MaterialCommunityIcons name="account-group" size={50} color="black" style={{alignSelf:'center',paddingBottom:10}} />
          <Clock />
{/* 
         <View style={styles.container}>
  <TextInput
    style={[styles.textInput, { marginBottom: 10 }]}
    label="PhoneNumber"
    mode="outlined"
    outlineColor="black"
    activeOutlineColor="black"
    onChangeText={(text) => handleChanges(text)}
    value={email}
    maxLength={10}
    keyboardType="numeric"
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    left={<TextInput.Icon icon="phone" size={20} />}
  />
  

</View> */}


<View style={styles.container}>
  <TextInput
    style={[styles.textInput, { marginBottom: 10 }]}
    label="PhoneNumber"
    mode="outlined"
    outlineColor="black"
    activeOutlineColor="black"
    onChangeText={handleChanges}
    value={email}
    maxLength={10}
    keyboardType="numeric"
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    left={<TextInput.Icon icon="phone" size={20} />}
  />

 
</View>
 {email.length > 5 && suggestions.data.length > 0 && (
    <ScrollView style={styles.suggestionsList}>
      {suggestions.data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>{ setEmail(item); suggestions.data = []; }}
          style={styles.suggestionItem}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )}


          {email.length < 1 && (
            <Animatable.Text style={styles.errorText} animation="bounceIn" delay={200} duration={500}>Enter your PhoneNumber</Animatable.Text>
          )}
  
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              label="Enter 4-Digit Pin"
              mode='outlined'
              secureTextEntry={true}
              onChangeText={setPassword}
              activeOutlineColor='black'
              value={password}
              maxLength={4}
              keyboardType='numeric'
              left={<TextInput.Icon icon="lock" size={20}/>}
              // onFocus={() => setIsFocused(true)}
              //  onBlur={() => setIsFocused(false)}
              // theme={{
              //   fonts: {
              //     labelLarge: {
              //       fontWeight: isFocused ? 'bold' : 'normal', // Bold when focused
              //     },
              //   },
              // }}
            />
          </View>
          {password.length < 1 && (
            <Animatable.Text style={styles.errorText} animation="bounceIn" delay={200} duration={500}>Enter 4-Digit Pin</Animatable.Text>
          )}


  
          {/* <View style={styles.button}> */}
            <Animatable.View style={styles.button} animation="zoomIn" duration={500} delay={200}>
             <Button
  mode="contained"
  onPress={handleSubmit}
  style={[styles.registerButton,
    // {backgroundColor: 'green'}
  ]}
  labelStyle={{ fontSize: 15 }}
>
  Submit
</Button>
 {/* <Button
  mode="contained"
  onPress={handleLogout}
  style={[styles.registerButton,{backgroundColor: 'red'}]}
  labelStyle={{ fontSize: 15 }}
>
  Cancel
</Button> */}
          
          </Animatable.View>

            <Text style={styles.txt}>For new user, Register below</Text>
        
        
              <Animatable.View animation="zoomIn" duration={500} delay={200}>
  <Button
    mode="contained"
    onPress={() => navigation.navigate("Register")}
    style={styles.signupButton}
    labelStyle={{ fontSize: 15 }}
  >
    SignUp
  </Button>
</Animatable.View>
              
              </LinearGradient>
          </Animatable.View>
      </ScrollView>
    ));
  }
  
  const styles = StyleSheet.create({
    // contains: {
    //   // backgroundColor: '#f2eece',
    //    backgroundColor: '#feada6',  
    //   marginVertical: 150,
    //   borderRadius: 10,
    //   margin: 15,
    //   paddingTop: 10,
    //   paddingBottom:10,
    //   flexWrap: 'wrap',
    //   borderColor: 'black',
    //   shadowColor: "#000",
    //   shadowOffset: { width: 4, height: 4 },
    //   shadowOpacity: 0.3,
    //   shadowRadius: 4.65,
    //   elevation: 8,
    // },
    contains: {
  // backgroundColor: '#feada6',  
  marginVertical: 100,
  borderRadius: 10,
  margin: 15,
  paddingTop: 10,
  paddingBottom: 10,
  alignItems: 'center',  // ✅ add this
  borderColor: 'black',
  shadowColor: "#000",
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 8,
},
    container: {
      
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 5,
      // margin:16,
      borderRadius: 10,
      marginVertical: 0,
      marginHorizontal: 10,
    },
    textInput: {
      width: 280,
      height: 45,
      marginLeft: 10,
      textAlign: 'left',
      borderRadius: 5,

    },
    button: {
      flexDirection: 'row',
      margin: 5,
      paddingTop: 2,
      // justifyContent: 'center',
      // alignItems: 'center',
      borderRadius: 8,
    },
    TO1: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'green',
    },
    TO2: {
      borderRadius: 5,
      backgroundColor: 'red',
      padding: 10,
    },
    TOtext: {
      color: 'white',
      fontSize: 16,
    },
    txt: {
      textAlign: 'center',
      fontSize: 18,
    },
    edit: {
    
        width: 80,
       height: 45,
      // paddingVertical: 10,
      paddingHorizontal: 10,
        alignSelf:'center',
        marginBottom:10,
        textAlign:'center',
        alignItems:'center',
        borderWidth:2,
        borderRadius:10,
        borderColor:'#FFFFFF',
        // flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#5e7480',
        marginTop:10
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 18,
      color: 'black',
      fontWeight: 'bold',
    },
    errorText: {
      color: 'black',
      fontSize: 14,
      alignSelf: 'center',
      marginTop: 5,
    },
    conta: {
      padding: 20,
    },
    pinContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    pinInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      width: 50,
      height: 50,
      fontSize: 20,
      textAlign: 'center',
      borderRadius: 8,
      marginHorizontal: 5,
    },
    error: {
      color: 'red',
      marginTop: 10,
    },
    textHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
  marginTop: 10,
},
registerButton: {
  width: wid * 0.8,   // Fixed: using correct width
  height: 45,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  alignSelf: 'center',
  marginBottom: 10,
  marginHorizontal: 10,
  marginTop: 10,
  borderRadius: 10,
  backgroundColor: '#6e45e2',
},
signupButton: {
   width: wid * 0.5,   // Fixed: using correct width
  height: 45,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginBottom: 10,
  marginTop: 8,
  borderRadius: 10,
  backgroundColor: '#6e45e2',// Fixed: using correct width
},
suggestionsList: {
  // display: 'flex',
  // flexDirection:'row',
  // flexWrap: 'wrap',
  // justifyContent:'space-evenly',
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '75%',
    borderRadius: 4,
    maxHeight: 80,
  },
  suggestionItem: {
    padding: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  });
  