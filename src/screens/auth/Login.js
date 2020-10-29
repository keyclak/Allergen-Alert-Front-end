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
    function onTest() {
        navigation.navigate('Scanner');
    }


    return (
        <ImageBackground source={require('../../../assets/background.png')}  style={[Styles.backgroundImage, {justifyContent: 'flex-start'}]}>
            <View style={{paddingTop: 170}}></View>
            <Image source={require('../../../assets/title.png')} style={{width: 350, height: 100}}></Image>
            <View style={{width: StyleConstants.FormWidth}}>
                <FormTextInput placeholder="Username" onChangeText={setUsername}/>
                <FormTextInput placeholder="Password" onChangeText={setPassword} />
                <View style={{paddingTop: 30}}></View>
                <TextLoadingButton style={Styles.button} text="Log In" isLoading={login.loading} onPress={onSubmit} />
                <Text style={[Styles.errorText, {alignSelf: 'center'}]}>{login.error}</Text>

                <Pressable style={Styles.button} onPress={onCreateAccount}>
                    <Text style={Styles.buttonText}>Create an Account</Text>
                </Pressable>
                <View style={{paddingTop: 1}}></View>
                <TextLoadingButton text="Test Scanner" isLoading={dummy.loading} onPress={onCreateAccount}/>
                <View style={{paddingTop: 20}}></View>
                <Pressable style={Styles.button} onPress={onForgotPass}>
                    <Text style={Styles.buttonText}>Forgot Password</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}