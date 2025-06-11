import {
    TouchableOpacity, Text, SafeAreaView, StyleSheet, View, Alert, ScrollView
  } from 'react-native';
  import  axios  from "axios";
  import { useNavigation } from '@react-navigation/native'; 
  import { TextInput,ActivityIndicator } from 'react-native-paper';
  import React, { useState, useEffect, useRef } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Clock from '../components/clock';
  import { apiLink, ip } from './axiosConfig';
import { set } from 'mongoose';


  
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
         console.log('Token expired or invalid. Please login again.');
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
    
      console.log("Attempting user login...");
    
      const userData = {
        email,
        password
      };
    
      console.log(userData, 'userData');
    
      try {
        const res = await axios.post(apiLink+`/login-user`, userData); // FIXED
      
          const { status, user, data } = res.data;
          console.log(res.data, 'response data');
         
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
            console.log("User does not exist");
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
  
  
    return (
      loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.textHeader}>Loading...</Text>
    </View>
      ) : (
      <ScrollView>
        <View style={styles.contains}>
          <Text style={{ textAlign: 'center', fontSize: 30 }}>LOGIN</Text>
          <Text style={styles.textStyle}>{currentDate}</Text>
          <Clock />
  
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              label="PhoneNumber"
              mode='outlined'
              onChangeText={setEmail}
              value={email}
              maxLength={10}
              keyboardType='numeric'
            />
          </View>
          {email.length < 1 && (
            <Text style={styles.errorText}>Enter your PhoneNumber</Text>
          )}
  
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              label="Enter 4-Digit Pin"
              mode='outlined'
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              maxLength={4}
              keyboardType='numeric'

            />
          </View>
          {password.length < 1 && (
            <Text style={styles.errorText}>Enter 4-Digit Pin</Text>
          )}
{/* 
<View style={styles.conta}>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.pinInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            secureTextEntry={false}
          />
        ))}
      </View>
      {combinedPin.length < 4 && (
        <Text style={styles.error}>Enter your 4-digit PIN</Text>
      )}
    </View> */}

  
          <View style={styles.button}>
            <TouchableOpacity style={styles.TO1} onPress={handleSubmit}>
              <Text style={styles.TOtext}>Submit</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.TO2} onPress={handleLogout}>
              <Text style={styles.TOtext}>Cancel</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.TO2} onPress={()=>navigation.navigate('masterAdmin')}>
              <Text style={styles.TOtext}>Create</Text>
            </TouchableOpacity> */}
          </View>

          <Text style={styles.txt}>For new user, Register below</Text>

          <TouchableOpacity style={styles.edit} title="Register"
                onPress={() => navigation.navigate("Register")}>
               <Text style={{ color: 'white',fontSize:15}}>Register</Text> 
            </TouchableOpacity>
            
        </View>
      </ScrollView>
    ));
  }
  
  const styles = StyleSheet.create({
    contains: {
      backgroundColor: '#f2eece',
      marginVertical: 180,
      borderRadius: 10,
      margin: 15,
      paddingTop: 10,
      flexWrap: 'wrap',
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
      padding: 5,
      borderRadius: 10,
      marginVertical: 5,
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
      paddingTop: 10,
      justifyContent: 'space-evenly',
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
        padding: 5,
        // width: 'auto',
        // margin:'auto',
        width: 100,
       height: 40,
        alignSelf:'center',
        marginBottom:20,
        textAlign:'center',
        alignItems:'center',
        borderWidth:2,
        borderRadius:10,
        borderColor:'#FFFFFF',
        flexDirection:'row',
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
      color: 'red',
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
  });
  