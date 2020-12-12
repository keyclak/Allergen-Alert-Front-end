import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function AlertBox({text, icon, colors}) {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(text) {
            Animated.timing(
                animation,
                {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start();
        } else {
            Animated.timing(
                animation,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start();
        }
    }, [text]);

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

            <MaterialIcons name={icon} size={32} color={colors[5]}/>
            <Text style={[Styles.alertBoxText, { color: colors[5] }]}>{text}</Text>
        </Animated.View>
    )
}