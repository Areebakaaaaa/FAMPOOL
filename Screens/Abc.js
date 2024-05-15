import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {calculateFareShares} from '../services/algorithm';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ipv4 from '../services/config';
import { bookingRide } from '../services/fampoolAPIs';

const Abc = ({route}) => {
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
  
  let bookRideDetails = {
    userId, driverId, aaa, pickUp, dropOff, rideStatus,

  }

  
  useEffect(()=>{
    console.log("Abc screen: ",rideDetails.destination);
    const fetchRides = async () => {
      try{
        console.log("Fetching Rides.");
        const response = await fetch(`${ipv4}:5000/rides/demo-location`);
        const data = await response.json();
        setRides(data);
        console.log("From database ",data);

        let des = 0;
        if (rideDetails.destination === "Malir Halt" && data.length > 0) {
          des = data[0].locationOne; // Assuming the first item contains the relevant location
          console.log("Destination fareeha: ", des);
        }
        else if (rideDetails.destination === "Malir 15" && data.length > 0) {
          des = data[0].locationTwo;
          console.log("Destination fareeha: ", des);
        }
        else if (rideDetails.destination === "Qaidabad" && data.length > 0) {
          des = data[0].locationThree;
          console.log("Destination fareeha: ", des);
        }
        else if (rideDetails.destination === "Drigh Road" && data.length > 0) {
          des = data[0].locationFour;
          console.log("Destination fareeha: ", des);
        }
        else{
          console.log("Nothing");
        }

        console.log("Value going: ",des);
        const val=calculateFareShares(ride.seats,Number(des));
        console.log("Fare is: ", val);
        setFare(val);
        
      } catch(err){
        console.error('Error fetching rides: ', err);
      }
    };

    fetchRides();

    
  }, []); 

  useEffect(() => {
    setAAA(fare.length > 0 ? fare[fare.length - 1].fareShare.toFixed(2) : '');
  }, [fare]);
  


  

  return (
    <View style={styles.container}>
      <View style={styles.rideSummaryCard}>
        <Text style={styles.headerText}>Ride Summary</Text>
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