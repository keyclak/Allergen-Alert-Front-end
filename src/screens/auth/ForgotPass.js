import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { useLogin } from '../../hooks/api';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function ForgotPasss({navigation}) {
    const context = useContext(AuthContext);

    const [email, setEmail] = useState();

    function onSend() {
        navigation.navigate('ChangePass');
    }

    return (
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Forgot your password?</Text>
            <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>A password reset link will be sent to the account associated
                with this email</Text>
            <FormTextInput placeholder="Email" onChangeText={setEmail}/>
            <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Send" onPress={onSend}/>
            </View>
        </View>
    );
}