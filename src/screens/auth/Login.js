import React, { useContext, useEffect, useState } from 'react';
import {Image, ImageBackground, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../../components/LoadingButton';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../../style';
import { useLogin, useDummy } from '../../hooks/api';
import { AuthContext } from '../../context';
import FormTextInput from '../../components/FormTextInput';
import AlertBox from '../../components/AlertBox';

export default function Login({navigation}) {
    const context = useContext(AuthContext);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const login = useLogin(username, password);
    const dummy = useDummy("Hello World");

    useEffect(() => context.logOut(), [navigation]);
    
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
        <View style={Styles.alertContainer}>
            <AlertBox icon="error" text={login.error} colors={Colors.Red}/>
            <ImageBackground source={require('../../../assets/login.png')} style={Styles.container}>
                <View style={{width: StyleConstants.FormWidth}}>

                    <Text style={Styles.logo}>Allergen Alert</Text>

                    <FormTextInput placeholder="Username" onChangeText={setUsername} autoCapitalize='none'/>

                    <FormTextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true}/>
                        
                    <TextLoadingButton text="Log In" onPress={onSubmit} isLoading={login.loading}/>


                    <Pressable style={Styles.plainButton} onPress={onForgotPass}>
                        <Text style={{color: Colors.Gray[8], textDecorationLine:'underline'}}>Forgot Password?</Text>
                    </Pressable>

                    <Pressable style={Styles.plainButton} onPress={onCreateAccount}>
                        <Text style={{color: Colors.Gray[8]}}>Don't have an account? <Text style={{color: Colors.Red[4], fontWeight:'bold', textDecorationLine:'underline'}}>Sign Up</Text></Text>
                    </Pressable>

                </View>
            </ImageBackground>
        </View>
    );
}