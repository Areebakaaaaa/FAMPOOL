import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default HomePage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.layout}>
            <Text style={styles.heading}>HomePage</Text>

            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("AvailableRide")}>
                <Text style={styles.buttonText}>Search a Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("PostRide")}>
                <Text style={styles.buttonText}>Post a Ride</Text>
            </TouchableOpacity>
  
        <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("Notification")}>
        <Text style={styles.buttonText}>Notification</Text>
    </TouchableOpacity>
</View>


        
        
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    heading: {
        fontSize: 50,
        marginBottom: 20,
    },
    buttonBox: {
        backgroundColor: '#4CAF50', // A green background color for the button box
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%', // Set the width to 80% of the container
        borderRadius: 10, // Rounded corners
        marginTop: 20, // Space between the buttons
    },
    buttonText: {
        fontSize: 18,
        color: 'white', // White text color for the button text
        fontWeight: 'bold',
    },
});
