import React, { useContext, useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function ForgotPasss({navigation}) {
    const context = useContext(AuthContext);

    const [email, setCode] = useState();

    function onConfirm() {
        navigation.navigate('ChangePass');
    }

    return (
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Verification</Text>
            <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>A verification code has been sent to the account associated
                with this email</Text>
            <FormTextInput placeholder="Enter code" onChangeText={setCode}/>
            
            </View>
            <View style={{position: 'absolute', bottom:110, width: StyleConstants.FormWidth}}>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Confirm" onPress={onConfirm}/>
            </View>
        </View>
    );
}