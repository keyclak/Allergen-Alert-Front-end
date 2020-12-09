import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoadingAlertBox({text, icon, colors, loading, loadingText, error, errorIcon, errorColors}) {
    const animation = useRef(new Animated.Value(0)).current;

    function open() {
        Animated.timing(
            animation,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    function startClose() {
        Animated.sequence([
            Animated.delay(3000),
            Animated.timing(
                animation,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            )
        ]).start();
    }

    useEffect(() => {
        if(loading) {
            open();
        } else {
            startClose();
        }
    }, [loading])

    const fg = error ? errorColors[5] : colors[5];
    const bg = error ? errorColors[1] : colors[1];

    return (
        <Animated.View style={[
            Styles.alertBoxContainer,
            {
                borderColor: fg,
                backgroundColor: bg,
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0,1],
                            outputRange: [-100, 0]
                        })
                    }
                ]
            }]}>

            <View style={{width: 32}}>
            {
                loading
                    ? <ActivityIndicator color={colors[5]} size="large" />
                    : <MaterialIcons name={error ? errorIcon : icon} size={32} color={fg}/>
            }
            </View>

            <Text style={[Styles.alertBoxText, { color: fg }]}>{error || (loading ? loadingText : text)}</Text>
        </Animated.View>
    );
}