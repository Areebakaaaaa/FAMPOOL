// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from "expo-location"

// export default MapScreen = () => {
//   const navigation = useNavigation();

//   const [currentLocation, setCurrentLocation] = useState('');
//   const [markerPosition, setMarkerPosition] = useState('');

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation(location);
//       setMarkerPosition({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });
//       console.log("Location: ", location);
//     })();
//   }, []);

//   const handleMarkerDragEnd = (e) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     setMarkerPosition({ latitude, longitude });
//     console.log("Marker Position: ", currentLocation);
//   };

//   return (
//     <View style={styles.container}>
//       {currentLocation && (
//         <MapView
//           style={styles.map}
//           provider={MapView.PROVIDER_GOOGLE}
//           initialRegion={{
//             latitude: currentLocation.coords.latitude,
//             longitude: currentLocation.coords.longitude,
//             latitudeDelta: 0.005,
//             longitudeDelta: 0.005,
//           }}
//         >
//           {markerPosition && (
//             <Marker
//               coordinate={markerPosition}
//               draggable
//               onDragEnd={handleMarkerDragEnd}
//             />
//           )}
//         </MapView>
//       )}

//       {currentLocation && (
//         <View style={styles.bottomButtonContainer}>
//           <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("SearchRideDetails")}>
//             <Text style={styles.buttonText}>Search a Ride</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     flex: 1,
//     alignSelf: 'stretch',
//   },
//   bottomButtonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   buttonBox: {
//     backgroundColor: '#4CAF50',
//     padding: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '80%',
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

//Version with back button
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location"

export default MapScreen = () => {
  const navigation = useNavigation();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setMarkerPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log("Location: ", location);
    })();
  }, []);

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    console.log("Marker Position: ", markerPosition);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {currentLocation ? (
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}

      {currentLocation && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("SearchRideDetails")}>
            <Text style={styles.buttonText}>Search a Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonBox: {
    backgroundColor: '#4CAF50',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  // ...rest of your styles
});
