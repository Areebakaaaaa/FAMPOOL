import React, { useRef, useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import configData from '../services/config';
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { postingRide } from "../services/fampoolAPIs";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_POSITION = {
  latitude: 24.8733,
  longitude: 67.0336,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

function InputAutocomplete({ label, placeholder, onPlaceSelected }) {
  // Set the location to Karachi coordinates and radius to cover the city
  const karachiLocation = '24.8600,67.0011'; // Karachi coordinates
  const radius = '10000'; // 10km radius

  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: configData.myApiKey,
          language: "en",
          location: karachiLocation, // Restrict results to Karachi
          radius: radius, // Define radius to cover Karachi area
        }}
      />
    </>
  );
}

const PostRideTwo = ({ route }) => {
  const postRideDetails = route.params;
  const navigation = useNavigation();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [location, setLocation] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waypoints, setWaypoints] = useState([]);
  const mapRef = useRef(null);

  const [toFromFast, setToFromFast]= useState('TO FAST-NUCES Main Campus');

  const fastName="FAST National University Karachi Campus";
  const fastAddress="St-4, Sector 17-D، NH 5, Bin Qasim Town, Karachi, Karachi City, Sindh, Pakistan";
  const fastLatitude=24.8568991;
  const fastLongitude=67.2646838;


  let postRideDetailsTwo={
    driverId: postRideDetails.driverId, 
    customerType: postRideDetails.customerType, 
    hours: postRideDetails.hours, 
    minutes: postRideDetails.minutes, 
    amPm: postRideDetails.amPm, 
    date: postRideDetails.date, 
    seats: postRideDetails.seats,
    origin, destination, distance, duration, waypoints,
  }
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  useEffect(() => {
    if (showDirections && origin && destination) {
      mapRef.current?.fitToCoordinates([origin, destination, ...waypoints], { edgePadding });
    }
  }, [showDirections, origin, destination, waypoints]);

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
      console.log("Origin-Destination distance:", args.distance);
      if (args.waypoints) {
        waypoints.forEach((waypoint, index) => {
          console.log(`Waypoint ${index + 1} name:`, waypoint?.name);
        });
      }
    }
  };

  const traceRoute = () => {
    let updatedOrigin, updatedDestination;
    
    if (toFromFast === "TO FAST-NUCES Main Campus") {
      updatedDestination = {
        latitude: fastLatitude,
        longitude: fastLongitude,
        address: fastAddress,
        name: fastName,
      };
      updatedOrigin = location;
    } else {
      updatedOrigin = {
        latitude: fastLatitude,
        longitude: fastLongitude,
        address: fastAddress,
        name: fastName,
      };
      updatedDestination = location;
    }
  
    // Update state with the new origin and destination
    setOrigin(updatedOrigin);
    setDestination(updatedDestination);
  
    // Ensure state updates are complete before proceeding
    setTimeout(() => {
      if (origin && destination) {
        setShowDirections(true);
        mapRef.current?.fitToCoordinates([updatedOrigin, updatedDestination, ...waypoints], { edgePadding });
        console.log("Updated Origin:", updatedOrigin.name);
        console.log("Updated Destination:", updatedDestination.name);
      }
    }, 100); // Adjust timeout as needed
  };

  const onPlaceSelected = (
    details,
    flag
  ) => {
    const set = flag === "origin" ? setOrigin : setLocation;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      address: details?.formatted_address || '',
      name: details?.name || ''
    };
    set(position);
    moveTo(position);
  };

  const addWaypoint = () => {
    if (waypoints.length < 4) {
      setWaypoints([...waypoints, { name: '' }]); // Initialize with an empty object
    }
  };

  const removeWaypoint = (index) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints.splice(index, 1);
    setWaypoints(updatedWaypoints);
  };

  const updateWaypoint = (details, index) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      address: details?.formatted_address || '',
      name: details?.name || ''
    };
    setWaypoints(updatedWaypoints);
  };

  /* const postRide = () => {
    console.log('Ride posted...');
    console.log('Customer Type is', postRideDetails.customerType);
    console.log('Am-Pm: ', postRideDetails.amPm);
    console.log('Fast NUCES Name: ', destination?.name);
    console.log('Fast NUCES Address: ', destination?.address);
    console.log('Fast NUCES lat: ', destination.latitude);
    console.log('Fast NUCES long: ', destination.longitude);
    waypoints.forEach((waypoint, index) => {
      console.log(`Waypoint ${index + 1}:`);
      console.log("Name:", waypoint.name);
      console.log("Address:", waypoint.address);
      console.log("Latitude:", waypoint.latitude);
      console.log("Longitude:", waypoint.longitude);
    });
  }; */

  const postRide = async () => {
    console.log('Ride posted...');
    console.log(postRideDetailsTwo.waypoints);
    
    try{
      const result = await postingRide(postRideDetailsTwo);

      if(result)
      {
        Alert.alert("SUCCESS!, Ride Posted Successfully!.");
        navigation.navigate("HomePage");
      }
      else
      {
        Alert.alert("ERROR!, Ride Posting Failed!")
      }


    }catch (err)
    {
      console.error(err);
    }
  };
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} pinColor="green" />}
        {destination && <Marker coordinate={destination} pinColor="red" />}
        {waypoints.map((waypoint, index) => (
          waypoint.latitude && waypoint.longitude && (
            <Marker key={index} coordinate={waypoint} pinColor="blue" />
          )
        ))}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            waypoints={waypoints}
            apikey={configData.myApiKey}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <Picker
            selectedValue={toFromFast}
            onValueChange={setToFromFast}
            style={styles.picker}
          >
            <Picker.Item label="TO FAST-NUCES Main Campus" value="TO FAST-NUCES Main Campus" />
            <Picker.Item label="FROM FAST-NUCES Main Campus" value="FROM FAST-NUCES Main Campus" />
          </Picker>


        <TouchableOpacity style={styles.button} onPress={addWaypoint}>
          <Text style={styles.buttonText}>Add Waypoint</Text>
        </TouchableOpacity>
        {waypoints.map((waypoint, index) => (
          <View key={index} style={styles.waypointContainer}>
            <InputAutocomplete
              label={`Waypoint ${index + 1}`}
              onPlaceSelected={(details) => {
                updateWaypoint(details, index);
              }}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeWaypoint(index)}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        ))}
        <InputAutocomplete
          placeholder="Location"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity>
        {(distance !== 0 || duration !== 0) && (
          <View>
            <Text>Distance: {distance.toFixed(2)} km</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={postRide}>
          <Text style={styles.buttonText}>Post Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  removeButton: {
    backgroundColor: "#bbb",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
    alignSelf: "flex-end",
  },
  waypointContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
  },
});

export default PostRideTwo;
