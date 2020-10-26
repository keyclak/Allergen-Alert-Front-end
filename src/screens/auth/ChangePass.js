import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { useLogin } from '../../hooks/api';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function ChangePass({navigation}) {
    const context = useContext(AuthContext);

    const [email, setEmail] = useState();

    function onReset() {
        navigation.navigate('Login');
    }

    return (
        <View style={[Styles.container, ]}>
            <View style={{width: StyleConstants.FormWidth}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>Change your password</Text>
            <Text style={{textAlign: 'center', fontSize: 18, paddingTop: 20}}>Enter a new password that hasn't been used recently</Text>
            <FormTextInput placeholder="Password" onChangeText={setEmail}/>
            <FormTextInput placeholder="Confirm password" onChangeText={setEmail}/>
            <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Reset Password" onPress={onReset}/>
            </View>
        </View>
    );
}