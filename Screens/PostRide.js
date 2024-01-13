import React from "react";
import {View, Text, Button} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export default PostRide = () =>
{
    const navigation = useNavigation();

    const fortest = () =>
    {
        navigation.navigate("HomePage");
    }

    return(
        <View>

            <View style={styles.layout}>
                <Text>This is Post Ride page.</Text>
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