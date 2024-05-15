/* 
//Driver's Perspective
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ipv4 from '../services/config';

const RideStatus = ({ route }) => {
    const navigation = useNavigation();
    const [rideRequests, setRideRequests] = useState([]);
    const [acceptedRides, setAcceptedRides] = useState([]);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await fetch(`${ipv4}:5000/rides/fetch-rides`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Received non-JSON response");
            }
            const data = await response.json();
            setRideRequests(data.filter(ride => ride.status === 'pending'));
            setAcceptedRides(data.filter(ride => ride.status === 'accepted'));
        } catch (err) {
            console.error('Error fetching rides: ', err);
            Alert.alert("Error", `Failed to fetch ride requests: ${err.message}`);
        }
    };

    const handleAccept = async (ride) => {
        if (await updateRideStatus(ride.id, 'accepted')) {
            setAcceptedRides(prev => [...prev, { ...ride, status: 'accepted' }]);
            setRideRequests(prev => prev.filter(item => item.id !== ride.id));
        }
    };

    const handleReject = async (id) => {
        if (await updateRideStatus(id, 'rejected')) {
            setRideRequests(prev => prev.filter(item => item.id !== id));
        }
    };

    const updateRideStatus = async (id, status) => {
        try {
            const response = await fetch(`${ipv4}:5000/rides/update-status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.message);
            }
            return result.success;
        } catch (err) {
            console.error(`Error updating ride status: ${id}`, err);
            Alert.alert("Update Failed", err.message);
            return false;
        }
    };

    const startRide = () => {
        Alert.alert("Start Ride", "Are you sure you want to start the ride?", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => console.log("Ride Started!") }
        ]);
    };

    return (
        <LinearGradient colors={['#00897B', '#00695C', '#004D40']} style={styles.container}>
            <Text style={styles.title}>Driver's Ride Requests</Text>
            {acceptedRides.length > 0 && (
                <TouchableOpacity style={styles.startRideButton} onPress={startRide}>
                    <Text style={styles.buttonText}>Start Ride</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={rideRequests}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.rideDetailCard}>
                        <Text style={styles.headerText}>Pending Ride Request</Text>
                        <Text style={styles.rideDetailText}>From: {item.pickUp}</Text>
                        <Text style={styles.rideDetailText}>To: {item.dropOff}</Text>
                        <Text style={styles.rideDetailText}>Time: {item.time}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item)}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(item.id)}>
                                <Text style={styles.buttonText}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Text style={[styles.title, { marginTop: 20 }]}>Accepted Rides</Text>
            <FlatList
                data={acceptedRides}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.rideDetailCard}>
                        <Text style={styles.headerText}>Accepted Ride</Text>
                        <Text style={styles.rideDetailText}>From: {item.pickUp}</Text>
                        <Text style={styles.rideDetailText}>To: {item.dropOff}</Text>
                        <Text style={styles.rideDetailText}>Time: {item.time}</Text>
                    </View>
                )}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    rideDetailCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rideDetailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    rejectButton: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    startRideButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default RideStatus;




//BELOW
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient'; // Make sure expo-linear-gradient is installed
// import { useNavigation } from '@react-navigation/native';
// import ipv4 from '../services/config';
// //import styles from '../styles/userRideStatus';

// const RideStatus = ({ route }) => {
//   const navigation= useNavigation();

//    const [bookedRides, setBookedRides]=useState([]);
//    const [rideRequests, setRideRequests] = useState([]);
//    const [acceptedRides, setAcceptedRides] = useState([]);

//     useEffect(()=>{
//       const fetchBookedRides = async () =>{
//         try{
//           const response = await fetch(`${ipv4}:5000/rides/booked-rides`);
//           const data = await response.json();
//           setBookedRides(data);

//         }catch(err){
//           console.error('Error fetching bookes rides: ',err);
//         }
      
//       }

//       fetchBookedRides();
//     }, [])

//     const handleAccept = (ride) => {
//       setAcceptedRides([...acceptedRides, { ...ride, status: 'accepted' }]);
//       setRideRequests(rideRequests.filter(item => item.id !== ride.id));
//       updateRideStatus(ride.id, 'accepted');
//   };

//   const handleReject = (id) => {
//       updateRideStatus(id, 'rejected');
//       setRideRequests(rideRequests.filter(item => item.id !== id));
//   };

//   const updateRideStatus = (id, status) => {
//     console.log(`Ride ${id} ${status}.`);
//     // Call backend to update the status of the ride
// };

// const startRide = () => {
//   Alert.alert("Starting the Ride!");
// };

    
// return (
//   <LinearGradient colors={['#00897B', '#00695C', '#004D40']} style={styles.container}>
//       <Text style={styles.title}>Driver's Ride Requests</Text>
//       {acceptedRides.length > 0 && (
//           <TouchableOpacity style={styles.startRideButton} onPress={startRide}>
//               <Text style={styles.buttonText}>Start Ride</Text>
//           </TouchableOpacity>
//       )}
//       <FlatList
//           data={rideRequests}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({ item }) => (
//               <View style={styles.rideDetailCard}>
//                   <Text style={styles.headerText}>Pending Ride Request</Text>
//                   <Text style={styles.rideDetailText}>From: {item.pickUp}</Text>
//                   <Text style={styles.rideDetailText}>To: {item.dropOff}</Text>
//                   <Text style={styles.rideDetailText}>Time: {item.time}</Text>
//                   <View style={styles.buttonContainer}>
//                       <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item)}>
//                           <Text style={styles.buttonText}>Accept</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(item.id)}>
//                           <Text style={styles.buttonText}>Reject</Text>
//                       </TouchableOpacity>
//                   </View>
//               </View>
//           )}
//       />
//       <Text style={[styles.title, { marginTop: 20 }]}>Accepted Rides</Text>
//       <FlatList
//           data={acceptedRides}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({ item }) => (
//               <View style={styles.rideDetailCard}>
//                   <Text style={styles.headerText}>Accepted Ride</Text>
//                   <Text style={styles.rideDetailText}>From: {item.pickUp}</Text>
//                   <Text style={styles.rideDetailText}>To: {item.dropOff}</Text>
//                   <Text style={styles.rideDetailText}>Time: {item.time}</Text>
//               </View>
//           )}
//       />
//   </LinearGradient>
// );
// };

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: 10,
// },
// title: {
//   fontSize: 24,
//   fontWeight: 'bold',
//   color: 'white',
// },
// rideDetailCard: {
//   backgroundColor: 'white',
//   borderRadius: 10,
//   padding: 20,
//   marginBottom: 10,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.3,
//   elevation: 5,
// },
// headerText: {
//   fontSize: 20,
//   fontWeight: 'bold',
//   marginBottom: 10,
// },
// rideDetailText: {
//   fontSize: 16,
//   marginBottom: 5,
// },
// buttonContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-around',
// },
// acceptButton: {
//   backgroundColor: '#4CAF50',
//   padding: 10,
//   borderRadius: 5,
// },
// rejectButton: {
//   backgroundColor: '#F44336',
//   padding: 10,
//   borderRadius: 5,
// },
// buttonText: {
//   color: 'white',
//   fontSize: 16,
//   fontWeight: 'bold',
// },
// startRideButton: {
//   backgroundColor: '#4CAF50',
//   padding: 15,
//   borderRadius: 8,
//   marginBottom: 10,
// },
// });


export default RideStatus; */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure expo-linear-gradient is installed
import { useNavigation } from '@react-navigation/native';
import configData from '../services/config';
import {rideStatusUpdate} from '../services/fampoolAPIs';
//import styles from '../styles/userRideStatus';

const RideStatus = ({ route }) => {
  const navigation= useNavigation();

   const [bookedRides, setBookedRides]=useState([]);
   const [rideRequests, setRideRequests] = useState([]);
   const [acceptedRides, setAcceptedRides] = useState([]);

    useEffect(()=>{
      const fetchBookedRides = async () =>{
        try{
          const response = await fetch(`${configData.ipv4}:5000/rides/booked-rides`);
          const data = await response.json();
          setBookedRides(data);

        }catch(err){
          console.error('Error fetching bookes rides: ',err);
        }
      
      }

      fetchBookedRides();
    }, [])

    const handleAccept = (ride) => {
      setAcceptedRides([...acceptedRides, { ...ride, status: 'accepted' }]);
      setRideRequests(rideRequests.filter(item => item.id !== ride.id));
      updateRideStatus(ride.id, 'accepted');
  };

  const handleReject = (id) => {
      updateRideStatus(id, 'rejected');
      setRideRequests(rideRequests.filter(item => item.id !== id));
  };

  const updateRideStatus = (id, status) => {
    console.log(`Ride ${id} ${status}.`);
    // Call backend to update the status of the ride
};

const startRide = () => {
  Alert.alert("Starting the Ride!");
};

const [userId, setUserId] = useState('k201730');
const [driverId, setDriverId] = useState('k200452');
const [status, setStatus] = useState('Accepted');
const [rideId, setRideId] = useState('o17BKpLpz58uSAzxmO8F');

let rideStatusDetails={
    userId, driverId, status, rideId
}

useEffect(() => {
    console.log("Accepted User ID:", rideStatusDetails.userId);
    console.log("Accepted Ride ID:", rideStatusDetails.rideId);
}, [rideStatusDetails.userId, rideStatusDetails.rideId]);

const rideAcceptedButton = async (item) => {
    // Access the document ID directly from the item
    const documentId = item.id;
    console.log("Document ID:", documentId); // Logging the document ID for confirmation

    try {
        const result = await rideStatusUpdate({
            userId: item.userId,
            driverId: item.driverId,
            rideId: item.rideId,
            status: 'Accepted',
            documentId: documentId  // Using the document ID in the API call
        });

        if(result) {
            Alert.alert("SUCCESS!", "Ride status updated successfully.");
        } else {
            Alert.alert("ERROR!", "Failed to update ride status.");
        }
    } catch (err) {
        console.error(err);
        Alert.alert("ERROR!", "An error occurred while updating the ride status.");
    }
};

const rideDeclineButton = async (item) => {
    // Access the document ID directly from the item
    const documentId = item.id;
    console.log("Document ID:", documentId); // Logging the document ID for confirmation

    try {
        const result = await rideStatusUpdate({
            userId: item.userId,
            driverId: item.driverId,
            rideId: item.rideId,
            status: 'Declined',
            documentId: documentId  // Using the document ID in the API call
        });

        if(result) {
            Alert.alert("SUCCESS!", "Ride status updated successfully.");
        } else {
            Alert.alert("ERROR!", "Failed to update ride status.");
        }
    } catch (err) {
        console.error(err);
        Alert.alert("ERROR!", "An error occurred while updating the ride status.");
    }
};
  
 
return (
  <LinearGradient colors={['#00897B', '#00695C', '#004D40']} style={styles.container}>
      <Text style={styles.title}>Driver's Ride Requests</Text>
      {acceptedRides.length > 0 && (
          <TouchableOpacity style={styles.startRideButton} onPress={startRide}>
              <Text style={styles.buttonText}>Start Ride</Text>
          </TouchableOpacity>
      )}
      <FlatList
          data={bookedRides}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
              <View style={styles.rideDetailCard}>
                  <Text style={styles.headerText}>Pending Ride Request</Text>
                  
                  
                  <Text style={styles.rideDetailText}>To: {item.destination.address}</Text>
                  <Text style={styles.rideDetailText}>Time: {item.hours}:{item.minutes}/{item.amPm}</Text>
                  <View style={styles.buttonContainer}>
                      {/* <TouchableOpacity style={styles.acceptButton} onPress={(rideAcceptedButton) => handleAccept(item)}>
                          <Text style={styles.buttonText}>Accept</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity style={styles.acceptButton} onPress={() => rideAcceptedButton(item)}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>

                      <TouchableOpacity style={styles.rejectButton} onPress={() => rideDeclineButton(item)}>
                          <Text style={styles.buttonText}>Decline</Text>
                      </TouchableOpacity>
                  </View>

                  <View>
                  <Text style={styles.rideDetailText}>USERID: {item.userId}</Text>
                  <Text style={styles.rideDetailText}>From: {item.location.address}</Text>

                  </View>
              </View>
          )}
      />
      <Text style={[styles.title, { marginTop: 20 }]}>Accepted Rides</Text>
      <FlatList
          data={acceptedRides}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
              <View style={styles.rideDetailCard}>
                  <Text style={styles.headerText}>Accepted Ride</Text>
                  <Text style={styles.rideDetailText}>From: {item.pickUp}</Text>
                  <Text style={styles.rideDetailText}>To: {item.dropOff}</Text>
                  <Text style={styles.rideDetailText}>Time: {item.time}</Text>
              </View>

              
          )}
      />
  </LinearGradient>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
},
rideDetailCard: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  elevation: 5,
},
headerText: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
rideDetailText: {
  fontSize: 16,
  marginBottom: 5,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
},
acceptButton: {
  backgroundColor: '#4CAF50',
  padding: 10,
  borderRadius: 5,
},
rejectButton: {
  backgroundColor: '#F44336',
  padding: 10,
  borderRadius: 5,
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
startRideButton: {
  backgroundColor: '#4CAF50',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
},
});


export default RideStatus;