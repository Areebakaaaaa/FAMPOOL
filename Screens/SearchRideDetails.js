import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SearchRideDetails = () => {
  const navigation = useNavigation();

  const [customerType, setCustomerType] = useState('Student');
  const [gender, setGender] = useState('Male');
  const [acType, setAcType] = useState('AC');
  const [toFromFast, setToFromFast] = useState('TO FAST');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [amPm, setAmPm] = useState('AM');
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState('');

  let rideDetails={
    customerType,
    gender,
    acType,
    toFromFast,
    hours,
    minutes,
    amPm,
    date,
    destination,
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

  const searchRide = () => {
    console.log('Searching Ride...');
    console.log({ customerType, gender, acType, toFromFast, hours, minutes, amPm, date, destination });
    navigation.navigate("AvailableRide");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <LinearGradient
        colors={['#00BC99', '#009688', '#00796B']}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.header}>Search a Ride</Text>

          <Picker
            selectedValue={customerType}
            onValueChange={setCustomerType}
            style={styles.picker}
          >
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Faculty" value="Faculty" />
          </Picker>

          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>

          <Picker
            selectedValue={acType}
            onValueChange={setAcType}
            style={styles.picker}
          >
            <Picker.Item label="AC" value="AC" />
            <Picker.Item label="Non AC" value="Non AC" />
          </Picker>

          <Picker
            selectedValue={toFromFast}
            onValueChange={setToFromFast}
            style={styles.picker}
          >
            <Picker.Item label="TO FAST" value="TO FAST" />
            <Picker.Item label="FROM FAST" value="FROM FAST" />
          </Picker>

          <View style={styles.timeContainer}>
            <View style={styles.timeBox}>
              <Text style={styles.label}>Hour</Text>
              <TextInput
                placeholder="01"
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
                placeholder="56"
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
            editable={false} // To make it non-editable
          />

          <TextInput
            placeholder="Destination"
            onChangeText={setDestination}
            value={destination}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={searchRide}>
            <Text style={styles.buttonText}>Search</Text>
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
});

export default SearchRideDetails;
