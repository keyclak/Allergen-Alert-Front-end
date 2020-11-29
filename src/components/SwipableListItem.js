import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native'; 
import { Colors, StyleConstants, Styles } from '../style';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SwipableListItem({children, onPress, deleteOnPress, style}) {
    var buttonSize = StyleConstants.FormItemHeight * 0.8

    function renderRightActions(progress, dragX) {
        const t = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <AnimatedPressable
                onPress={deleteOnPress}
                style={{ 
                    height: buttonSize,
                    width: buttonSize,
                    backgroundColor: Colors.Red[7],
                    borderRadius: buttonSize/ 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    left: 15,
                    opacity: t,
                    transform: [
                        { scale: t },
                    ]
                }}>
                
                <MaterialIcons name="delete" size={22} color="white" />

            </AnimatedPressable>
        )
    }

    return (
        <Swipeable friction={2} leftThreshold={30} renderRightActions={renderRightActions}>
            <Pressable onPress={onPress} style={[Styles.listItem, {marginBottom: 0}, style]}>
                {children}
            </Pressable>
        </Swipeable>
    );
}