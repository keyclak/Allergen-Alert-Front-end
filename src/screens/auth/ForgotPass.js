import React, { useContext, useState } from 'react';
import {View, Text} from 'react-native';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function ForgotPasss({navigation}) {
    const context = useContext(AuthContext);

    const [email, setEmail] = useState();

    function onSend() {
        navigation.navigate('AuthCode');
    }

    return (
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Forgot your password?</Text>
            <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>Please enter the email you used to create your account.</Text>
            <FormTextInput placeholder="Email" onChangeText={setEmail}/>
            </View>
            <View style={{position: 'absolute', bottom:110, width: StyleConstants.FormWidth}}>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Send" onPress={onSend}/>
            </View>
        </View>
    );
}