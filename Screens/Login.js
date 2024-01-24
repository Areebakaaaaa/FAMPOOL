//version 1

// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const Login = (props) => {
//   return (
//     <View style={{ alignItems: 'center', width: 400 }}>
//       <Text style={styles.loginText}>Login</Text>
//       <View style={styles.loginContainer}>
//         <Text style={styles.welcomeBackText}>Welcome Back</Text>
//         <Text style={styles.loginToYourAccountText}>Login to your account</Text>
//         <TextInput 
//           style={styles.inputField} 
//           placeholder="Email / Username" 
//           keyboardType="email-address" 
//           autoCapitalize="none" 
//         />
//         <TextInput 
//           style={styles.inputField} 
//           placeholder="Password" 
//           secureTextEntry={true} 
//         />
//         <View style={styles.forgotPasswordContainer}>
//           <TouchableOpacity onPress={() => alert("Forgot Password?")}>
//             <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.loginButton} onPress={() => alert("Logged In")}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>
//         <View style={styles.signupContainer}>
//           <Text style={styles.dontHaveAccountText}>Don't have an account ?</Text>
//           <TouchableOpacity onPress={() => props.navigation.navigate("Registration")}>
//             <Text style={styles.signupText}>Signup</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   loginText: {
//     color: 'black',
//     fontSize: 70,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   loginContainer: {
//     backgroundColor: '#90ee90',
//     height: 700,
//     width: 460,
//     borderTopLeftRadius: 130,
//     paddingTop: 100,
//     alignItems: 'center',
//   },
//   welcomeBackText: {
//     fontSize: 40,
//     fontWeight: 'bold',
//   },
//   loginToYourAccountText: {
//     color: 'grey',
//     fontSize: 19,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputField: {
//     height: 50,
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingLeft: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   forgotPasswordContainer: {
//     alignItems: 'flex-end',
//     width: '78%',
//     paddingRight: 16,
//     marginBottom: 200,
//   },
//   forgotPasswordText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: 'blue',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   signupContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: "center",
//   },
//   dontHaveAccountText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   signupText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: 'blue',
//   },
// });

// export default Login;

//Version 2

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install this

const Login = (props) => {
  return (
    <LinearGradient colors={['#86ba90', '#5e8c61', '#2e5734']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.loginCard}>
        <Ionicons name="ios-person-circle-outline" size={120} color="#fff" style={styles.iconStyle} />
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#fff" />
          <TextInput 
            style={styles.inputField} 
            placeholder="Email / Username" 
            placeholderTextColor="#ccc"
            keyboardType="email-address" 
            autoCapitalize="none" 
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={24} color="#fff" />
          <TextInput 
            style={styles.inputField} 
            placeholder="Password" 
            placeholderTextColor="#ccc"
            secureTextEntry={true} 
          />
        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => alert("Forgot Password?")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => alert("Logged In")}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupPrompt}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Registration")}>
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
    color: '#86ba90', // Adjusted to match the green theme
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
});

export default Login;
