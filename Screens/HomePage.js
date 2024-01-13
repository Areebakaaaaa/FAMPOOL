import react from 'react';
import {View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';



export default HomePage = () =>{
    const navigation = useNavigation();

    const fortest = () =>
    {
        navigation.navigate("Registration");
    }

    const gotoAvailableRide = () =>
    {
        navigation.navigate("AvailableRide");
    }

    const gotoPostRide = () =>
    {
        navigation.navigate("PostRide");
    }

    return (
        <View style={styles.layout}>

            <View>
                <Text style={styles.heading}>This is HomePage</Text>
            </View>

            <View style={styles.register_button_layout}>
                <Button style={styles.register_button} title="Go Back" onPress={fortest} />
            </View>

            <View style={styles.register_button_layout}>
                <Button style={styles.register_button} title="Search a Ride" onPress={gotoAvailableRide} />
            </View>

            <View style={styles.register_button_layout}>
                <Button style={styles.register_button} title="Post a Ride" onPress={gotoPostRide} />
            </View>
            




        </View>
    )
} 

const styles = StyleSheet.create
({
    layout:{
        marginTop: 60,

    },
    heading:{
        fontSize: 50,
    },
    register_button_layout: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    register_button:{
        borderBottomStartRadius: 10,

    }
})