import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function AnimatedFloatingButton({onPress}) {
    const animation = useRef(new Animated.Value(0)).current;
    const [open, setOpen] = useState(false);

    function onOpen() {
        // Animated.timing(
        //     animation,
        //     {
        //         toValue: 1,
        //         duration: 400,
        //         useNativeDriver: true
        //     }
        // ).start(() => {
        //     animation.setValue(0);
        // });
        // onPress && onPress();
        setOpen(true);
    }

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
            }}>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: StyleConstants.FloatingButtonSize,
                    width: StyleConstants.FloatingButtonSize,
                    bottom: StyleConstants.FloatingButtonSize / 2,
                    right: StyleConstants.FloatingButtonSize / 2
                }}>
                    <Animated.View style={[
                        Styles.floatingButton,
                        {
                            position: 'absolute',
                            transform: [
                                {
                                    scale: animation.interpolate({
                                        inputRange: [0,1],
                                        outputRange: [1,25]
                                    })
                                }
                            ]
                        }]}/>


                    <Pressable 
                        onPress={onOpen}
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: StyleConstants.FloatingButtonSize,
                            height: StyleConstants.FloatingButtonSize,
                            borderRadius: StyleConstants.FloatingButtonSize / 2
                        }}>
                        <MaterialIcons name="add" size={36} color={Colors.Background}/>
                    </Pressable>
                </View>
        </View>
    )
}