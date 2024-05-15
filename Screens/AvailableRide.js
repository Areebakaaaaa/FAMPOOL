import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import configData from '../services/config';

const AvailableRidesScreen = ({ route }) => {
  const rideDetails = route.params;
  const navigation = useNavigation();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        console.log("Fetching Rides.");
        const response = await fetch(`${configData.ipv4}:5000/rides/available-rides`);
        const data = await response.json();
        setRides(data);
      } catch (err) {
        console.error('Error fetching rides: ', err);
      }
    };

    fetchRides();
  }, []);

  const hojaPlease = (item) => {
    console.log("Hoja bhaee ma roojaongaaa ab!.", item.id);
    navigation.navigate("AvailableRideDetails", { ride: item, ...rideDetails });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rideCard}>
            <Text style={styles.rideDetails}>
              {item.customerType}
            </Text>
            <Text style={styles.rideLocation}>
              Departure Time: {item.hours}:{item.minutes} {item.amPm}
            </Text>
            <Text style={styles.rideLocation}>
              FROM: {item.origin.name}
            </Text>
            <Text style={styles.rideLocation}>
              TO:- {item.destination.name}
            </Text>
            <Text style={styles.rideInfo}>Seats: {item.bookedSeats}/{item.seats}</Text>
            <View style={styles.genderCountContainer}>
              <Text style={styles.genderCount}>
                <Ionicons name="female" size={16} color="#FF00FF" /> 1
              </Text>
              <Text style={styles.genderCount}>
                <Ionicons name="male" size={16} color="#0000FF" /> 1
              </Text>
            </View>
            <TouchableOpacity style={styles.bookNowButton} onPress={() => hojaPlease(item)}>
              <Text style={styles.bookNowText}>Book now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  rideCard: {
    backgroundColor: '#009688',
    marginVertical: 8,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  rideLocation: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  rideCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800080',
  },
  rideInfo: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  genderCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  genderCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  rideFare: {
    fontSize: 16,
    color: '#4B0082',
    marginBottom: 12,
  },
  bookNowButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookNowText: {
    color: '#009688',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add other styles as needed
});

export default AvailableRidesScreen;