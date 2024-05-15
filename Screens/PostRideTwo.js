/* import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import haversine from 'haversine';

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

const FAST_COORDINATES = {
  latitude: 24.8568991,
  longitude: 67.2646838,
};

const FAST_NAME = "FAST National University Karachi Campus";

function InputAutocomplete({ label, placeholder, onPlaceSelected }) {
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
          key: "AIzaSyAdzroihH6uXiye_A-1Q8EKa7GTz2Sgdpk",
          language: "en",
          components: "country:pk", // Restrict to Pakistan
          location: "24.8607,67.0011", // Karachi coordinates
          radius: 50000, // 50 km radius from Karachi center
        }}
      />
    </>
  );
}

export default function App() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [routeReady, setRouteReady] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waypointDistances, setWaypointDistances] = useState([]);
  const [waypointDurations, setWaypointDurations] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const mapRef = useRef(null);

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

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
      setRouteCoordinates(args.coordinates);
      setRouteReady(true);
    }
  };

  const traceWaypointRouteOnReady = (args, index) => {
    if (args) {
      const newWaypointDistances = [...waypointDistances];
      const newWaypointDurations = [...waypointDurations];
      newWaypointDistances[index] = args.distance;
      newWaypointDurations[index] = args.duration;
      setWaypointDistances(newWaypointDistances);
      setWaypointDurations(newWaypointDurations);
    }
  };

  const isWithinRoute = (position) => {
    return routeCoordinates.some(coordinate => {
      const start = { latitude: coordinate.latitude, longitude: coordinate.longitude };
      const end = { latitude: position.latitude, longitude: position.longitude };
      const distance = haversine(start, end, { unit: 'meter' });
      return distance < 500; // Example radius within 500 meters of the route
    });
  };

  const onPlaceSelected = (details, flag) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };

    if (flag === "origin") {
      setOrigin(position);
    } else if (flag === "destination") {
      setDestination(position);
    } else {
      if (waypoints.length < 4) {
        if (isWithinRoute(position)) {
          const newWaypoints = [...waypoints, position];
          setWaypoints(newWaypoints);
          setWaypointDistances([...waypointDistances, 0]);
          setWaypointDurations([...waypointDurations, 0]);
        } else {
          alert("Waypoint must be within the route from origin to destination.");
        }
      } else {
        alert("You can add up to 4 waypoints only");
      }
    }

    moveTo(position);
  };

  const setFastAsOrigin = () => {
    setOrigin(FAST_COORDINATES);
    moveTo(FAST_COORDINATES);
  };

  const setFastAsDestination = () => {
    setDestination(FAST_COORDINATES);
    moveTo(FAST_COORDINATES);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {waypoints.map((waypoint, index) => (
          <Marker key={`waypoint-${index}`} coordinate={waypoint} />
        ))}
        {routeReady && origin && destination && (
          <>
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={"AIzaSyAdzroihH6uXiye_A-1Q8EKa7GTz2Sgdpk"}
              strokeColor="#6644ff"
              strokeWidth={4}
              onReady={traceRouteOnReady}
            />
            {waypoints.map((waypoint, index) => (
              <MapViewDirections
                key={`waypoint-direction-${index}`}
                origin={origin}
                destination={waypoint}
                apikey={"AIzaSyAdzroihH6uXiye_A-1Q8EKa7GTz2Sgdpk"}
                strokeColor="#ff4466"
                strokeWidth={2}
                onReady={(args) => traceWaypointRouteOnReady(args, index)}
              />
            ))}
          </>
        )}
      </MapView>
      <View style={styles.searchContainer}>
        {!routeReady ? (
          <>
            <InputAutocomplete
              label="Origin"
              onPlaceSelected={(details) => {
                onPlaceSelected(details, "origin");
              }}
            />
            <InputAutocomplete
              label="Destination"
              onPlaceSelected={(details) => {
                onPlaceSelected(details, "destination");
              }}
            />
            <TouchableOpacity style={styles.button} onPress={setFastAsOrigin}>
              <Text style={styles.buttonText}>Set FAST as Origin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={setFastAsDestination}>
              <Text style={styles.buttonText}>Set FAST as Destination</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { if (origin && destination) setRouteReady(true); }}>
              <Text style={styles.buttonText}>Trace route</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {[...Array(4)].map((_, index) => (
              <InputAutocomplete
                key={`waypoint-${index}`}
                label={`Waypoint ${index + 1}`}
                placeholder={`Add waypoint ${index + 1}`}
                onPlaceSelected={(details) => {
                  onPlaceSelected(details, `waypoint-${index}`);
                }}
              />
            ))}
            {distance && duration ? (
              <View>
                <Text>Distance: {distance.toFixed(2)} km</Text>
                <Text>Duration: {Math.ceil(duration)} min</Text>
              </View>
            ) : null}
            {waypointDistances.map((wpDistance, index) => (
              <View key={`waypoint-distance-${index}`}>
                <Text>Waypoint {index + 1} Distance: {wpDistance.toFixed(2)} km</Text>
                <Text>Waypoint {index + 1} Duration: {Math.ceil(waypointDurations[index])} min</Text>
              </View>
            ))}
          </>
        )}
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
  buttonText: {
    textAlign: "center",
  },
});

 */

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import haversine from 'haversine';
import { Picker } from '@react-native-picker/picker';
import configData from '../services/config';

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

const FAST_COORDINATES = {
  latitude: 24.8568991,
  longitude: 67.2646838,
};

const FAST_NAME = "FAST National University Karachi Campus";

function InputAutocomplete({ label, placeholder, onPlaceSelected }) {
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
          key: "AIzaSyAdzroihH6uXiye_A-1Q8EKa7GTz2Sgdpk",
          language: "en",
          components: "country:pk", // Restrict to Pakistan
          location: "24.8607,67.0011", // Karachi coordinates
          radius: 50000, // 50 km radius from Karachi center
        }}
      />
    </>
  );
}

export default function App() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [routeReady, setRouteReady] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waypointDistances, setWaypointDistances] = useState([]);
  const [waypointDurations, setWaypointDurations] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [toFromFast, setToFromFast]= useState('');
  const mapRef = useRef(null);

  const fastName="FAST National University Karachi Campus";
  const fastAddress="St-4, Sector 17-D، NH 5, Bin Qasim Town, Karachi, Karachi City, Sindh, Pakistan";
  const fastLatitude=24.8568991;
  const fastLongitude=67.2646838;

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

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
      setRouteCoordinates(args.coordinates);
      setRouteReady(true);
    }
  };

  const traceWaypointRouteOnReady = (args, index) => {
    if (args) {
      const newWaypointDistances = [...waypointDistances];
      const newWaypointDurations = [...waypointDurations];
      newWaypointDistances[index] = args.distance;
      newWaypointDurations[index] = args.duration;
      setWaypointDistances(newWaypointDistances);
      setWaypointDurations(newWaypointDurations);
    }
  };

  const isWithinRoute = (position) => {
    return routeCoordinates.some(coordinate => {
      const start = { latitude: coordinate.latitude, longitude: coordinate.longitude };
      const end = { latitude: position.latitude, longitude: position.longitude };
      const distance = haversine(start, end, { unit: 'meter' });
      return distance < 500; // Example radius within 500 meters of the route
    });
  };

  const onPlaceSelected = (details, flag) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      address: details?.formatted_address || '',
      name: details?.name || ''
    };

    if (flag === "From FAST National University Karachi Campus") {
      setOrigin(position);
      console.log("Origin: ", origin);
    } else if (flag === "To FAST National University Karachi Campus") {
      setDestination(position);
      console.log("Origin: ", destination);
    } else {
      if (waypoints.length < 4) {
        if (isWithinRoute(position)) {
          const newWaypoints = [...waypoints, position];
          setWaypoints(newWaypoints);
          setWaypointDistances([...waypointDistances, 0]);
          setWaypointDurations([...waypointDurations, 0]);
        } else {
          alert("Waypoint must be within the route from origin to destination.");
        }
      } else {
        alert("You can add up to 4 waypoints only");
      }
    }

    moveTo(position);
  };

  const setFastAsOrigin = () => {
    /* setOrigin(FAST_COORDINATES);
    moveTo(FAST_COORDINATES); */
    const position = {
      latitude: fastLatitude,
      longitude: fastLongitude,
      address: fastAddress,
      name: fastName,
    };
    setOrigin(position);
    moveTo(position);
  };

  const setFastAsDestination = () => {
    setDestination(FAST_COORDINATES);
    moveTo(FAST_COORDINATES);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {waypoints.map((waypoint, index) => (
          <Marker key={`waypoint-${index}`} coordinate={waypoint} />
        ))}
        {routeReady && origin && destination && (
          <>
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={configData.myApiKey}
              strokeColor="#6644ff"
              strokeWidth={4}
              onReady={traceRouteOnReady}
            />
            {waypoints.map((waypoint, index) => (
              <MapViewDirections
                key={`waypoint-direction-${index}`}
                origin={origin}
                destination={waypoint}
                apikey={configData.myApiKey}
                strokeColor="#ff4466"
                strokeWidth={2}
                onReady={(args) => traceWaypointRouteOnReady(args, index)}
              />
            ))}
          </>
        )}
      </MapView>
      <View style={styles.searchContainer}>
        {!routeReady ? (
          <>
            {/* <InputAutocomplete
              label="Origin"
              onPlaceSelected={(details) => {
                onPlaceSelected(details, "origin");
              }}
            /> */}

          <Picker
            selectedValue={toFromFast}
            onValueChange={setToFromFast}
            style={styles.picker}
          >
            <Picker.Item label="To FAST National University Karachi Campus" value="To FAST National University Karachi Campus" />
            <Picker.Item label="From FAST National University Karachi Campus" value="From FAST National University Karachi Campus" />
          </Picker>


            <InputAutocomplete
              label="Destination"
              onPlaceSelected={(details) => {
                onPlaceSelected(details, "destination");
              }}
            />
            {/* <TouchableOpacity style={styles.button} onPress={setFastAsOrigin}>
              <Text style={styles.buttonText}>Set FAST as Origin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={setFastAsDestination}>
              <Text style={styles.buttonText}>Set FAST as Destination</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={() => { if (origin && destination) setRouteReady(true); }}>
              <Text style={styles.buttonText}>Trace route</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {[...Array(4)].map((_, index) => (
              <InputAutocomplete
                key={`waypoint-${index}`}
                label={`Waypoint ${index + 1}`}
                placeholder={`Add waypoint ${index + 1}`}
                onPlaceSelected={(details) => {
                  onPlaceSelected(details, `waypoint-${index}`);
                }}
              />
            ))}
            {distance && duration ? (
              <View>
                <Text>Distance: {distance.toFixed(2)} km</Text>
                <Text>Duration: {Math.ceil(duration)} min</Text>
              </View>
            ) : null}
            {waypointDistances.map((wpDistance, index) => (
              <View key={`waypoint-distance-${index}`}>
                <Text>Waypoint {index + 1} Distance: {wpDistance.toFixed(2)} km</Text>
                <Text>Waypoint {index + 1} Duration: {Math.ceil(waypointDurations[index])} min</Text>
              </View>
            ))}
          </>
        )}
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
  buttonText: {
    textAlign: "center",
  },
});

