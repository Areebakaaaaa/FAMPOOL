//Version 1 (Fareeha)

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { postingRide } from '../services/fampoolAPIs';
// import { Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import Constants from "expo-constants";
// import configData from '../services/config';


// const InputAutocomplete = ({
//   label,
//   placeholder,
//   onPlaceSelected,
// }) => {
//   return (
//     <>
//       <Text>{label}</Text>
//       <GooglePlacesAutocomplete
//         styles={{ textInput: styles.input }}
//         placeholder={placeholder || ""}
//         fetchDetails
//         onPress={(data, details = null) => {
//           onPlaceSelected(details);
//         }}
//         query={{
//           key: configData.myApiKey,
//           language: "en",
//         }}
//       />
//     </>
//   );
// };

// const PostRide = () => {
//   const navigation = useNavigation();

//   const [customerType, setCustomerType] = useState('Student');
//   const [toFromFast, setToFromFast] = useState('TO FAST');
//   const [time, setTime] = useState('');
//   const [date, setDate] = useState('');
//   const [seats, setSeats] = useState('');
//   const [toFromLocation, setToFromLocation]= useState('');
//   const loc="North Nazimabad";
//   const driverId= "k200452";
//   const [hours, setHours] = useState('');
//   const [minutes, setMinutes] = useState('');
//   const [amPm, setAmPm] = useState('AM');


//   let postRideDetails={
//     driverId, customerType, toFromFast, hours, minutes, amPm, date, seats, toFromLocation
//   }

//   useEffect(() => {
//     // Set the initial date to the current date
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     const formattedDate = `${year}-${month}-${day}`;
//     setDate(formattedDate);
//   }, []);

//   const postRide = async () => {
//     console.log('Ride posted...');
//     console.log({ customerType, toFromFast, hours, minutes, amPm, date, seats, toFromLocation });
    
//     try{
//       const result = await postingRide(postRideDetails);

//       if(result)
//       {
//         Alert.alert("SUCCESS!, Ride Posted Successfully!.");
//         navigation.navigate("HomePage");
//       }
//       else
//       {
//         Alert.alert("ERROR!, Ride Posting Failed!")
//       }


//     }catch (err)
//     {
//       console.error(err);
//     }
//   };

//   const onPlaceSelected = (details) => {
//     const position = {
//       latitude: details?.geometry.location.lat || 0,
//       longitude: details?.geometry.location.lng || 0,
//     };
    
//     const locationName = details?.formatted_address || ''; // Extract the location name from details
//     //setToFromLocation({ ...position, name: locationName }); // Save coordinates along with the location name
//     setToFromLocation(locationName);
//     console.log('meri location: ',locationName);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//       <Text style={styles.header}>Post a Ride</Text>

//         <Picker
//           selectedValue={customerType}
//           onValueChange={setCustomerType}
//           style={styles.picker}
//         >
//           <Picker.Item label="Not Specific" value="Not Specific" />
//           <Picker.Item label="Male" value="Male Specific" />
//           <Picker.Item label="Female" value="Female Specific" />
//         </Picker>

//       <Picker
//         selectedValue={customerType}
//         onValueChange={setCustomerType}
//         style={styles.picker}
//         >
//          <Picker.Item label="Student" value="Student Specific" />
//           <Picker.Item label="Faculty" value="Faculty Specific" /> 
//       </Picker>

//         <Picker
//           selectedValue={toFromFast}
//           onValueChange={setToFromFast}
//           style={styles.picker}
//         >
//           <Picker.Item label="TO FAST" value="TO FAST" />
//           <Picker.Item label="FROM FAST" value="FROM FAST" />
//         </Picker>

//         <View style={styles.timeContainer}>
//             <View style={styles.timeBox}>
//               <Text style={styles.label}>Hour</Text>
//               <TextInput
//                 placeholder="01"
//                 onChangeText={setHours}
//                 value={hours}
//                 style={styles.timeInput}
//                 keyboardType="numeric"
//                 maxLength={2}
//               />
//             </View>

//             <View style={styles.timeBox}>
//               <Text style={styles.label}>Minute</Text>
//               <TextInput
//                 placeholder="56"
//                 onChangeText={setMinutes}
//                 value={minutes}
//                 style={styles.timeInput}
//                 keyboardType="numeric"
//                 maxLength={2}
//               />
//             </View>

//             <View style={styles.timeBox}>
//               <Text style={styles.label}>AM/PM</Text>
//               <Picker
//                 selectedValue={amPm}
//                 onValueChange={setAmPm}
//                 style={[styles.pickerAmPm, { color: 'black' }]} // Set color to black
//               >
//                 <Picker.Item label="AM" value="AM" />
//                 <Picker.Item label="PM" value="PM" />
//               </Picker>
//             </View>
//           </View>
           
//         <TextInput
//           placeholder="Date"
//           onChangeText={setDate}
//           value={date}
//           style={styles.input}
//           editable={false} // Make it non-editable
//         />

//         <TextInput
//           placeholder="Seats"
//           onChangeText={setSeats}
//           value={seats}
//           style={styles.input}
//         />
      
//         <InputAutocomplete
//         placeholder="Destination"
//           onPlaceSelected={(details) => { onPlaceSelected(details); }}
//         />

//         <TouchableOpacity onPress={postRide} >
//             <Text>Post Ride</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flexGrow: 1,
//   },
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10, // Adjusted padding for smaller screens
//   },
//   card: {
//     width: '100%', // Use the full width to ensure it fits on all devices
//     maxWidth: 600, // Maximum width for larger devices
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#005A4A',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   picker: {
//     width: '100%',
//     marginVertical: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#F0F0F0',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#00897B',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   searchContainer: {
//     position: "absolute",
//     width: "90%",
//     backgroundColor: "white",
//     shadowColor: "black",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 4,
//     padding: 8,
//     borderRadius: 8,
//     top: Constants.statusBarHeight + 10, // Adjusted top position for smaller screens
//   },
// });

// export default PostRide;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { postingRide } from '../services/fampoolAPIs';
import { useNavigation } from '@react-navigation/native';

const PostRide = () => {
  const navigation = useNavigation();

  const [customerType, setCustomerType] = useState('No Specification');
  const [toFromFast, setToFromFast] = useState('TO FAST');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const [toFromLocation, setToFromLocation]= useState('');
  const loc="North Nazimabad";
  const driverId= "k200452";
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [amPm, setAmPm] = useState('AM');


  let postRideDetails={
    driverId, customerType, hours, minutes, amPm, date, seats,
  }

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    // setDate(formattedDate);
  }, []);

  const validateAndPostRide = async () => {
    // Check if the date is between 1 and 12 and not negative
    const parsedHours = parseInt(hours);
    if (isNaN(parsedHours) || parsedHours < 1 || parsedHours > 12) {
      Alert.alert('Invalid Time', 'Please enter valid Hour between 1 and 12.');

      return;
    }

    // Check if the minutes are between 0 and 59 and not negative
  const parsedMinutes = parseInt(minutes);
  if (isNaN(parsedMinutes) || parsedMinutes < 0 || parsedMinutes > 59) {
    Alert.alert('Invalid Time', 'Please enter valid Minutes between 0 and 59.');
    return;
  }

  // Check if AM/PM is either 'AM' or 'PM'
  if (!(amPm.toUpperCase() === 'AM' || amPm.toUpperCase() === 'PM')) {
    Alert.alert('Invalid Time', 'Please enter AM or PM.');
    return;
  }

    // Continue with posting the ride if the date is valid
   /*  const postRideDetails = {
      driverId: "k200452",
      customerType,
      hours,
      minutes,
      amPm,
      date,
      seats
    }; */

    navigation.navigate("PostRideTwo", postRideDetails);

    /* try {
      const result = await postingRide(postRideDetails);
      result
        ? Alert.alert("SUCCESS!, Ride Posted Successfully!") // Wrap text in <Text> component
        : Alert.alert("ERROR!, Ride Posting Failed!") // Wrap text in <Text> component
      navigation.navigate("HomePage");
    } catch (err) {
      console.error(err);
    } */
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <LinearGradient colors={['#00474B', '#00897B']} style={styles.container}>
        <TouchableOpacity onPress={validateAndPostRide} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Post a Ride</Text>
           <Picker
          selectedValue={customerType}
          onValueChange={setCustomerType}
          style={styles.picker}
        >
          <Picker.Item label="No Specification" value="No Specification" />
          <Picker.Item label="Male Only" value="Male Only" />
          <Picker.Item label="Female Only" value="Female Only" />
          <Picker.Item label="Faculty Only" value="Faculty Only" />
        </Picker>

        <View style={styles.timeContainer}>
          <TextInput
            placeholder="Hour"
            onChangeText={setHours}
            value={hours}
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            placeholder="Minute"
            onChangeText={setMinutes}
            value={minutes}
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            placeholder="AM/PM"
            onChangeText={setAmPm}
            value={amPm}
            style={styles.timeInput}
            maxLength={2}
          />
        </View>

        <TextInput
          placeholder="Seats"
          onChangeText={setSeats}
          value={seats}
          style={styles.input}
          keyboardType='numeric'
        />

      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 7,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginRight: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 7,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    width: '100%',
    color: 'grey'
  },
  nextButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#00474B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostRide;
