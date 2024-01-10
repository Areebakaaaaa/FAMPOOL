import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./Screens/Login";
import Registration from "./Screens/Registration";
import HomePage from "./Screens/HomePage";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
              <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ title: 'Login' , headerShown: false }} 
              />
              <Stack.Screen
              name="Registration"
              component={Registration}
              options={{ title: 'Registration' , headerShown: false }} 
              />
              <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ title: 'HomePage' , headerShown: false }}
              />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
