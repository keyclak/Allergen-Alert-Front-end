import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, Styles } from '../style';
import LoadingButton from './LoadingButton';


export default function TextLoadingButton({text, isLoading, onPress, style}) {
    return (
        <LoadingButton isLoading={isLoading} onPress={onPress} style={style}>
            <Text style={Styles.buttonText}>{text}</Text>
        </LoadingButton>
    )
}