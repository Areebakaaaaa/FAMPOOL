// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function HomePage() {
//   const navigation = useNavigation();


//   return (
//     <SafeAreaView style={styles.container}>
//     <LinearGradient
//       colors={['#00BC99', '#009688', '#00796B']} // Adjust the colors to your liking for the gradient
//       style={styles.background}
//       >
//         <View style={styles.content}>
//           <Text style={styles.title}>Welcome to FAMPOOL</Text>
          
//           <View style={styles.menu}>
//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("SearchRide")}>
//               <Ionicons name="search" size={24} color="#4CAF50" />
//               <Text style={styles.menuText}>Search Ride</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PostRide")}>
//               <Ionicons name="car-sport" size={24} color="#4CAF50" />
//               <Text style={styles.menuText}>Post Ride</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
//               <Ionicons name="notifications" size={24} color="#4CAF50" />
//               <Text style={styles.menuText}>Notifications</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("RideStatus")}>
//               <Ionicons name="map" size={24} color="#4CAF50" />
//               <Text style={styles.menuText}>Ride Status</Text>
//             </TouchableOpacity>

//             {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
//               <Ionicons name="notifications" size={24} color="#4CAF50" />
//               <Text style={styles.menuText}>Notifications</Text>
//             </TouchableOpacity>


//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("MapScreen")}>
//               <Ionicons name="map" size={24} color="#4CAF50" />
//               <Text style={styles.menuText}>Map View</Text>
//             </TouchableOpacity> */}
//           </View>

//           <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   menu: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 20,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   menuText: {
//     fontSize: 18,
//     marginLeft: 15,
//     color: '#4CAF50',
//   },
//   logoutButton: {
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 20,
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   logoutText: {
//     fontSize: 18,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
// });


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

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("RideStatus")}>
              <Ionicons name="map" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Ride Status</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notification")}>
              <Ionicons name="notifications" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("MapScreen")}>
              <Ionicons name="map" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Map View</Text>
            </TouchableOpacity> */}
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
    color: '#00987B',
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
    color: '#00987B',
    fontWeight: 'bold',
  },
});


