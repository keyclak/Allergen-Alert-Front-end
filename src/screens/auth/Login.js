import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
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

    function onTest() {
        navigation.navigate('Scanner');
    }


    return (
        <View style={[Styles.container, {justifyContent: 'center'}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>Allergen Alert</Text>

                <FormTextInput label="Username" onChangeText={setUsername}/>
                <FormTextInput label="Password" onChangeText={setPassword} />
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }} text="Log In" isLoading={login.loading} onPress={onSubmit} />
                <Text style={[Styles.errorText, {alignSelf: 'center'}]}>{login.error}</Text>

                <Pressable style={[Styles.button, {backgroundColor: Colors.Background}]} onPress={onCreateAccount}>
                    <Text style={Styles.buttonText}>Create an Account</Text>
                </Pressable>

                <TextLoadingButton text="Test Scanner" isLoading={dummy.loading} onPress={onCreateAccount}/>
            </View>
        </View>
    );
}