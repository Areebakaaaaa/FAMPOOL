import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.notificationCard}>
          <View style={styles.rideInfo}>
            <Text style={styles.rideCode}>KX01732</Text>
            <Text style={styles.rideVehicle}>White Vitz (2018) AAB-087</Text>
            <Text style={styles.rideTime}>Departure Time: 2:15 PM</Text>
            <Text style={styles.ridePrice}>PKR 300, Cash</Text>
          </View>
          <View style={styles.rideActions}>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.buttonText}>REJECT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>ACCEPT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Yesterday</Text>
        {/* Render a list of past notifications here */}
        {/* Example of a single past notification */}
        <View style={styles.pastNotificationCard}>
          <Text style={styles.pastNotificationTitle}>Payment confirm</Text>
          <Text style={styles.pastNotificationText}>Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae</Text>
          <Text style={styles.pastNotificationTime}>15 min ago.</Text>
        </View>
        {/* Repeat the above component for other past notifications */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  scrollView: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  notificationCard: {
    backgroundColor: '#90ee90',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  rideInfo: {
    marginBottom: 10,
  },
  rideCode: {
    fontWeight: 'bold',
  },
  rideVehicle: {
    fontSize: 16,
    color: 'grey',
  },
  rideTime: {
    fontSize: 16,
    color: 'grey',
  },
  ridePrice: {
    fontSize: 16,
    color: 'grey',
  },
  rideActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pastNotificationCard: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  pastNotificationTitle: {
    fontWeight: 'bold',
  },
  pastNotificationText: {
    color: 'grey',
  },
  pastNotificationTime: {
    color: 'grey',
    fontSize: 12,
    marginTop: 10,
  },
  // Additional styles can be added here
});

export default NotificationScreen;
