import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, Styles } from '../style';

export default function LoadingButton({children, isLoading, onPress, style}) {
    const [pressed, setPressed] = useState(false);

    function onPressIn() {
        setPressed(true);
    }

    function onPressOut() {
        setPressed(false);
    }

    return (
        <Pressable style={[Styles.button, pressed && Styles.buttonPressed, style]} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            {
                isLoading
                    ? <ActivityIndicator color={Colors.Background} size="large"/>
                    : children
            }
        </Pressable>
    )
}