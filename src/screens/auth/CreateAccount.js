import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { useLogin } from '../../hooks/api';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function CreateAccount() {
    const context = useContext(AuthContext);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = useLogin(username, password);

    function onSubmit() {
        login.execute()
            .then(r => context.logIn(r.token))
            .catch(e => {});
    }

    return (
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>
                <FormTextInput placeholder="Username" onChangeText={setUsername}/>
                <FormTextInput placeholder="Email" onChangeText={setEmail}/>
                <FormTextInput placeholder="Password" onChangeText={setPassword} />
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Log In" isLoading={login.loading} onPress={onSubmit} />
                <Text style={[Styles.errorText, {alignSelf: 'center'}]}>{login.error}</Text>
            </View>
        </View>
    );
}