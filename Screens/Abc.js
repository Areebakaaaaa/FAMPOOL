import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {calculateFareShares} from '../services/algorithm';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

const Abc = ({route}) => {
  const ride = route.params.ride;
  const rideDetails= route.params;

  const [fare, setFare] = useState('');
  

  const [rides, setRides] = useState([]);
  const ipv4='http://172.16.88.220';

  
  useEffect(()=>{
    console.log("Abc screen: ",rideDetails.destination);
    const fetchRides = async () => {
      try{
        console.log("Fetching Rides.");
        const response = await fetch(`${ipv4}:5000/users/demo-location`);
        const data = await response.json();
        setRides(data);

        const val=calculateFareShares(ride.seats,16);
        console.log("Fare is: ", val);
        setFare(val);
        
      } catch(err){
        console.error('Error fetching rides: ', err);
      }
    };

    fetchRides();

    
  }, []); 


  const confirmBooking = () => {
    Alert.alert("Booking Confirmation", "Ride Booked!", [
      { text: "OK", onPress: () => navigation.navigate('HomePage') }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rideSummaryCard}>
        <Text style={styles.headerText}>Ride Summary</Text>
        <View style={styles.rideDetailRow}>
          <Ionicons name="location-sharp" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>From: {ride.toFromFast}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="navigate-circle" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>To: {ride.toFromLocation}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="calendar" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>Date: {ride.date}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="time" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>Time: {ride.departureTime}</Text>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="person" size={24} color="#009688" />
          <Text style={styles.rideDetailText}>Seats: {ride.seats}</Text>
        </View>
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

export default Abc;