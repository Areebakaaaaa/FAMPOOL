import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '@actions/sessionActions'; // Ensure this path is correct
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../services/fampoolAPIs';


const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Using useSelector to get the isLoggedIn state from Redux store
  const isLoggedIn = useSelector(state => state.session.isLoggedIn); // Update path if needed

  // Log the current isLoggedIn state whenever it changes
  console.log("Current login status:", isLoggedIn);

  const [nuEmail, setNuEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginProcess = async () => {
    try {
    
      // Simulating an API call to log in
     // const result = await getUser({ nuEmail, password });
     const result= true;
      if (result) {
        dispatch(loginUser({ nuEmail })); // Dispatch login action
        console.log("Current login status:", isLoggedIn);
        navigation.navigate("HomePage", { rollno: nuEmail.split('@')[0] });
      } else {
        alert("Incorrect Nu-Email or Password.");
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
    }
  };

  return (
    <LinearGradient colors={['#189b8b', '#189b8b', '#189b8b']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.loginCard}>
      <Image
          source={require('../assets/FAMPOOLLOGO.png')}
          style={styles.logo}
        />
        
         <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>

          <Ionicons name="mail-outline" size={24} color="#fff" />
          <TextInput style={styles.inputField} placeholder="NU-Email" placeholderTextColor="#ccc" 
            onChangeText={setNuEmail} keyboardType="email-address" autoCapitalize="none" />

        </View>
        <View style={styles.inputContainer}>

          <Ionicons name="key-outline" size={24} color="#fff" />
          <TextInput style={styles.inputField} placeholder="Password" placeholderTextColor="#ccc" 
            onChangeText={setPassword} secureTextEntry={true} />

        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => alert("Logged In")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={LoginProcess}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupPrompt}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  iconStyle: {
    marginBottom: 20,
  },
  loginText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 10,
    marginBottom: 20,
    width: '100%',
  },
  inputField: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: '#fff',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {

    color: '#00897B',

    fontSize: 18,
    fontWeight: 'bold',
  },
  signupPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  logo: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Login;
