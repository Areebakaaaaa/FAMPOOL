import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/layouts';

export default function HomePage() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
    <LinearGradient
      colors={['#00987B', '#009688', '#00796B']} // Adjust the colors to your liking for the gradient
      style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to FAMPOOL</Text>
          
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("SearchRide")}>
              <Ionicons name="search" size={24} color="#00987B" />
              <Text style={styles.menuText}>Search Ride</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PostRide")}>
              <Ionicons name="car-sport" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Post Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Chatbot")}>
              <Ionicons name="car-sport" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Chatbot</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("RideStatus")}>
              <Ionicons name="map" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Ride Status</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PostRideTwo")}>
              <Ionicons name="PostRideTwo" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>PostRideTwo</Text>
            </TouchableOpacity>


            {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>*/


            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("MapScreen")}>
              <Ionicons name="map" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Map View</Text>
            </TouchableOpacity> }
            
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}




