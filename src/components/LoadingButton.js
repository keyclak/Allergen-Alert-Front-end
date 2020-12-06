import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native';
import { Colors, Styles } from '../style';
const AnimatedActivityIndicator = Animated.createAnimatedComponent(ActivityIndicator);

export default function LoadingButton({children, isLoading, onPress, style}) {
    const animation = useRef(new Animated.Value(0)).current;
    const [pressed, setPressed] = useState(false);

    function onPressIn() {
        setPressed(true);
    }

    function onPressOut() {
        setPressed(false);
    }

    function animateLoadStart() {
        Animated.timing(
            animation,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }
        ).start(onPress);
    }

    function animateLoadDone() {
        Animated.timing(
            animation,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    useEffect(() => {
        if(!isLoading)
            animateLoadDone();

    }, [isLoading]);

    function animatePress() {
        animateLoadStart();
    }

    return (
        <Pressable
            style={[Styles.button, pressed && Styles.buttonPressed, style]}
            onPress={animatePress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}>

            <AnimatedActivityIndicator
                style={{
                    position: 'absolute',
                    transform: [
                        {
                            translateX: animation.interpolate({
                                inputRange: [0,1],
                                outputRange: [200,0]
                            })
                        }
                    ]
                }}
                color={Colors.Background}
                size="large"/>

            <Animated.View
                style={{
                    position: 'absolute',
                    transform: [
                        {
                            translateX: animation.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,-200]
                            })
                        }
                    ]
                }}>
                {children}
            </Animated.View>

        </Pressable>
    )
}