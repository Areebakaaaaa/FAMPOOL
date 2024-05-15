import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatbotScreen from "./Screens/ChatbotScreen";
import Login from "./Screens/Login";
import Registration from "./Screens/Registration";
import HomePage from "./Screens/HomePage";
import AvailableRide from "./Screens/AvailableRide";
import PostRide from "./Screens/PostRide";
import PostRideTwo from "./Screens/PostRideTwo";
import Notification from "./Screens/Notification";
import MapScreen from './Screens/MapScreen';
import SearchRide from './Screens/SearchRide';
import SearchRideDetails from './Screens/SearchRideDetails';
import Abc from './Screens/Abc';


import RideStatus from './Screens/RideStatus';


import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

//lalalallala




export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
              <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: 'Login' , headerShown: false }}
              />
                 <Stack.Screen
              name="PostRideTwo"
              component={PostRideTwo}
              options={{ title: 'PostRideTwo' , headerShown: false }}
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
              <Stack.Screen
              name="AvailableRide"
              component={AvailableRide}
              options={{ title: 'AvailableRide' , headerShown: false }}
              />
              <Stack.Screen
              name="PostRide"
              component={PostRide}
              options={{ title: 'PostRide' , headerShown: false }}
              />
                <Stack.Screen
              name="Notification"
              component={Notification}
              options={{ title: 'Notification' , headerShown: false }}
              />
            
              <Stack.Screen
              name="SearchRide"
              component={SearchRide}
              options={{ title: 'SearchRide' , headerShown: false }}
              />
              <Stack.Screen
              name="SearchRideDetails"
              component={SearchRideDetails}
              options={{ title: 'SearchRideDetails' , headerShown: false }}
              />
              <Stack.Screen
              name="Abc"
              component={Abc}
              options={{ title: 'Abc' , headerShown: false }}
              />

              <Stack.Screen
              name="RideStatus"
              component={RideStatus}
              options={{ title: 'RideStatus' , headerShown: false }}
              />

            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{ title: 'MapScreen' , headerShown: false }}
              />


              <Stack.Screen name="Chatbot" component={ChatbotScreen}
              options={{ title: 'Chatbot' , headerShown: false }}
              />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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
