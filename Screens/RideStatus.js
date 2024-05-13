//User's Perspective
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure expo-linear-gradient is installed
import { useNavigation } from '@react-navigation/native';
import ipv4 from '../services/config';
import styles from '../styles/userRideStatus';

const RideStatus = ({ route }) => {
  const navigation= useNavigation();

    const [bookedRides, setBookedRides]=useState([]);

    useEffect(()=>{
      const fetchBookedRides = async () =>{
        try{
          const response = await fetch(`${ipv4}:5000/rides/booked-rides`);
          const data = await response.json();
          setBookedRides(data);

        }catch(err){
          console.error('Error fetching bookes rides: ',err);
        }
      
      }

      fetchBookedRides();
    }, [])
    
    return (
        <LinearGradient colors={['#00897B', '#00897B', '#00897B']} style={styles.container}>
            <Text style={styles.title}>Ride Status</Text>
            

            <FlatList
            data={bookedRides}
            keyExtractor={item => item.id.toString()} // Make sure to convert the ID to string if it's not already
            renderItem={({item})=>(
              <View style={styles.rideDetailCard}>
              <Text style={styles.headerText}>Ride Details</Text>
              <Text style={styles.rideDetailText}>From: {item.pickUp}</Text>
              <Text style={styles.rideDetailText}>To: {item.dropOff}</Text>
              <Text style={styles.rideDetailText}>Fare: Rs. {item.fare}</Text>
              <TouchableOpacity style={styles.pendingButton} >
                  <Text style={styles.pendingButtonText}>Pending Booking</Text>
              </TouchableOpacity>
          </View>
            )}
              
            />
        </LinearGradient>
    );
};

export default RideStatus;