import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addUser } from '../services/fampoolAPIs';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default Registration = () => {
    const navigation = useNavigation();

    const [userType, setUserType] = useState('Student');
    const [nuId, setNuId] = useState('');
    const [nuEmail, setNuEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [gender, setGender] = useState('');
    const [imageUri, setImageUri] = useState(null);

    let userDetails={
        fname: fname,
        lname: lname,
        nuId: nuId,
        userType: userType,
        nuEmail: nuEmail,
        phone: phone,
        password: password,
        gender: gender,
    }

    const RegistrationProcess = async () => {
        try{
            console.log("Register button clicked successfully, Entered registration process");
            //const data = await addUser(userDetails);
            //navigation.navigate("HomePage");
        }
        catch(error)
        {
            console.log("Registration Error");
        }
    }


    const goToLogin = () => {
        navigation.navigate("Login");
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
          setImageUri(result.uri);
          //{imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}

        }
      };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Registration</Text>
            </View>
            <View style={styles.formContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={selectImage}>
                    <Text style={styles.registerButtonText}>Select Profile Picture</Text>
                </TouchableOpacity>

                <Text style={styles.label}>User-Type</Text>
                <Picker
                    selectedValue={userType}
                    onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Student" value="Student" />
                    <Picker.Item label="Faculty" value="Faculty" />
                </Picker>

                <TextInput style={styles.inputField} placeholder='NU-ID' onChangeText={setNuId} />
                <TextInput style={styles.inputField} placeholder='NU-Email' onChangeText={setNuEmail} />
                <TextInput style={styles.inputField} placeholder='First Name' onChangeText={setFname} />
                <TextInput style={styles.inputField} placeholder='Last Name' onChangeText={setLname} />
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
