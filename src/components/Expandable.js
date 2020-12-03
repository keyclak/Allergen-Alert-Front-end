import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated, Platform, UIManager, LayoutAnimation } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function Expandable({headerText, children}) {
    const [expanded, setExpanded] = useState(false);

    function toggleExpanded() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
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

                {expanded
                    ? <MaterialIcons name="expand-less" size={36} color={Colors.Gray[7]}/>
                    : <MaterialIcons name="expand-more" size={36} color={Colors.Gray[7]}/>
                }
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