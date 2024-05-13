//User's Perspective
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure expo-linear-gradient is installed
import { useNavigation } from '@react-navigation/native';
import ipv4 from '../services/config';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    status: {
        fontSize: 20,
        color: '#FFD700', // Gold color for status to make it pop
        marginBottom: 20,
    },
    rideDetailCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 5,
        width: '90%',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    rideDetailText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#666',
    },
    pendingButton: {
        backgroundColor: '#00897B', // A teal shade
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        color: '#666',
    },
    pendingButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RideStatus;