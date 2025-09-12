import React, { useState, useEffect } from 'react';
import {
  Image, View, Text, SafeAreaView, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import  { ip ,apiLink} from './axiosConfig';
import axios from 'axios';

const wid = Dimensions.get('screen').width;

export default function StaticVagi() {
  const navigation = useNavigation();
  const [selectedMosque, setSelectedMosque] = useState('');
  const [items, setItems] = useState([]);
  const [timings, setTimings] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(true);

  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsTokenValid(false);
    // Alert.alert("Session expired. Please log in again.");
    navigation.replace('Loginform');
  };

  const validateTokenAndFetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const storedName = await AsyncStorage.getItem('name');
      // const storedEmail = await AsyncStorage.getItem('email');
      const storedPhone = await AsyncStorage.getItem('phone');
      const storedId = await AsyncStorage.getItem('id');

      if (!token || !storedPhone) {
        handleLogout();
        return;
      }

      const res = await axios.get(apiLink+`/protected`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.data.valid) {
        handleLogout();
        return;
      }

      setName(storedName || '');
      // setEmail(storedEmail || '');
      setPhone(storedPhone || '');
      setId(storedId || '');

      const mosqueRes = await axios.get(apiLink+`/Mosques`);
      const data = mosqueRes.data;
      setItems(data);
      
      // ✅ Use data instead of items here
      if (data.length > 0) {
        setSelectedMosque(data[0].mosqueName);
        handlePicker(data[0].mosqueName);
      }

    } catch (err) {
     Alert.alert("Token validation or data fetch failed:", err);
      handleLogout();
    }
  };

  useEffect(() => {
    validateTokenAndFetchData();

   

    return () => {
      // clearInterval(interval);
      // clearTimeout(removeTokenTimeout);
    };
  }, []);

  const fetchData = async (itemValue) => {
    try {
      const response = await axios.get(apiLink+`/selectedMosque`, {
        params: { selection: itemValue }
      });
      setTimings(response.data);
    } catch (error) {
      Alert.alert('Error fetching mosque timings:', error);
    }
  };

  const handlePicker = (itemValue) => {
    setSelectedMosque(itemValue);
    fetchData(itemValue);
  };

  const renderTimingRow = (label, salahTime, ikaamatTime, icon) => (
    <View style={styles.row}>
      <Image source={icon} style={styles.img} />
      <Text style={styles.text}>{label}</Text>
      <Text style={styles.timings}>{salahTime}</Text>
      <Text style={styles.text}>{ikaamatTime}</Text>
    </View>
  );

  return isTokenValid ? (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.containers}>
          <Picker
            selectedValue={selectedMosque}
            style={styles.dropdown}
            onValueChange={handlePicker}
          >
            <Picker.Item label='Select Mosque' value='' />
            {items.map((item) => (
              <Picker.Item key={item._id} label={item.mosqueName} value={item.mosqueName} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.mosquename}>{selectedMosque}</Text>
        <Text style={styles.mosquename}>WELCOME, {name.toUpperCase()}!</Text>

        <View style={styles.row}>
          <Image style={styles.img} source={require('../assets/prayer.jpg')} />
          <Text style={styles.text}>PRAYERS</Text>
          <Text style={styles.timings}>SALAH</Text>
          <Text style={styles.text}>IKAAMAT</Text>
        </View>

        {renderTimingRow('ஃபஜர்', timings.fajrSalah, timings.fajrIkaamat, require('../assets/fajr.png'))}
        {renderTimingRow('ஸுஹர்', timings.zuhrSalah, timings.zuhrIkaamat, require('../assets/zuhr.png'))}
        {renderTimingRow('அசர்', timings.asrSalah, timings.asrIkaamat, require('../assets/asr.png'))}
        {renderTimingRow('மக்ரிப்', timings.maghribSalah, timings.maghribIkaamat, require('../assets/magrib.png'))}
        {renderTimingRow('இஷா', timings.ishaSalah, timings.ishaIkaamat, require('../assets/isha.png'))}
        {renderTimingRow('ஜும்மா', timings.jummahSalah, timings.jummahikaamat, require('../assets/zuhr.png'))}
      </View>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text style={styles.mosquename}>Session Expired. Please log in again.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2eece',
    width: wid,
    paddingHorizontal: 10
  },
  containers: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  dropdown: {
    width: 280,
    height: 50,
    borderWidth: 1,
    fontSize: 15
  },
  logoutButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center'
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold'
  },
  mosquename: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0d0d0d',
    alignSelf: 'center',
    paddingVertical: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10
  },
  img: {
    height: 40,
    width: 40
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d0d0d',
    textTransform: 'uppercase'
  },
  timings: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d0d0d',
    padding: 20,
    textTransform: 'uppercase'
  }
});
