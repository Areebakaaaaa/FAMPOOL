import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AvailableRidesScreen = () => {
  const navigation = useNavigation();
  const [rides, setRides] = useState([]);
  const ipv4='http://192.168.100.14';

  useEffect(()=>{
    const fetchRides = async () => {
      try{
        console.log("Fetching Rides.");
        const response = await fetch(`${ipv4}:5000/users/available-rides`);
        const data = await response.json();
        setRides(data);
      } catch(err){
        console.error('Error fetching rides: ', err);
      }
    };

    fetchRides();
  }, []);

  const hojaPlease = (item) => {
    console.log("Hoja bhaee ma roojaongaaa ab!.");
    navigation.navigate("Abc", {ride: item});
  }

  return (
    <View style={styles.container}>
        <FlatList
        data={rides}
        keyExtractor={item=>item.id}
        renderItem={({ item }) => (
          <View style={styles.rideCard}>
            <TouchableOpacity style={styles.rideCard} onPress={()=> hojaPlease(item)}>
              <Text style={styles.rideDetails}>
                {item.customerType} - {item.toFromFast} - {item.toFromLocation}
              </Text>
              <Text style={styles.rideDetails}>
                {item.seats}/4 seats 
              </Text>
              <Text style={styles.rideDetails}>
                Departure Time - {item.departureTime} 
              </Text>
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
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    margin: 40,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    padding: 15,
  },
  scrollView: {
    flex: 1,
  },
  rideCard: {
    backgroundColor: '#90ee90',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  rideDetails: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rideCode: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rideInfo: {
    fontSize: 14,
  },
  rideTiming: {
    fontSize: 14,
    color: 'grey',
  },
  rideStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  acIndicator: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
  },
  seatsIndicator: {
    backgroundColor: 'lightpink',
    padding: 5,
    borderRadius: 5,
  },
  priceIndicator: {
    backgroundColor: 'lightyellow',
    padding: 5,
    borderRadius: 5,
  },
  acText: {},
  seatsText: {},
  priceText: {},
  bookNowButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bookNowText: {
    color: 'white',
  },
});

export default AvailableRidesScreen;
