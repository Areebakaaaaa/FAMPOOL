import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location"

export default MapScreen = () => {

  const navigation = useNavigation();

  const [currentlocation, setCurrentLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress]= useState('');
  
  const fetchAddress = async (latitude, longitude) => {
    try{
      const apiKey="AIzaSyBBRMG64e7-KtKll9mDzlRVBHg7fpsiX-M";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      
      if(!response.ok)
      {
        throw new Error('Failede to fetch address');
      }

      const data = await response.json();

      if(data.results.length > 0){
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        console.log("Address: ",formattedAddress);
      }
    }catch(error){
      console.error("Error fetching address: ", error.message);
    }
  }

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      console.log("Location: ", location);

      fetchAddress(location.coords.latitude, location.coords.longitude); //fetching address using google geocoding API
    })();
  }, []);

  

  return (
    <View style={styles.container}>
      {currentlocation && (
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentlocation.coords.latitude,
            longitude: currentlocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentlocation.coords.latitude,
              longitude: currentlocation.coords.longitude,
            }}
          />
        </MapView>
      )}

      {address && (<Text style={styles.addressText}>{address}</Text>)}

      {currentlocation && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("AvailableRide")}>
            <Text style={styles.buttonText}>Search a Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  buttonBox: {
    backgroundColor: '#4CAF50',
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
  addressText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});
