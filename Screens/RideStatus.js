// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from "@react-navigation/native";


// const RideStatus = () => {
//     const navigation= useNavigation();

//     return( 
//         <SafeAreaView style={styles.container}>
//         <LinearGradient
//           colors={['#00BC99', '#009688', '#00796B']} // Adjust the colors to your liking for the gradient
//           style={styles.background}
//           >
//             <View style={styles.content}>
//           <Text style={styles.title}>Ride Status</Text>
          
//         </View>
            
//           </LinearGradient>
//         </SafeAreaView>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     background: {
//       flex: 1,
//     },
//     content: {
//       flex: 1,
//       paddingHorizontal: 20,
//       justifyContent: 'center',
//     },
//     title: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       color: 'white',
//       textAlign: 'center',
//       marginBottom: 40,
//     },
//     menu: {
//       backgroundColor: 'rgba(255, 255, 255, 0.9)',
//       borderRadius: 20,
//       paddingVertical: 30,
//       paddingHorizontal: 20,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.3,
//       shadowRadius: 5,
//     },
//     menuItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingVertical: 10,
//     },
//     menuText: {
//       fontSize: 18,
//       marginLeft: 15,
//       color: '#4CAF50',
//     },
//     logoutButton: {
//       backgroundColor: 'white',
//       padding: 15,
//       borderRadius: 20,
//       alignItems: 'center',
//       marginTop: 30,
//     },
//     logoutText: {
//       fontSize: 18,
//       color: '#4CAF50',
//       fontWeight: 'bold',
//     },
//   });



// export default RideStatus;

//User's Perspective
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure expo-linear-gradient is installed
import { useNavigation } from '@react-navigation/native';
import { bookingRide } from '../services/fampoolAPIs';

const RideStatus = ({ route }) => {
    const navigation = useNavigation();

    const [fare, setFare] = useState('');
    const [userId] = useState('k201732');
    const [driverId] = useState('k201609');
    const [pickUp] = useState('Home North Nazimabad');
    const [dropOff] = useState('Fast Nu');
   // const [rideStatus, setRideStatus] = useState('');
    const [aaa, setAAA] = useState('');

    let bookRideDetails = {
        userId, driverId, aaa, pickUp, dropOff, 
    };

    useEffect(() => {
        // Fetch ride data logic should go here
    }, []);

    const pendingBooking = async () => {
        try {
            const result = await bookingRide(bookRideDetails);
            // if (result) {
            //     Alert.alert("Booking Confirmation", "Ride Booked!", [{ text: "OK", onPress: () => navigation.navigate('RideStatus') }]);
            // } else {
            //     Alert.alert("ERROR! RIDE BOOKING FAILED");
            // }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <LinearGradient colors={['#00897B', '#00897B', '#00897B']} style={styles.container}>
            <Text style={styles.title}>Ride Status</Text>
            

            <View style={styles.rideDetailCard}>
                <Text style={styles.headerText}>Ride Details</Text>
                <Text style={styles.rideDetailText}>From: {pickUp}</Text>
                <Text style={styles.rideDetailText}>To: {dropOff}</Text>
                <Text style={styles.rideDetailText}>Fare: Rs. {fare.length > 0 ? fare[fare.length - 1].fareShare.toFixed(2) : 'Calculating...'}</Text>
                <TouchableOpacity style={styles.pendingButton} onPress={pendingBooking}>
                    <Text style={styles.pendingButtonText}>Pending Booking</Text>
                </TouchableOpacity>
            </View>
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

