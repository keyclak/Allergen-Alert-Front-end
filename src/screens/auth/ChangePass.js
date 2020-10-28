import React, { useContext, useState } from 'react';
import {View, Text} from 'react-native';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function ChangePass({navigation}) {
    const context = useContext(AuthContext);

    const [email, setPass] = useState();

    function onReset() {
        navigation.navigate('Login');
    }

    return (
        <View style={[Styles.container]}>
            <View style={{width: StyleConstants.FormWidth}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Change your password</Text>
            <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>Enter a new password that hasn't been used recently</Text>
            <FormTextInput placeholder="Password"/>
            <FormTextInput placeholder="Confirm password" onChangeText={setPass}/>
            </View>
            <View style={{position: 'absolute', bottom:110, width: StyleConstants.FormWidth}}>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Reset Password" onPress={onReset}/>
            </View>
        </View>
    );
}