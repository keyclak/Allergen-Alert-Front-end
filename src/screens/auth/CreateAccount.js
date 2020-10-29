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

    function onSubmit() {
        createAccount.execute()
            .catch(e => {});
    }

    return (
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>
                <FormTextInput label="Username" onChangeText={setUsername}/>
                <FormTextInput label="Email" onChangeText={setEmail}/>
                <FormTextInput label="Password" onChangeText={setPassword} />
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }}text="Create Account" isLoading={createAccount.loading} onPress={onSubmit} />
                <Text style={[Styles.errorText, {alignSelf: 'center'}]}>{createAccount.error}</Text>
            </View>
        </View>
    );
}