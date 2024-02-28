import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location"


export default MapScreen = () => {

  const navigation = useNavigation();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState('');
  const [destination, setDestination] = useState('');

  const fetchAddress = async (latitude, longitude) => {
    try {
      const apiKey = "AIzaSyBBRMG64e7-KtKll9mDzlRVBHg7fpsiX-M";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      console.log(data);

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        console.log("Address: ", formattedAddress);
      }
    } catch (error) {
      console.error("Error fetching address: ", error.message);
    }
  }

  const handleSearch = () => {
    // Fetch coordinates for the entered destination (ABC and XYZ are placeholders)
    const destinationCoordinates = {
      latitude: -25.80,
      longitude: 50.05,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    // Update the map to the destination coordinates
    setCurrentLocation(destinationCoordinates);
    fetchAddress(destinationCoordinates.latitude, destinationCoordinates.longitude);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      console.log("Location: ", location);

      //fetchAddress(location.coords.latitude, location.coords.longitude); //fetching address using google geocoding API
    })();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {currentLocation && (
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
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
          />
        </MapView>
      )}

      {address && (<Text style={styles.addressText}>{address}</Text>)}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {currentLocation && (
        <View style={styles.bottomButtonContainer}>
          {/* Other UI elements can be added here */}
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  addressText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});