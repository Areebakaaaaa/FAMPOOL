import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { postingRide } from '../services/fampoolAPIs';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import configData from '../services/config';


const InputAutocomplete = ({
  label,
  placeholder,
  onPlaceSelected,
}) => {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: configData.myApiKey,
          language: "en",
        }}
      />
    </>
  );
};

const PostRide = () => {
  const navigation = useNavigation();

  const [customerType, setCustomerType] = useState('No Specification');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const driverId= "k201609";

  const [hours, setHours] = useState('1');
  const [minutes, setMinutes] = useState('20');
  const [amPm, setAmPm] = useState('AM');


  let postRideDetails={
    driverId, customerType, hours, minutes, amPm, date, seats,
  }

  useEffect(() => {
    // Set the initial date to the current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <LinearGradient
        colors={['#00BC99', '#009688', '#00796B']}
        style={styles.container}
      >
        <View style={styles.card}>
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
            <View style={styles.timeBox}>
              <Text style={styles.label}>Hour</Text>
              <TextInput
                onChangeText={setHours}
                value={hours}
                style={styles.timeInput}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.label}>Minute</Text>
              <TextInput
                onChangeText={setMinutes}
                value={minutes}
                style={styles.timeInput}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>

            <View style={styles.timeBox}>
              <Text style={styles.label}>AM/PM</Text>
              <Picker
                selectedValue={amPm}
                onValueChange={setAmPm}
                style={[styles.pickerAmPm, { color: 'black' }]} // Set color to black
              >
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>
          </View>

          <TextInput
            placeholder="Date"
            onChangeText={setDate}
            value={date}
            style={styles.input}
            editable={false} // Make it non-editable
          />

          <TextInput
            placeholder="Seats"
            onChangeText={setSeats}
            value={seats}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={()=>navigation.navigate('PostRideTwo', postRideDetails)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%', // Use the full width to ensure it fits on all devices
    maxWidth: 600, // Maximum width for larger devices
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005A4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00897B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },


  picker: {
    width: '100%',
    marginVertical: 10,
  },
  pickerAmPm: {
    width: 80,
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeBox: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#005A4A',
    marginBottom: 5,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
  },
});

export default PostRide;
 