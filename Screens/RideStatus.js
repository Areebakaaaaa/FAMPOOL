import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";


const RideStatus = () => {
    const navigation= useNavigation();

    return( 
        <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#00BC99', '#009688', '#00796B']} // Adjust the colors to your liking for the gradient
          style={styles.background}
          >
            <View style={styles.content}>
          <Text style={styles.title}>Ride Status</Text>
          
        </View>
            
          </LinearGradient>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 40,
    },
    menu: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
      paddingVertical: 30,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    menuText: {
      fontSize: 18,
      marginLeft: 15,
      color: '#4CAF50',
    },
    logoutButton: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 30,
    },
    logoutText: {
      fontSize: 18,
      color: '#4CAF50',
      fontWeight: 'bold',
    },
  });



export default RideStatus;