import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { postingRide } from '../services/fampoolAPIs';

const PostRide = () => {
  const [customerType, setCustomerType] = useState('Student');
  const [gender, setGender] = useState('Male');
  const [acType, setAcType] = useState('AC');
  const [toFromFast, setToFromFast] = useState('TO FAST');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const location="ABCXYZ";

  let postRideDetails={
    customerType, gender, acType, toFromFast, time, date, location,
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

  const postRide = async () => {
    console.log('Ride posted...');
    console.log({ customerType, gender, acType, toFromFast, time, date });
    const data = await postingRide(postRideDetails);
    // Perform the post ride logic here
  };

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

          <TextInput
            placeholder="DepartureTime"
            onChangeText={setTime}
            value={time}
            style={styles.input}
          />
          <TextInput
            placeholder="Date"
            onChangeText={setDate}
            value={date}
            style={styles.input}
            editable={false} // Make it non-editable
          />

          <TouchableOpacity
            style={styles.button}
            onPress={postRide}
          >
            <Text style={styles.buttonText}>Post Ride</Text>
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
});

export default PostRide;
