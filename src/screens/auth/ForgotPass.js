import React, { useContext, useState } from 'react';
import {View, Text} from 'react-native';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../../style';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function ForgotPasss({navigation}) {
    const context = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [error, errorState] = useState(0);

    function onSend() {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            {
                errorState(0)
                navigation.navigate('AuthCode')
            }   
        else
            errorState(1)
    }

    return (
        <View style={[Styles.container]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Forgot your password?</Text>
                <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>Please enter the email you used to create your account.</Text>
                <FormTextInput placeholder="Email" onChangeText={setEmail} error={(error === 1) ? 'true' : ''}/>
            </View>
                {error === 1 && <Text style={[Styles.errorText, {alignSelf: 'center'}]}>Not a valid email address</Text>}
            <View style={{width: StyleConstants.FormWidth}}>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Send" onPress={onSend}/>
            </View>
        </View>
    );
}