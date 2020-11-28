import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';

export default function FormTextInput({error, ...params}) {
    const [focused, setFocused] = useState(false);

    function onFocus() {
        setFocused(true);
    }

    function onBlur() {
        setFocused(false);
    }

    return (
        <TextInput 
            onFocus={onFocus}
            onBlur={onBlur}
            {...params}
            placeholderTextColor={error ? Colors.Red[5] : Colors.Gray[6]}
            style={[Styles.formInput, error && Styles.formInputError, focused && Styles.formInputFocus]}/>
    )
}