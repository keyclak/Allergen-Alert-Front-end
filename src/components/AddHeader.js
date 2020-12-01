import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddHeader({text, onPressAdd}) {
    return (
        <View style={{ flexDirection: 'row', width: StyleConstants.FormWidth, marginBottom: StyleConstants.FormItemSpacing, alignItems: 'center', alignSelf: 'center'}}>
            <Text style={Styles.headerText}>{text}</Text>
            <View style={{flexDirection: 'row-reverse', flexGrow: 1}}>
                <Pressable style={[Styles.button, Styles.headerButton]} onPress={onPressAdd}>
                    <MaterialIcons name="add" size={24} color="white"/>
                </Pressable>
            </View>
        </View>
    )
}