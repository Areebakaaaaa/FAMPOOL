import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import configData from '../services/config';

const AvailableRidesScreen = ({ route }) => {
  const navigation = useNavigation();
  const rideDetails = route.params;

  const [rides, setRides] = useState([]);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRideId, setSelectedRideId] = useState(null);

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

  const handleBooking = (item) => {
    console.log("Booking ride with ID: ", item.id);
    setSelectedUserId(item.userId); // Save the userId
    setSelectedRideId(item.rideId); // Save the rideId
    navigation.navigate("AvailableRideDetails", { ride: item, ...rideDetails });
  };

  const renderAddressText = (address) => {
    return showFullAddress ? address : address.length > 20 ? address.substring(0, 20) + "..." : address;
  };

  const renderRideItem = ({ item }) => (
    <TouchableOpacity style={styles.rideCard} onPress={() => handleBooking(item)}>
      <Text style={styles.rideDetails}>Customer Type: {item.customerType}</Text>
      <Text style={styles.rideLocation}>
        Departure Time: {item.hours}:{item.minutes} {item.amPm}
      </Text>
      <View style={styles.addressContainer}>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>FROM:</Text>
          <Text style={styles.addressText}>{renderAddressText(item.origin.address)}</Text>
        </View>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>TO:</Text>
          <Text style={styles.addressText}>{renderAddressText(item.destination.address)}</Text>
        </View>
      </View>
      {/* <Text style={styles.rideInfo}>Seats: {item.bookedSeats}/{item.seats}</Text> */}
      {/* <View style={styles.genderCountContainer}>
        <Ionicons name="female" size={24} color="#FF00FF" />
        <Text style={styles.genderCount}>1</Text>
        <Ionicons name="male" size={24} color="#0000FF" />
        <Text style={styles.genderCount}>1</Text>
      </View> */}
      <TouchableOpacity style={styles.bookNowButton} onPress={() => handleBooking(item)}>
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#00474B', '#00897B']} style={styles.container}>
       <Text style={styles.heading}>Available Rides</Text>
       <TouchableOpacity style={styles.toggleButton} onPress={() => setShowFullAddress(!showFullAddress)}>
        <Text style={styles.toggleButtonText}>{showFullAddress ? "Show Less" : "Show More"}</Text>
      </TouchableOpacity>
      <FlatList
        data={rides}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRideItem}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  heading: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: 10,
},

  rideDetails: {
    fontSize: 15,
    color: '#FFFFFF', // Change color to white
    marginBottom: 8,
  },
  
  rideCard: {
    backgroundColor: '#00897B',
    marginVertical: 5,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  rideLocation: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  addressBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  addressLabel: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  addressText: {
    color: '#000',
  },
  rideInfo: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  genderCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  genderCount: {
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#FFFFFF',
  },
  bookNowButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  bookNowText: {
    color: '#009688',
    fontSize: 16,
    fontWeight: 'bold',
  },

  toggleButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  toggleButtonText: {
    color: '#009688',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvailableRidesScreen;
