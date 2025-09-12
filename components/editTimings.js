import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View, ScrollView, Alert, Platform,PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import Clock from '../components/clock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { ip,apiLink } from './axiosConfig';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Timings() {
  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const [mosqueName, setmosqueName] = useState('');
  const [location, setlocation] = useState('');

  const [fajrTime, setfajrTime] = useState('');
  const [zuhrTime, setzuhrTime] = useState('');
  const [asrTime, setasrTime] = useState('');
  const [magribTime, setmagribTime] = useState('');
  const [ishaTime, setishaTime] = useState('');
  const [jummahSalah, setjummahTime] = useState('');

  const [fajrIkaamat, setfajr] = useState('');
  const [zuhrIkaamat, setzuhr] = useState('');
  const [asrIkaamat, setasr] = useState('');
  const [magribIkaamat, setmagrib] = useState('');
  const [ishaIkaamat, setisha] = useState('');
  const [jummahikaamat, setjummah] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);

  //colon after 
   const formatTime = (text) => {
  const cleaned = text.replace(/[^0-9]/g, '');

  if (cleaned.length >= 3) {
    return cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
  }

  return cleaned;
};
  
// const requestPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission Required',
//           message: 'This app needs access to your media to upload images',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true; // iOS handles it through Info.plist
// };


const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        // Android 13+
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Media Permission',
            message: 'App needs access to your images',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // Android 12 or below
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      // console.warn('Permission error:', err);
      return false;
    }
  }

  return true; // iOS
};

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toDateString());
    setCurrentTime(`${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`);
  }, []);

  const handleImagePick =async () => {
    const permissionGranted = await requestPermission();
  if (!permissionGranted) {
    Alert.alert("Permission denied", "Cannot access media library.");
    return;
  }

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Image selection cancelled');
      } else if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setSelectedImage({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName,
        });
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // const userType = await AsyncStorage.getItem('userType');
      const email = await AsyncStorage.getItem('email');

      // console.log( email);

      const formData = new FormData();
      formData.append('mosqueName', mosqueName);
      formData.append('location', location);
      // formData.append('userType', userType);
      formData.append('fajrSalah', fajrTime);
      formData.append('fajrIkaamat', fajrIkaamat);
      formData.append('zuhrSalah', zuhrTime);
      formData.append('zuhrIkaamat', zuhrIkaamat);
      formData.append('asrSalah', asrTime);
      formData.append('asrIkaamat', asrIkaamat);
      formData.append('maghribSalah', magribTime);
      formData.append('maghribIkaamat', magribIkaamat);
      formData.append('ishaSalah', ishaTime);
      formData.append('ishaIkaamat', ishaIkaamat);
      formData.append('jummahSalah', jummahSalah);
      formData.append('jummahikaamat', jummahikaamat);

      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage.uri,
          name: selectedImage.fileName || 'mosque.jpg',
          type: selectedImage.type || 'image/jpeg',
        });
      }

      const response = await axios.post(apiLink+`/mosqueRegister`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'ok') {
        // console.log("Response Data:", response.data.mosque);
        Alert.alert('Mosque registered successfully');
        navigation.navigate('masterAdmin');
      } else {
        Alert.alert('Registration failed');
      }
    } catch (error) {
      // console.error("Submit Error:", error);
      Alert.alert("An error occurred", error.message);
    }
  };

  return (
    <ScrollView style={styles.contains}>
      <Text style={styles.userRegis}>PRAYER TIMINGS</Text>
      <Text style={styles.textStyle}>{currentDate}</Text>
      <Clock />

      {/* Input Fields */}
      {[{ label: "MOSQUENAME", setter: setmosqueName, value: mosqueName,length: 35 },
        { label: "MOSQUE-LOCATION", setter: setlocation, value: location,length: 35 },
        { label: "FAJR-ADHAAN", setter: setfajrTime, value: fajrTime,inputType: 'time',isTime: true,length: 5 },
        { label: "FAJR-IKAAMAT", setter: setfajr, value: fajrIkaamat,inputType: 'time',isTime: true,length: 5  },
        { label: "ZUHR-ADHAAN", setter: setzuhrTime, value: zuhrTime,inputType: 'time',isTime: true,length: 5  },
        { label: "ZUHR-IKAAMAT", setter: setzuhr, value: zuhrIkaamat,inputType: 'time',isTime: true,length: 5  },
        { label: "ASR-ADHAAN", setter: setasrTime, value: asrTime,inputType: 'time',isTime: true,length: 5  },
        { label: "ASR-IKAAMAT", setter: setasr, value: asrIkaamat,inputType: 'time',isTime: true,length: 5  },
        { label: "MAGRIB-ADHAAN", setter: setmagribTime, value: magribTime,inputType: 'time',isTime: true,length: 5  },
        { label: "MAGRIB-IKAAMAT", setter: setmagrib, value: magribIkaamat,inputType: 'time',isTime: true,length: 5  },
        { label: "ISHA-ADHAAN", setter: setishaTime, value: ishaTime,inputType: 'time',isTime: true,length: 5  },
        { label: "ISHA-IKAAMAT", setter: setisha, value: ishaIkaamat,inputType: 'time',isTime: true,length: 5  },
        { label: "JUMMA-ADHAAN", setter: setjummahTime, value: jummahSalah,inputType: 'time',isTime: true,length: 5  },
        { label: "JUMMA-IKAAMAT", setter: setjummah, value: jummahikaamat,inputType: 'time',isTime: true,length: 5  },
      ].map((field, index) => (
        <View style={styles.container} key={index}>
          <TextInput
             style={styles.textInput}
          label={field.label}
          mode="outlined"
          maxLength={field.length}
            activeOutlineColor='black'
          keyboardType={field.isTime ? "numeric" : "default"}
          value={field.value}
          onChangeText={(text) =>
            field.setter(field.isTime ? formatTime(text) : text)
          }
          />
        </View>
      ))}

      {/* Image Upload */}
      <View style={styles.container}>
        <TouchableOpacity onPress={handleImagePick} style={styles.edit}>
          <Text style={styles.TOtext}>Pick Image</Text>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10 }}>{selectedImage?.fileName || 'No image selected'}</Text>
      </View>

      {/* Submit/Cancel */}
      <View style={styles.button}>
        <TouchableOpacity style={styles.TO1} onPress={handleSubmit}>
          <Text style={styles.TOtext}>Submit</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.TO2} onPress={() => Alert.alert('Cancelled')}>
          <Text style={styles.TOtext}>Cancel</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contains: {
    backgroundColor: '#f2eece',
    // padding: 20,
    // paddingVertical:50,
    marginVertical:20
  },
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  userRegis: {
    textAlign: 'center',
    fontSize: 30,
  },
  textInput: {
    width: 280,
    height: 45,
    textAlign: 'left',
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  TO1: {
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'green',
  },
  TO2: {
    borderRadius: 5,
    backgroundColor: 'red',
    padding: 8,
  },
  TOtext: {
    color: 'white',
    fontSize: 18,
  },
  edit: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
  },
  textStyle: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  }
});
