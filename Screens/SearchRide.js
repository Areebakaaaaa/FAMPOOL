/* //Version with back button
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location"

export default MapScreen = () => {
  const navigation = useNavigation();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setMarkerPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log("Location: ", location);
    })();
  }, []);

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    console.log("Marker Position: ", markerPosition);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {currentLocation ? (
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}

      {currentLocation && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("SearchRideDetails")}>
            <Text style={styles.buttonText}>Search a Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: '#00987B',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonBox: {
    backgroundColor: '#00987B',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  // ...rest of your styles
});
 */


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SearchRide = () => {
  const navigation = useNavigation();

  const [customerType, setCustomerType] = useState('No Specification');
  const [toFromFast, setToFromFast] = useState('TO FAST');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [amPm, setAmPm] = useState('AM');
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState('');

  let rideDetails={
    customerType,
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
    console.log({ customerType, toFromFast, hours, minutes, amPm, date, destination });
    navigation.navigate("AvailableRide", rideDetails);
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
            <Picker.Item label="No Specification" value="No Specification" />
            <Picker.Item label="Male Only" value="Male Only" />
            <Picker.Item label="Female Only" value="Female Only" />
            <Picker.Item label="Faculty Only" value="Faculty Only" />
          </Picker>

          {/* <Picker
            selectedValue={toFromFast}
            onValueChange={setToFromFast}
            style={styles.picker}
          >
            <Picker.Item label="TO FAST" value="TO FAST" />
            <Picker.Item label="FROM FAST" value="FROM FAST" />
          </Picker> */}

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

          {/* <TextInput
            placeholder="Date"
            onChangeText={setDate}
            value={date}
            style={styles.input}
            editable={false} // To make it non-editable
          /> */}

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

export default SearchRide;