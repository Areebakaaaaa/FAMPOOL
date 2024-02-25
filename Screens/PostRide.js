// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const RideSharingApp = () => {
//   const [gender, setGender] = useState('Male'); // Default value set to Male
//   const [acType, setAcType] = useState('AC'); // Default value set to AC
//   const [toFromFast, setToFromFast] = useState('TO FAST'); // Default value set to TO FAST
//   const [time, setTime] = useState('');
//   const [date, setDate] = useState('');

//   const searchRides = () => {
//     console.log('Searching for rides...');
//     console.log({ gender, acType, toFromFast, time, date });
//     // Perform the search logic here
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => { /* go back action */ }}>
//         <Text>Back</Text>
//       </TouchableOpacity>
      
//       <Picker
//         selectedValue={gender}
//         onValueChange={(itemValue) => setGender(itemValue)}
//         style={styles.picker}>
//         <Picker.Item label="Male" value="Male" />
//         <Picker.Item label="Female" value="Female" />
//         <Picker.Item label="Faculty" value="Faculty" />
//       </Picker>

//       <Picker
//         selectedValue={acType}
//         onValueChange={(itemValue) => setAcType(itemValue)}
//         style={styles.picker}>
//         <Picker.Item label="AC" value="AC" />
//         <Picker.Item label="Non AC" value="Non AC" />
//       </Picker>

//       <Picker
//         selectedValue={toFromFast}
//         onValueChange={(itemValue) => setToFromFast(itemValue)}
//         style={styles.picker}>
//         <Picker.Item label="TO FAST" value="TO FAST" />
//         <Picker.Item label="FROM FAST" value="FROM FAST" />
//       </Picker>

//       <TextInput 
//         placeholder="Time" 
//         onChangeText={setTime} 
//         value={time} 
//         style={styles.input} 
//       />
//       <TextInput 
//         placeholder="Date" 
//         onChangeText={setDate} 
//         value={date} 
//         style={styles.input} 
//       />
//       <Button title="Search" onPress={searchRides} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#00BC99', 
//   },
//   picker: {
//     width: '100%',
//     marginVertical: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginVertical: 10,
//     width: '100%',
//   },
//   // Additional styles can be added here
// });

// export default RideSharingApp;


// //Code 2
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const RideSharingApp = () => {
  const [customerType, setCustomerType] = useState('Student');
  const [gender, setGender] = useState('Male');
  const [acType, setAcType] = useState('AC');
  const [toFromFast, setToFromFast] = useState('TO FAST');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const postRide = () => {
    console.log('Ride posted...');
    console.log({ customerType, gender, acType, toFromFast, time, date });
    // Perform the post ride logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <LinearGradient
        colors={['#00BC99', '#009688', '#00796B']}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.header}>Post a Ride</Text>

          <Picker
            selectedValue={customerType}
            onValueChange={setCustomerType}
            style={styles.picker}
          >
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Faculty" value="Faculty" />
          </Picker>

          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>

          <Picker
            selectedValue={acType}
            onValueChange={setAcType}
            style={styles.picker}
          >
            <Picker.Item label="AC" value="AC" />
            <Picker.Item label="Non AC" value="Non AC" />
          </Picker>

          <Picker
            selectedValue={toFromFast}
            onValueChange={setToFromFast}
            style={styles.picker}
          >
            <Picker.Item label="TO FAST" value="TO FAST" />
            <Picker.Item label="FROM FAST" value="FROM FAST" />
          </Picker>

          <TextInput
            placeholder="Time"
            onChangeText={setTime}
            value={time}
            style={styles.input}
          />
          <TextInput
            placeholder="Date"
            onChangeText={setDate}
            value={date}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={postRide}
          >
            <Text style={styles.buttonText}>Post Ride</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%', // Use the full width to ensure it fits on all devices
    maxWidth: 600, // Maximum width for larger devices
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005A4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00897B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RideSharingApp;

// // Code 3
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';

// const RideSharingApp = () => {
//   const [customerType, setCustomerType] = useState('Student');
//   const [gender, setGender] = useState('Male');
//   const [acType, setAcType] = useState('AC');
//   const [toFromFast, setToFromFast] = useState('TO FAST');
//   const [time, setTime] = useState('');
//   const [date, setDate] = useState('');

//   const postRide = () => {
//     console.log('Ride posted...');
//     console.log({ customerType, gender, acType, toFromFast, time, date });
//     // Perform the post ride logic here
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollView}>
//       <LinearGradient
//         colors={['#00BC99', '#009688', '#00796B']}
//         style={styles.container}
//       >
//         <View style={styles.card}>
//           <Text style={styles.header}>Post a Ride</Text>

//           <Picker
//             selectedValue={customerType}
//             onValueChange={setCustomerType}
//             style={styles.picker}
//           >
//             <Picker.Item label="Student" value="Student" />
//             <Picker.Item label="Faculty" value="Faculty" />
//           </Picker>

//           <Picker
//             selectedValue={gender}
//             onValueChange={setGender}
//             style={styles.picker}
//           >
//             <Picker.Item label="Male" value="Male" />
//             <Picker.Item label="Female" value="Female" />
//           </Picker>

//           <Picker
//             selectedValue={acType}
//             onValueChange={setAcType}
//             style={styles.picker}
//           >
//             <Picker.Item label="AC" value="AC" />
//             <Picker.Item label="Non AC" value="Non AC" />
//           </Picker>

//           <Picker
//             selectedValue={toFromFast}
//             onValueChange={setToFromFast}
//             style={styles.picker}
//           >
//             <Picker.Item label="TO FAST" value="TO FAST" />
//             <Picker.Item label="FROM FAST" value="FROM FAST" />
//           </Picker>

//           <TextInput
//             placeholder="Time"
//             onChangeText={setTime}
//             value={time}
//             style={styles.input}
//           />
//           <TextInput
//             placeholder="Date"
//             onChangeText={setDate}
//             value={date}
//             style={styles.input}
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={postRide}
//           >
//             <Text style={styles.buttonText}>Post Ride</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flexGrow: 1,
//   },
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   card: {
//     width: '100%', // Use the full width to ensure it fits on all devices
//     maxWidth: 500, // Maximum width for larger devices
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#005A4A',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   picker: {
//     width: '100%',
//     marginVertical: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#F0F0F0',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#00897B',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default RideSharingApp;
