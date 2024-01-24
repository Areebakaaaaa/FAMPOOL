// import react, {useState} from 'react';
// import {View, Text, Touchable, TouchableOpacity} from 'react-native';
// import { TextInput, Button, CheckBox } from 'react-native';
// import { StyleSheet} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Picker } from '@react-native-picker/picker';

// export default Registration = () => {
//     const navigation = useNavigation();

//     const [UserType, setUserType] = useState('');
//     const [NuId, setNuId] = useState('');
//     const [NuEmail, setNuEmail] = useState('');
//     const [Name, setName] = useState('');
//     const [Phone, setPhone] = useState('');
//     const [Password, setPassword] = useState('');
//     const [RePassword, setRePassword] = useState('');
//     const [Gender, setGender] = useState('');

//     const RegistrationProcess = () =>
//     {
//         console.log("Register button clicked succefully, Entered registration process");
//         navigation.navigate("HomePage");
//     }

//     const abc = () =>
//     {
//         console.log("Register button clicked succefully, Entered registration process");
//         navigation.navigate("Login");
//     }

//     return (
//         <View style={styles.layout}>
//             <View>
//                 <Text style={styles.heading}>Registration</Text>
//             </View>
//             {/* <View>
//                 {
//                   <Picker selectedValue={UserType} onValueChange={(itemValue=> setUserType(itemValue))}>
//                     <Picker.Item label="Student" value="Student" />
//                     <Picker.Item label="Faculty" value="Faculty" />
//                 </Picker>
//                  }
//                  <Text>User-Type</Text><TextInput placeholder='Student' value='Student' onChangeText={(text)=>setNuId(text)} />
//             </View> */}

// <View>
//     <Text>User-Type</Text>
//     <Picker
//         selectedValue={UserType}
//         onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
//         style={styles.input_field} // If you want to apply some styles
//     >
//         <Picker.Item label="Student" value="Student" />
//         <Picker.Item label="Faculty" value="Faculty" />
//     </Picker>
// </View>


//             <View>
//                 <TextInput style={styles.input_field} placeholder='NU-ID' value={NuId} onChangeText={(text)=>setNuId(text)} />
//                 <TextInput style={styles.input_field} placeholder='NU-Email' value={NuEmail} onChangeText={(text)=> setNuEmail(text)} />
//                 <TextInput style={styles.input_field} placeholder='Name' value={Name} onChangeText={(text)=> setName(text)} />
//                 <TextInput style={styles.input_field} placeholder='Phone' value={Phone} onChangeText={(text)=> setPhone(text)} />
//              </View>
             
//              <View>
//              <TextInput style={styles.input_field} placeholder='Gender' value={Gender} onChangeText={(text)=> setGender(text)} />
//             </View>

//             <View>
//                 <TextInput style={styles.input_field} placeholder='Password' value={Password} onChangeText={(text)=> setPassword(text)} />
//                 <TextInput style={styles.input_field} placeholder='Re-Enter Password' value={RePassword} onChangeText={(text)=> setRePassword(text)} />
//             </View>

//             <View>
//                 {/**
//                  * <CheckBox />
//                  */}
//                  <Text>Terms and Condition CheckBox</Text>
//             </View>

//             <View style={styles.register_button_layout}>
//                 <Button style={styles.register_button} title="Register" onPress={RegistrationProcess} />
//             </View>

//             <View>
//             <TouchableOpacity onPress={abc}>
//             <Text style={{fontWeight: 'bold', fontSize: 16 }}>Already have an account? Click me</Text>
//             </TouchableOpacity>
//             </View>



//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     layout:{
//         marginTop: 60,
//         backgroundColor: '#90ee90', // This sets the background color of the layout to green

//     },
//     heading:{
//         fontSize: 50,
//         color: 'white',
//     },
//     input_field:{
//         borderStyle: 'solid',
//         borderWidth: 2,
//         borderColor: 'black',
//         padding: 10,
//         marginTop: 10,
//         marginLeft: 10,
//         marginRight: 10,
//         backgroundColor: 'white', // You may want to keep the input field white for better readability

//     },
//     register_button_layout: {
//         marginTop: 20,
//         marginLeft: 10,
//         marginRight: 10,
//     },
//     register_button:{
//         borderBottomStartRadius: 10,

//     }

// });



//Version 2

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default Registration = () => {
    const navigation = useNavigation();

    const [UserType, setUserType] = useState('Student');
    const [NuId, setNuId] = useState('');
    const [NuEmail, setNuEmail] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [Gender, setGender] = useState('');

    const RegistrationProcess = () => {
        console.log("Register button clicked successfully, Entered registration process");
        navigation.navigate("HomePage");
    }

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Registration</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>User-Type</Text>
                <Picker
                    selectedValue={UserType}
                    onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Student" value="Student" />
                    <Picker.Item label="Faculty" value="Faculty" />
                </Picker>

                <TextInput style={styles.inputField} placeholder='NU-ID' onChangeText={setNuId} />
                <TextInput style={styles.inputField} placeholder='NU-Email' onChangeText={setNuEmail} />
                <TextInput style={styles.inputField} placeholder='Name' onChangeText={setName} />
                <TextInput style={styles.inputField} placeholder='Phone' onChangeText={setPhone} />
                <TextInput style={styles.inputField} placeholder='Gender' onChangeText={setGender} />
                <TextInput style={styles.inputField} placeholder='Password' onChangeText={setPassword} secureTextEntry={true} />
                <TextInput style={styles.inputField} placeholder='Re-Enter Password' onChangeText={setRePassword} secureTextEntry={true} />

                <TouchableOpacity style={styles.checkboxContainer}>
                    <Text style={styles.termsText}>Accept Terms & Conditions</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={RegistrationProcess}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>

                <View style={styles.loginPrompt}>
                    <Text style={styles.loginPromptText}>Already have an account?</Text>
                    <TouchableOpacity onPress={goToLogin}>
                        <Text style={styles.loginPromptButton}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9',
    },
    headingContainer: {
        marginTop: 60,
        marginBottom: 20,
        padding: 10,
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#2e7d32',
        textAlign: 'center',
    },
    formContainer: {
        marginHorizontal: 30,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#2e7d32',
    },
    picker: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#c8e6c9',
        borderRadius: 5,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#c8e6c9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    termsText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#2e7d32',
    },
    registerButton: {
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginPromptText: {
        fontSize: 16,
        color: '#2e7d32',
    },
    loginPromptButton: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#4caf50',
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
});
