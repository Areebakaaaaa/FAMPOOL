import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { postingRide } from '../services/fampoolAPIs';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostRide = () => {
  const navigation = useNavigation();

  const [customerType, setCustomerType] = useState('Student');
  const [gender, setGender] = useState('Male');
  //const [acType, setAcType] = useState('AC');
  const [toFromFast, setToFromFast] = useState('TO FAST');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const [toFromLocation, setToFromLocation]= useState('');
  const loc="North Nazimabad";
  const driverId= "k200000";

  let postRideDetails={
    driverId, customerType, toFromFast, time, date, seats, toFromLocation
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
    console.log({ customerType, toFromFast, time, date, seats, toFromLocation });
    
    try{
      const result = await postingRide(postRideDetails);

      if(result)
      {
        Alert.alert("SUCCESS!, Ride Posted Successfully!.");
        navigation.navigate("HomePage");
      }
      else
      {
        Alert.alert("ERROR!, Ride Posting Failed!")
      }


    }catch (err)
    {
      console.error(err);
    }
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
            <Picker.Item label="Not Specific" value="Not Specific" />
            <Picker.Item label="Male Specific" value="Male Specific" />
            <Picker.Item label="Female Specific" value="Female Specific" />
            <Picker.Item label="Faculty Specific" value="Faculty Specific" />
          </Picker>

          {/*
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="Male Specific" />
            <Picker.Item label="Female" value="Female Specific" />
          </Picker>

           <Picker
            selectedValue={acType}
            onValueChange={setAcType}
            style={styles.picker}
          >
            <Picker.Item label="AC" value="AC" />
            <Picker.Item label="Non AC" value="Non AC" />
          </Picker> */}

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

          <TextInput
            placeholder="Seats"
            onChangeText={setSeats}
            value={seats}
            style={styles.input}
          />

          <TextInput
            placeholder="toFromLocation"
            onChangeText={setToFromLocation}
            value={toFromLocation}
            style={styles.input}
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
