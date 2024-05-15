import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {calculateFareShares} from '../services/algorithm';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import configData from '../services/config';
import { bookingRide } from '../services/fampoolAPIs';
import { Picker } from '@react-native-picker/picker';

const AvailableRideDetails = ({route}) => {
  const navigation=useNavigation();
  const ride = route.params.ride;
  const rideDetails= route.params;

  const [rides, setRides] = useState([]);
  const [fare, setFare] = useState('');
  

  const [userId, setUserId] = useState('k201732');
  const [driverId, setDriverId] = useState('k201609');
  const [pickUp, setPickUp] = useState('Home North Nazimabad');
  const [dropOff, setDropOff] = useState('Fast Nu');
  const [rideStatus, setRideStatus] = useState('Pending');

  const [aaa, setAAA]= useState('');

  const [wayPoint, setWayPoint]=useState();
  
  let bookRideDetails = {
    userId, driverId, aaa, pickUp, dropOff, rideStatus,

  }

  useEffect(() => {
    setAAA(fare.length > 0 ? fare[fare.length - 1].fareShare.toFixed(2) : '');
  }, [fare]);
  
  const confirmBooking = async() => {
    console.log('Ride Booked!.');

    try{
      const result = await bookingRide(bookRideDetails);

      if(result){
        Alert.alert("Booking Confirmation", "Ride Booked!", [{ text: "OK", onPress: () => navigation.navigate('RideStatus')}]);
      }
      else{
        Alert.alert("ERROR!. RIDE BOOKING FAILED");
      }

    }catch(err){
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rideSummaryCard}>
        <Text style={styles.headerText}>Ride Summary</Text>
        <View style={styles.rideDetailRow}>
          <Ionicons name="location-sharp" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>From: {ride.origin.name}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="navigate-circle" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>To: {ride.destination.name}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="calendar" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>Date: {ride.date}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="time" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>Time: {ride.hours}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="person" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>Seats: {ride.seats}</Text>
        </View>

        <Picker
          selectedValue={wayPoint}
          onValueChange={setWayPoint}
          style={styles.picker}
        >
          {ride.waypoints.map((waypoint, index) => (
            <Picker.Item key={index} label={waypoint.name} value={waypoint.name} />
          ))}
        </Picker>

        <View style={styles.rideDetailRow}>
          <Ionicons name="cash" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>Fare: Rs. {fare.length > 0 ? fare[fare.length - 1].fareShare.toFixed(2) : 'Calculating...'}</Text>
  
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={confirmBooking}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  rideSummaryCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  rideDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rideDetailText: {
    fontSize: 18,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#009688',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AvailableRideDetails;