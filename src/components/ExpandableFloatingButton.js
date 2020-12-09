import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExpandableFloatingButton({items, icon}) {
    const addAnimation = useRef(new Animated.Value(0)).current;
    const [addOpen, setAddOpen] = useState(false);
    const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    function closeImmediate() {
        setAddOpen(false);
        addAnimation.setValue(0);
    }

    function openAdd() {
        setAddOpen(true);
        Animated.timing(
            addAnimation,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    function closeAdd() {
        setAddOpen(false);
        Animated.timing(
            addAnimation,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    function toggleAdd() {
        if(addOpen) closeAdd();
        else openAdd();
    }

    function ItemStyle(i) {
        return {
            backgroundColor: Colors.Blue[6],
            padding: 5,
            borderRadius: 5,
            justifyContent: 'center',
            position: 'absolute',
            opacity: addAnimation,
            transform: [
                {
                    translateY: addAnimation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,-60 - i * 46]
                    })
                },
            ]
        };
    }


    return (
        <View
            pointerEvents="box-none"
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
            }}>

            <AnimatedPressable
                pointerEvents={addOpen ? "auto" : "none"}
                onPress={closeAdd}
                style={[StyleSheet.absoluteFillObject, {
                    backgroundColor: 'black',
                    opacity: addAnimation.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,0.35]
                    })
                }]} />

            <View 
                style={{
                    bottom: StyleConstants.FloatingButtonSize / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'visible',
                    width: StyleConstants.FloatingButtonSize * 2
                }}>

                {
                    items.map((item, i) => (
                        <AnimatedPressable
                            style={ItemStyle(i)}
                            key={i}
                            onPress={() => {
                                item.onPress();
                                closeAdd();
                            }}>

                            <Text style={{color: Colors.Background, bottom: 1, fontSize: 16}}>{item.name}</Text>
                        </AnimatedPressable>
                    ))
                }

                <Pressable
                    style={Styles.floatingButton}
                    onPress={toggleAdd}>

                    <AnimatedMaterialIcons
                        name="add"
                        size={36}
                        color="white"
                        style={{
                            position: 'absolute',
                            opacity: addAnimation,
                            transform: [
                                {
                                    rotate: addAnimation.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '45deg']
                                    })
                                }
                            ]
                        }}
                        />
                    <AnimatedMaterialIcons
                        name={icon ?? "add"}
                        size={36}
                        color="white"
                        style={{
                            position: 'absolute',
                            opacity: addAnimation.interpolate({
                                inputRange: [0,1],
                                outputRange: [1,0]
                            }),
                            transform: [
                                {
                                    rotate: addAnimation.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '45deg']
                                    })
                                }
                            ]
                        }}/>
                </Pressable>
            </View>
        </View>
    );
}