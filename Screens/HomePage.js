// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import MapView from 'react-native-maps';

// export default HomePage = () => {
//     const navigation = useNavigation();

//     return (
//         <View style={styles.layout}>
//             <Text style={styles.heading}>HomePage</Text>

//             <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.goBack()}>
//                 <Text style={styles.buttonText}>Logout</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("AvailableRide")}>
//                 <Text style={styles.buttonText}>Search a Ride</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("PostRide")}>
//                 <Text style={styles.buttonText}>Post a Ride</Text>
//             </TouchableOpacity>
  
//             <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("Notification")}>
//                 <Text style={styles.buttonText}>Notification</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("MapScreen")}>
//                 <Text style={styles.buttonText}>Map Screen</Text>
//             </TouchableOpacity>

// </View>


        
        
//     );
// };

// const styles = StyleSheet.create({
//     layout: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 60,
//     },
//     heading: {
//         fontSize: 50,
//         marginBottom: 20,
//     },
//     buttonBox: {
//         backgroundColor: '#4CAF50', // A green background color for the button box
//         padding: 15,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '80%', // Set the width to 80% of the container
//         borderRadius: 10, // Rounded corners
//         marginTop: 20, // Space between the buttons
//     },
//     buttonText: {
//         fontSize: 18,
//         color: 'white', // White text color for the button text
//         fontWeight: 'bold',
//     },
// });

//Version 2

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// export default function HomePage() {
//   const navigation = useNavigation();

//   return (
//     <ImageBackground 
//       //source={require('./path-to-background-image.jpg')} 
//       resizeMode="cover" 
//       style={styles.background}
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.heading}>FAMPOOL</Text>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("AvailableRide")}>
//             <Ionicons name="search" size={24} color="white" />
//             <Text style={styles.buttonText}>Search a Ride</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("PostRide")}>
//             <Ionicons name="car" size={24} color="white" />
//             <Text style={styles.buttonText}>Post a Ride</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("Notification")}>
//             <Ionicons name="notifications" size={24} color="white" />
//             <Text style={styles.buttonText}>Notifications</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("MapScreen")}>
//             <Ionicons name="map" size={24} color="white" />
//             <Text style={styles.buttonText}>Map Screen</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds an overlay to the background image
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 50,
//     color: 'white',
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   buttonBox: {
//     flexDirection: 'row',
//     backgroundColor: '#4CAF50', // A green background color for the button box
//     padding: 15,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderRadius: 10, // Rounded corners
//     marginTop: 20, // Space between the buttons
//     width: '100%', // Full width
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white', // White text color for the button text
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   logoutButton: {
//     position: 'absolute',
//     bottom: 40,
//   },
//   logoutText: {
//     fontSize: 18,
//     color: 'white', // White text color for the logout text
//     fontWeight: 'bold',
//   },
// });

//Version 3
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
    <LinearGradient
      colors={['#00BC99', '#009688', '#00796B']} // Adjust the colors to your liking for the gradient
      style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to FAMPOOL</Text>
          
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("AvailableRide")}>
              <Ionicons name="search" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Search Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PostRide")}>
              <Ionicons name="car-sport" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Post Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("MapScreen")}>
              <Ionicons name="map" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Map View</Text>
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