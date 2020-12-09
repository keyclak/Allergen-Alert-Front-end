import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function ButtonTextInput({icon, onPress, ...params}) {
    const [focused, setFocused] = useState(false);

    function onFocus() {
        setFocused(true);
    }

    function onBlur() {
        setFocused(false);
    }

    return (
        <View style={{flexDirection: 'row', borderRadius: StyleConstants.Radius}}>
            <TextInput 
                {...params}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholderTextColor={Colors.Gray[6]}
                onSubmitEditing={onPress}
                style={[Styles.formInput, {borderTopRightRadius: 0, borderBottomRightRadius: 0, flexGrow: 1, marginBottom: 0 }, focused && Styles.formInputFocus]}/>

                <Pressable onPress={onPress} style={[Styles.button, { width: StyleConstants.FormItemHeight, marginBottom: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
                    <MaterialIcons name={icon} size={24} color="white"/>
                </Pressable>
        </View>
    )
}