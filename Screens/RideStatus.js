import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";

const RideStatus = () => {
    const navigation= useNavigation();

    return(
        <View>
            <Text>Ride Status</Text>
        </View>
    )
}


export default RideStatus;