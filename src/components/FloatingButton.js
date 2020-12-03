import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';

export default function FloatingButton({onPress, children}) {

    return (
        <Pressable style={[Styles.floatingButton, {bottom: StyleConstants.FloatingButtonSize / 2, right: StyleConstants.FloatingButtonSize / 2}]} onPress={onPress}>
            {children}
        </Pressable>
    )
}