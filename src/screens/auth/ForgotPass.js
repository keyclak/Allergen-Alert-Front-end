import React, { useContext, useState } from 'react';
import {View, Text} from 'react-native';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../../style';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';
import { sendPasswordReset } from '../../hooks/api';

export default function ForgotPass({navigation}) {
    const context = useContext(AuthContext);

    const [username, setUsername] = useState();
    const sendPassReset = sendPasswordReset(username);

    function onSend() {
        sendPassReset.execute()
            .then(r => {navigation.navigate('AuthCode', { user: username })})
            .catch(e => {});

        
    }

    return (
        <View style={[Styles.container]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Forgot your password?</Text>
                <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>Please enter the username you used to create your account.</Text>
                <FormTextInput placeholder="Username" error={sendPassReset.error?.PropertyHint == 'username'} onChangeText={setUsername}/>
            </View>
            <Text style={[Styles.errorText, {alignSelf: 'center', paddingTop: 10}]}>{sendPassReset.error?.Error}</Text>
            <View style={{width: StyleConstants.FormWidth}}>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Send" onPress={onSend}/>
            </View>
        </View>
    );
}