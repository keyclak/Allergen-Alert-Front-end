import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Styles } from '../style';
import { useLogin } from '../hooks/api';
import { AuthContext } from '../context';

export default function Home() {
    const context = useContext(AuthContext);

    return (
        <View style={Styles.container}>
            <TextLoadingButton text="Log Out" onPress={() => context.logOut()} />
        </View>
    );
}