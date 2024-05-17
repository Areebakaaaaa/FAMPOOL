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

  const [waypoint, setWaypoint]=useState(null);
  const [location, setLocation]=useState(null);
  const [lastFare, setLastFare]=useState(null);
  
  let RideFareDetails = {
    totalDistance: ride.distance,
    bookedSeats: 2,
  }

  useEffect(() => {
    if (fare && fare.length > 0) {
        const lastFareValue = fare[fare.length - 1].fareShare.toFixed(2);
        setLastFare(lastFareValue);
        console.log("Last Fare: ", lastFareValue);
    }
}, [fare]);  // Dependency array includes fare to trigger effect when fare changes


  const testing = () => {
    console.log("Value going: ", waypoint);
    console.log("Distance: ", waypoint.distance);
    console.log("Total INFORMATION: ", RideFareDetails);

    const val = calculateFareShares(RideFareDetails, waypoint.distance);
    console.log("Fare is: ", val);
    setFare(val);  // Assuming val is an array with objects containing fareShare

    // We need to check if 'fare' is not just defined, but also has elements before accessing
    const lastFare = fare && fare.length > 0 ? fare[fare.length - 1].fareShare.toFixed(2) : "0.00";
    setLastFare(lastFare);
}


  const calculateFareButton=()=>{
    console.log('Fare Calculation!.');
    testing();
  }

    let bookRideDetails={
      userId: "k201730",
      driverId: ride.driverId,
      rideId: ride.id,
      hours: ride.hours,
      minutes: ride.minutes,
      amPm: ride.amPm,
      origin: ride.origin,
      destination: ride.destination,
      waypoint,
      date: "16/05/2024",
      fare: lastFare,
      rideStatus: "Pending",
    }
  
  const confirmBooking = async() => {
    testing();
    console.log('Ride Booked!. ================================>', ride.id);

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
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTextTitle}>From:</Text>
            <Text style={styles.rideDetailText}>{ride.origin.name}</Text>
          </View>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="navigate-circle" size={24} color="#009688" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTextTitle}>To:</Text>
            <Text style={styles.rideDetailText}>{ride.destination.name}</Text>
          </View>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="calendar" size={24} color="#009688" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTextTitle}>Date:</Text>
            <Text style={styles.rideDetailText}>{ride.date}</Text>
          </View>
        </View>
        <View style={styles.rideDetailRow}>
          <Ionicons name="time" size={24} color="#009688" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTextTitle}>Time:</Text>
            <Text style={styles.rideDetailText}>{ride.hours}:{ride.minutes} {ride.amPm}</Text>
          </View>
        </View>
        {/* <View style={styles.rideDetailRow}>
          <Ionicons name="person" size={24} color="#009688" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTextTitle}>Seats:</Text>
            <Text style={styles.rideDetailText}>{ride.bookedSeats}/{ride.seats}</Text>
          </View>
        </View> */}
        {ride.waypoints.length > 0 && (
          <Picker
          selectedValue={waypoint ? waypoint.name : null}
          onValueChange={(itemValue, itemIndex) => {
              // Assuming each waypoint object has a 'name' and 'distance' and is fully represented in ride.waypoints
              setWaypoint(ride.waypoints[itemIndex]);
              setLocation(waypoint);
          }}
          style={styles.picker}
        >
          {ride.waypoints.map((waypoint, index) => (
            <Picker.Item key={index} label={waypoint.name} value={waypoint.name} />
          ))}
        </Picker>
        
        )}

        <View style={styles.rideDetailRow}>
          <Ionicons name="cash" size={24} color="#009688" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTextTitle}>Fare:</Text>
            <Text style={styles.rideDetailText}>Rs. {fare.length > 0 ? fare[fare.length - 1].fareShare.toFixed(2) : 'Calculating...'}</Text>
          </View>
          
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={calculateFareButton}>
          <Text style={styles.confirmButtonText}>Calculate Fare</Text>
        </TouchableOpacity>
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
    backgroundColor: '#00897B',
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
  detailTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  rideDetailText: {
    fontSize: 18,
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
