import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function AlertBox({text, icon, colors}) {
    if(!text) return null;

    return (
        <View style={[Styles.alertBoxContainer, { borderColor: colors[5], backgroundColor: colors[1] }]}>
            <MaterialIcons name="error" size={32} color={colors[5]}/>
            <Text style={[Styles.alertBoxText, { color: colors[5] }]}>{text}</Text>
        </View>
    )
}