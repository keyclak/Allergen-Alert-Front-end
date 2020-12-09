import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import { isRTL } from 'expo-localization';

export default function LoadingAlertBox({text, icon, colors, loading}) {
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
            Animated.delay(5000),
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

    return (
        <Animated.View style={[
            Styles.alertBoxContainer,
            {
                borderColor: colors[5],
                backgroundColor: colors[1],
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0,1],
                            outputRange: [-100, 0]
                        })
                    }
                ]
            }]}>

            {
                loading
                    ? <ActivityIndicator color={colors[5]} size="large" />
                    : <MaterialIcons name={icon} size={32} color={colors[5]}/>
            }

            <Text style={[Styles.alertBoxText, { color: colors[5] }]}>{text}</Text>
        </Animated.View>
    )
}