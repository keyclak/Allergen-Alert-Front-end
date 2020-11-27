import React, { useContext, useEffect, useState } from 'react';
import {Image, ImageBackground, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../../style';
import { useLogin, useDummy } from '../../hooks/api';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';

export default function Login({navigation}) {
    const context = useContext(AuthContext);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const login = useLogin(username, password);
    const dummy = useDummy("Hello World");

    useEffect(() => console.log(dummy.response), [dummy.response]);

    function onSubmit() {
        login.execute()
            .then(r => context.logIn(r.token))
            .catch(e => {});
    }

    function onCreateAccount() {
        navigation.navigate('CreateAccount');
    }

    function onForgotPass() {
        navigation.navigate('ForgotPass');
    }

    return (
        <View style={Styles.container}>
            <View style={{width: StyleConstants.FormWidth}}>

                <Text style={Styles.logo}>Allergen Alert</Text>

                <TextInput 
                    placeholder="Username" 
                    placeholderTextColor={Colors.Gray[5]} 
                    style={Styles.formInput}/>

                <TextInput 
                    placeholder="Password" 
                    placeholderTextColor={Colors.Gray[5]} 
                    style={Styles.formInput}/>

                <TextLoadingButton text="Log In" onPress={onSubmit} isLoading={login.loading}/>

                <Pressable style={Styles.plainButton} onPress={onForgotPass}>
                    <Text style={{color: Colors.Gray[6]}}>Forgot Password?</Text>
                </Pressable>

                <Pressable style={Styles.plainButton} onPress={onCreateAccount}>
                    <Text style={{color: Colors.Gray[5]}}>Don't have an account? </Text>
                    <Text style={{color: Colors.Gray[6]}}>Create One</Text>
                </Pressable>

            </View>
        </View>
    );
}