//import React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/layouts';

export default function HomePage() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
    <LinearGradient
      colors={['#00987B', '#009688', '#00796B']} // Adjust the colors to your liking for the gradient
      style={styles.background}>

        <View style={styles.content}>
            {/* */}
            <Image
            source={require('../assets/FAMPOOLLOGO.png')} // Replace '../path/to/your/logo.png' with the actual path to your image
            style={styles.logo} // You can define styles.logo as needed
          />
          <Text style={styles.title}>Welcome to FAMPOOL</Text>

          
          <View style={styles.menu}>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Profile")}>
              {/* </TouchableOpacity><</View>Ionicons name="user" size={24} color="#00987B" /> */}
              <FontAwesome name="user" size={24} color="#00987B" />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("SearchRide")}>
              <Ionicons name="search" size={24} color="#00987B" />
              <Text style={styles.menuText}>Search Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PostRide")}>
              <Ionicons name="car" size={24} color="#00897B" />
              <Text style={styles.menuText}>Post Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications" size={24} color="#00897B" />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("RideStatus")}>
              <Ionicons name="map" size={24} color="#00897B" />
              <Text style={styles.menuText}>Ride Status</Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}




