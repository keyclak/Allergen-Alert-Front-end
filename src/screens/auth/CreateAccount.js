import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../../style';
import { useLogin, useCreateAccount } from '../../hooks/api';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';
import AlertBox from '../../components/AlertBox';

export default function CreateAccount() {
    const context = useContext(AuthContext);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const createAccount = useCreateAccount(username, email, password);
    const login = useLogin(username, password);

    useEffect(() => console.log(createAccount.error), [createAccount.error]);

    function onSubmit() {
        createAccount.execute()
            .then(() => login.execute().then(v => context.logIn(v.token)))
            .catch(e => {});
    }

    return (
        <View style={[Styles.alertContainer]}>
            <AlertBox colors={Colors.Red} text={createAccount.error?.Error}/>
            <View style={Styles.container}>
                <View style={{width: StyleConstants.FormWidth}}>
                    <Text style={Styles.headerText}>Create Account</Text>
                    <FormTextInput placeholder="Username" error={createAccount.error?.PropertyHint == 'username'} onChangeText={setUsername}/>
                    <FormTextInput placeholder="Email" error={createAccount.error?.PropertyHint == 'email'} onChangeText={setEmail}/>
                    <FormTextInput placeholder="Password" error={createAccount.error?.PropertyHint == 'password'} onChangeText={setPassword} />
                    <TextLoadingButton text="Create Account" isLoading={createAccount.loading} onPress={onSubmit} />
                </View>
            </View>
        </View>
    );
}