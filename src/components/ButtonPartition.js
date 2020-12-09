import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function ButtonPartition({onPress, item}) {
    return (
            <View style={[Styles.buttonPartitionItem]}>
                <Text style={[Styles.listItemText, {flexWrap:'wrap'}]}>
                    {item}
                </Text>
                
                <Pressable onPress={onPress} style={[Styles.button, {width: StyleConstants.FormItemHeight, marginBottom: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
                    <MaterialIcons name="add" size={24} color="white"/>
                </Pressable>
            </View>   
    )
}