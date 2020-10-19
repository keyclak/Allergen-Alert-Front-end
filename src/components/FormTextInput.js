import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';

export default function FormTextInput({label, error, ...params}) {
    return (
        <View>
            <Text style={[Styles.labelText, error && { color: Colors.Error }]}>{label}</Text>
            <TextInput {...params} style={[Styles.textInput, error && { borderColor: Colors.Error }]}/>
        </View>
    )
}