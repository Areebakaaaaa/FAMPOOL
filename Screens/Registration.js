import react, {useState} from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import { TextInput, Button, Picker, CheckBox } from 'react-native';
import { StyleSheet} from 'react-native';

export default Registration = () => {

    const [UserType, setUserType] = useState('');
    const [NuId, setNuId] = useState('');
    const [NuEmail, setNuEmail] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [Gender, setGender] = useState('');

    const RegistrationProcess = () =>
    {
        console.log("Register button clicked succefully, Entered registration process");
    }

    return (
        <View style={styles.layout}>
            <View>
                <Text style={styles.heading}>Registration</Text>
            </View>
            <View>
                {/**
                 * <Picker selectedValue={UserType} onValueChange={(itemValue=> setUserType(itemValue))}>
                    <Picker.Item label="Student" value="Student" />
                    <Picker.Item label="Faculty" value="Faculty" />
                </Picker>
                 */}
                 <Text>User-Type</Text><TextInput placeholder='Student' value='Student' onChangeText={(text)=>setNuId(text)} />
            </View>

            <View>
                <TextInput style={styles.input_field} placeholder='NU-ID' value={NuId} onChangeText={(text)=>setNuId(text)} />
                <TextInput style={styles.input_field} placeholder='NU-Email' value={NuEmail} onChangeText={(text)=> setNuEmail(text)} />
                <TextInput style={styles.input_field} placeholder='Name' value={Name} onChangeText={(text)=> setName(text)} />
                <TextInput style={styles.input_field} placeholder='Phone' value={Phone} onChangeText={(text)=> setPhone(text)} />
             </View>
             
             <View>
             <TextInput style={styles.input_field} placeholder='Gender' value={Gender} onChangeText={(text)=> setGender(text)} />
            </View>

            <View>
                <TextInput style={styles.input_field} placeholder='Password' value={Password} onChangeText={(text)=> setPassword(text)} />
                <TextInput style={styles.input_field} placeholder='Re-Enter Password' value={RePassword} onChangeText={(text)=> setRePassword(text)} />
            </View>

            <View>
                {/**
                 * <CheckBox />
                 */}
                 <Text>Terms and Condition CheckBox</Text>
            </View>

            <View style={styles.register_button_layout}>
                <Button style={styles.register_button} title="Register" onPress={RegistrationProcess} />
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    layout:{
        marginTop: 60,

    },
    heading:{
        fontSize: 50,
    },
    input_field:{
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    register_button_layout: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    register_button:{
        borderBottomStartRadius: 10,

    }

});