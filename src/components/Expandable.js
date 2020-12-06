import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated, Platform, UIManager, LayoutAnimation } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';
const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Expandable({headerText, children}) {
    const animation = useRef(new Animated.Value(0)).current;
    const [expanded, setExpanded] = useState(false);

    function expand() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(true);
        Animated.timing(
            animation,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    function close() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(false);
        Animated.timing(
            animation,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    function toggleExpanded() {
        if(expanded) close();
        else expand();
    }

    return (
        <View
            style={{
                flexDirection: 'column',
                width: '90%',
                backgroundColor: Colors.Gray[3],
                borderRadius: StyleConstants.Radius,
                overflow: 'hidden',
                maxHeight: expanded ? undefined : StyleConstants.FormItemHeight,
                marginTop: StyleConstants.FormItemSpacing
            }}>

            <Pressable
                onPress={toggleExpanded}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: StyleConstants.FormItemHeight,
                    paddingLeft: StyleConstants.Radius,
                    paddingRight: StyleConstants.Radius * 0.75,
                }}>

                <Text style={[Styles.listItemText, {flexGrow: 1}]}>{headerText}</Text>

                <AnimatedMaterialIcons
                    name="expand-more"
                    size={36}
                    color={Colors.Gray[7]}
                    style={{
                        transform: [
                            {
                                rotate: animation.interpolate({
                                    inputRange: [0,1],
                                    outputRange: ['0deg', '180deg']
                                })
                            }
                        ]
                    }}/>
            </Pressable>
            <View
                style={{
                    paddingHorizontal: StyleConstants.Radius,
                    paddingBottom: StyleConstants.Radius,
                    flexDirection: 'column'
                }}>
                {children}
            </View>
        </View>
    )
}