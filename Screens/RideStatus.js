//Fareeha
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { LinearGradient } from 'expo-linear-gradient'; // Make sure expo-linear-gradient is installed
import { useNavigation } from '@react-navigation/native';
import configData from '../services/config';
import { rideStatusUpdate } from '../services/fampoolAPIs';

const RideStatus = ({ route }) => {
  const navigation = useNavigation();

  const [bookedRides, setBookedRides] = useState([]);
  const [rideRequests, setRideRequests] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [showFullAddress, setShowFullAddress] = useState(false);


  useEffect(() => {
    const fetchBookedRides = async () => {
      try {
        const response = await fetch(`${configData.ipv4}:5000/rides/booked-rides`);
        const data = await response.json();
        setBookedRides(data);
        setRideRequests(data.filter(ride => ride.rideStatus === 'Pending'));
        setAcceptedRides(data.filter(ride => ride.status === 'Accepted'));

      } catch (err) {
        console.error('Error fetching booked rides: ', err);
      }
    };

    fetchBookedRides();
  }, []);

  
const lalala =async()=>{
  try {
    const response = await fetch(`${configData.ipv4}:5000/rides/booked-rides`);
    const data = await response.json();
    setBookedRides(data);
    setRideRequests(data.filter(ride => ride.rideStatus === 'Pending'));
    setAcceptedRides(data.filter(ride => ride.status === 'Accepted'));

  } catch (err) {
    console.error('Error fetching booked rides: ', err);
  }

}

  const startRide = () => {
    Alert.alert("Starting the Ride!");
  };

  const [userId, setUserId] = useState('k201730');
  const [driverId, setDriverId] = useState('k200452');
  const [status, setStatus] = useState('Accepted');
  const [rideId, setRideId] = useState('o17BKpLpz58uSAzxmO8F');

  let rideStatusDetails = {
    userId, driverId, status, rideId
  };

  useEffect(() => {
    console.log("Accepted User ID:", rideStatusDetails.userId);
    console.log("Accepted Ride ID:", rideStatusDetails.rideId);
  }, [rideStatusDetails.userId, rideStatusDetails.rideId]);

  

  const rideAcceptedButton = async (item) => {
    const documentId = item.id;
    console.log("Document ID:", documentId);

    try {
      const result = await rideStatusUpdate({
        userId: item.userId,
        driverId: item.driverId,
        rideId: item.rideId,
        status: 'Accepted',
        documentId: documentId
      });

      if (result) {
        Alert.alert("SUCCESS!", "Ride status updated successfully.", [
          { text: "OK", onPress: () => lalala() }  // Refresh data on OK
        ]);
      } else {
        Alert.alert("ERROR!", "Failed to update ride status.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("ERROR!", "An error occurred while updating the ride status.");
    }
  };

  const rideDeclineButton = async (item) => {
    const documentId = item.id;
    console.log("Document ID:", documentId);

    try {
      const result = await rideStatusUpdate({
        userId: item.userId,
        driverId: item.driverId,
        rideId: item.rideId,
        status: 'Declined',
        documentId: documentId
      });

      if (result) {
        Alert.alert("SUCCESS!", "Ride status updated successfully.", [
          { text: "OK", onPress: () => fetchBookedRides() }  // Refresh data on OK
        ]);
      } else {
        Alert.alert("ERROR!", "Failed to update ride status.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("ERROR!", "An error occurred while updating the ride status.");
    }
  };

  // Handler function to toggle address display
  const toggleAddressDisplay = () => {
    setShowFullAddress(!showFullAddress);
  };

  return (
    <LinearGradient colors={['#00897B', '#00695C', '#004D40']} style={styles.container}>
      <Text style={styles.title}>Driver's Ride Requests</Text>
      {acceptedRides.length > 0 && (
        <TouchableOpacity style={styles.startRideButton} onPress={startRide}>
          <Text style={styles.buttonText}>Start Ride</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={rideRequests}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rideDetailCard}>
            <Text style={styles.headerText}>Pending Ride Request</Text>
            {item.destination && item.destination.address && (
              <View>
                <Text style={styles.rideDetailText}>
                  <Ionicons name="location" size={16} color="#009688" /> To: {item.destination.address}
                </Text>
              </View>
            )}
            <Text style={styles.rideDetailText}>
              <Ionicons name="time" size={16} color="#009688" /> Time: {item.hours}:{item.minutes}{item.amPm}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => rideAcceptedButton(item)}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton} onPress={() => rideDeclineButton(item)}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.rideDetailText}>
                <Ionicons name="person" size={16} color="#009688" /> USERID: {item.userId}
              </Text>
              {item.location && item.location.address && (
                <TouchableOpacity onPress={toggleAddressDisplay}>
                  <View>
                    <Text style={styles.rideDetailText}>
                      <Ionicons name="location-sharp" size={16} color="#009688" /> From: {showFullAddress ? item.location.address : `${item.location.address.slice(0, 10)}...`}
                    </Text>
                    {/* Conditionally render a button to toggle address display */}
                    <Text style={styles.toggleButton}>{showFullAddress ? "Show Less" : "Show More"}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      {/* <Text style={[styles.title, { marginTop: 20 }]}>Accepted Rides</Text> */}
      <FlatList
        data={acceptedRides}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rideDetailCard}>
            <Text style={styles.headerText}>Accepted Ride</Text>
            <Text style={styles.rideDetailText}>From: {item.pickUp}</Text>
            <Text style={styles.rideDetailText}>To: {item.dropOff}</Text>
            <Text style={styles.rideDetailText}>Time: {item.time}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rideDetailCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rideDetailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startRideButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  toggleButton: {
    color: '#009688',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default RideStatus;
