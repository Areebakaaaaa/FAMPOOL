// import React from "react";
// import {View, Text, Button} from 'react-native';
// import { StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default AvailableRide = () =>
// {
//     const navigation = useNavigation();

//     const fortest = () =>
//     {
//         navigation.navigate("HomePage");
//     }

//     return(
//         <View style={styles.layout}>

//             <View>
//                 <Text>This is Available Ride page.</Text>
//             </View>

//             <View style={styles.button_layout}>
//                 <Button style={styles.button_detail} title="Go Back" onPress={fortest} />
//             </View>

//         </View>
//     )
// }

// const styles = StyleSheet.create
// ({
//     layout:{
//         marginTop: 60,

//     },
//     button_layout: {
//         marginTop: 20,
//         marginLeft: 10,
//         marginRight: 10,
//     },
//     button_detail:{
//         borderBottomStartRadius: 10,

//     }
// })


//Version 2

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo icons or replace with your own

const AvailableRidesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={25} color="grey" />
        <TextInput
          placeholder="Where would you go?"
          style={styles.searchInput}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.rideCard}>
          <View style={styles.rideDetails}>
            <Text style={styles.rideCode}>K201732</Text>
            <Text style={styles.rideInfo}>White Vitz (2018) AAB-017</Text>
            <Text style={styles.rideTiming}>Leaving At: 2:15 PM</Text>
          </View>
          <View style={styles.rideStats}>
            <View style={styles.acIndicator}>
              <Text style={styles.acText}>AC</Text>
            </View>
            <View style={styles.seatsIndicator}>
              <Text style={styles.seatsText}>Seats: 2/4</Text>
              <Text style={styles.seatsText}>1 Male 1 Female</Text>
            </View>
            <View style={styles.priceIndicator}>
              <Text style={styles.priceText}>PKR 300, Cash</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book now</Text>
          </TouchableOpacity>
        </View>
        {/* More ride cards can be added here */}
      </ScrollView>
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
  // Additional styles can be added here
});

export default AvailableRidesScreen;
