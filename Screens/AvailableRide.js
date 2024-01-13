import React from "react";
import {View, Text, Button} from 'react-native';
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default AvailableRide = () =>
{
    const navigation = useNavigation();

    const fortest = () =>
    {
        navigation.navigate("HomePage");
    }

    return(
        <View style={styles.layout}>

            <View>
                <Text>This is Available Ride page.</Text>
            </View>

            <View style={styles.button_layout}>
                <Button style={styles.button_detail} title="Go Back" onPress={fortest} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create
({
    layout:{
        marginTop: 60,

    },
    button_layout: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    button_detail:{
        borderBottomStartRadius: 10,

    }
})