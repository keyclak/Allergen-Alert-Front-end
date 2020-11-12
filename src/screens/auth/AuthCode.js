import React, { useContext, useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';
import { validatePasswordResetToken } from '../../hooks/api';

export default function AuthCode({navigation, route}) {
    const context = useContext(AuthContext);
    const username = route.params.user;

    const [code, setCode] = useState();
    const validToken = validatePasswordResetToken(username, code);

    useEffect(() => console.log(validToken.response), [validToken.response]);

    function onConfirm() {
        validToken.execute()
            .then(r => {})
            .catch(e => {});
    }

    return (
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Verification</Text>
            <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>A verification code has been sent to the account associated
                with this email</Text>
            <FormTextInput placeholder="Enter code" error={(validToken.response?.valid === false) ? 'true' : ''} onChangeText={setCode}/>
            </View>         
            {(validToken.response?.valid === false) && <Text style={[Styles.errorText, {alignSelf: 'center'}]}>Invalid code</Text>}         
            <View style={{width: StyleConstants.FormWidth}}>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Confirm" onPress={onConfirm}/>
            </View>
        </View>
    );
}