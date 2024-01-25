import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addUser } from '../services/fampoolAPIs';
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
        addUser("Network Error Solved");
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
