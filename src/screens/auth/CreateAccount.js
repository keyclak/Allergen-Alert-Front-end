import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles } from '../../style';
import { useLogin, useCreateAccount } from '../../hooks/api';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

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
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>
                <FormTextInput label="Username" error={createAccount.error?.PropertyHint == 'username'} onChangeText={setUsername}/>
                <FormTextInput label="Email" error={createAccount.error?.PropertyHint == 'email'} onChangeText={setEmail}/>
                <FormTextInput label="Password" error={createAccount.error?.PropertyHint == 'password'} onChangeText={setPassword} />
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Create Account" isLoading={createAccount.loading} onPress={onSubmit} />
                <Text style={[Styles.errorText, {alignSelf: 'center'}]}>{createAccount.error?.Error}</Text>
            </View>
        </View>
    );
}