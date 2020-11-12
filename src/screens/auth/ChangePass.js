import React, { useContext, useState } from 'react';
import {View, Text} from 'react-native';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';
import { resetPassword } from '../../hooks/api';

export default function ChangePass({navigation, route}) {
    const context = useContext(AuthContext);
    const token = route.params.token;
    const username = route.params.user;

    const [pass1, setPass1] = useState();
    const [pass2, setPass2] = useState();
    const [error, errorState] = useState(0);

    const resetPass = resetPassword(username, token, pass2);

    function onReset() {
        if (pass1 !== pass2)
            errorState(1)
        else
        {
            errorState(0);
            resetPass.execute()
            .then(r => {navigation.navigate('Login')})
            .catch(e => {});
        }
    }

    return (
        <View style={[Styles.container]}>
            <View style={{width: StyleConstants.FormWidth}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Change your password</Text>
            <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>Enter a new password that hasn't been used recently</Text>
            <FormTextInput placeholder="Password" onChangeText={setPass1} error={(error === 1) ? 'true' : resetPass.error?.PropertyHint == 'password'}/>
            <FormTextInput placeholder="Confirm password" onChangeText={setPass2} error={(error === 1) ? 'true' : resetPass.error?.PropertyHint == 'password'}/>
            {error === 1 && <Text style={[Styles.errorText, {alignSelf: 'center'}]}>Passwords do not match</Text>}
            {error === 0 && <Text style={[Styles.errorText, {alignSelf: 'center', paddingTop: 10}]}>{resetPass.error?.Error}</Text>}
            <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Reset Password" onPress={onReset}/>
            </View>
        </View>
    );
}