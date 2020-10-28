import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, Styles } from '../style';

export default function LoadingButton({children, isLoading, onPress, style}) {
    return (
        <Pressable style={[Styles.button, style]} onPress={onPress}>
            {
                isLoading
                    ? <ActivityIndicator color={Colors.AccentForeground} size="large"/>
                    : children
            }
        </Pressable>
    )
}