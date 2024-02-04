// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';

// const RideSharingApp = () => {
//   const [gender, setGender] = useState(null);
//   const [acType, setAcType] = useState(null);
//   const [toFast, setToFast] = useState('');
//   const [fromFast, setFromFast] = useState('');
//   const [time, setTime] = useState('');
//   const [date, setDate] = useState('');

//   const searchRides = () => {
//     console.log('Searching for rides...');
//     console.log({ gender, acType, toFast, fromFast, time, date });
//     // Perform the search logic here
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => { /* go back action */ }}>
//         <Text>Back</Text>
//       </TouchableOpacity>
//       <View style={styles.buttonGroup}>
//         <Button title="Male" onPress={() => setGender('Male')} />
//         <Button title="Female" onPress={() => setGender('Female')} />
//         <Button title="Faculty" onPress={() => setGender('Faculty')} />
//       </View>
//       <View style={styles.buttonGroup}>
//         <Button title="AC" onPress={() => setAcType('AC')} />
//         <Button title="Non AC" onPress={() => setAcType('Non AC')} />
//       </View>

//       <View style={styles.buttonGroup}>
//         <Button title="TO FAST" onPress={() => setToFast('TO FAST')}/>
//         <Button title="FROM FAST" onPress={() => setFromFast('FROM FAST')} />
//       </View>

//       {/* <TextInput placeholder="TO FAST" onChangeText={setToFast} value={toFast} />
//       <TextInput placeholder="FROM FAST" onChangeText={setFromFast} value={fromFast} /> */}
//       <TextInput placeholder="Time" onChangeText={setTime} value={time} />
//       <TextInput placeholder="Date" onChangeText={setDate} value={date} />
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
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     margin: 10,
//   },
//   // Additional styles can be added here
// });

// export default RideSharingApp;


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RideSharingApp = () => {
  const [gender, setGender] = useState('Male'); // Default value set to Male
  const [acType, setAcType] = useState('AC'); // Default value set to AC
  const [toFromFast, setToFromFast] = useState('TO FAST'); // Default value set to TO FAST
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const searchRides = () => {
    console.log('Searching for rides...');
    console.log({ gender, acType, toFromFast, time, date });
    // Perform the search logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { /* go back action */ }}>
        <Text>Back</Text>
      </TouchableOpacity>
      
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Faculty" value="Faculty" />
      </Picker>

      <Picker
        selectedValue={acType}
        onValueChange={(itemValue) => setAcType(itemValue)}
        style={styles.picker}>
        <Picker.Item label="AC" value="AC" />
        <Picker.Item label="Non AC" value="Non AC" />
      </Picker>

      <Picker
        selectedValue={toFromFast}
        onValueChange={(itemValue) => setToFromFast(itemValue)}
        style={styles.picker}>
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
      <Button title="Search" onPress={searchRides} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white', // Added white background for contrast
  },
  picker: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  // Additional styles can be added here
});

export default RideSharingApp;
