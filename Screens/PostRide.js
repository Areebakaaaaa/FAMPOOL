
//KEYBOARD VERSION

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { postingRide } from '../services/fampoolAPIs';
import { useNavigation } from '@react-navigation/native';

const PostRide = () => {
  const [customerType, setCustomerType] = useState('Student');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [amPm, setAmPm] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const navigation = useNavigation();

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
    const postRideDetails = {
      driverId: "k200452",
      customerType,
      hours,
      minutes,
      amPm,
      date,
      seats
    };

    try {
      const result = await postingRide(postRideDetails);
      result
        ? Alert.alert("SUCCESS!, Ride Posted Successfully!") // Wrap text in <Text> component
        : Alert.alert("ERROR!, Ride Posting Failed!") // Wrap text in <Text> component
      navigation.navigate("HomePage");
    } catch (err) {
      console.error(err);
    }
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
          <Picker.Item label="Not Specific" value="Not Specific" />
          <Picker.Item label="Male" value="Male Specific" />
          <Picker.Item label="Female" value="Female Specific" />
        </Picker>

        <Picker
          selectedValue={customerType}
          onValueChange={setCustomerType}
          style={styles.picker}
        >
          <Picker.Item label="Student" value="Student Specific" />
          <Picker.Item label="Faculty" value="Faculty Specific" /> 
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
          placeholder="Date"
          onChangeText={setDate}
          // value={date}
          style={styles.input}
        />

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
