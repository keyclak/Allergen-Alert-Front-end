import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function Checkbox({ startChecked, onChange, style }) {
    const [checked, setChecked] = useState(startChecked);

    function onPress() {
        setChecked(!checked);
        onChange && onChange(checked);
    }

    return (
        <Pressable onPress={onPress} style={style}>
            {
                checked
                    ? <MaterialIcons name="check-circle" size={24} color={Colors.Blue[8]} />
                    : <MaterialIcons name="radio-button-unchecked" size={24} color={Colors.Gray[6]} />
            }
        </Pressable>
    )
}