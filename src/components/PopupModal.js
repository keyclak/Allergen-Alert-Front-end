import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Modal } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonTextInput from '../components/ButtonTextInput';

export default function PopupModal({visible, setVisible, title, children}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={visible}
            onRequestClose={() => setVisible(false)}>

            <Pressable
                onPress={() => setVisible(false)}
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'black', opacity: 0.5}]}/>

                    <Pressable style={{
                        backgroundColor: Colors.Gray[4],
                        elevation: 10,
                        borderRadius: StyleConstants.Radius,
                        width: '90%',
                        maxHeight: '80%',
                        overflow: 'hidden'
                    }}>
                        <View
                            style={{
                                height: 40,
                                backgroundColor: Colors.Blue[5],
                                borderTopLeftRadius: StyleConstants.Radius,
                                borderTopRightRadius: StyleConstants.Radius,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{color: Colors.Background, fontSize: StyleConstants.FormItemTextSize}}>
                                {title}
                            </Text>
                        </View>
                        <View style={{paddingHorizontal: 10, overflow: 'hidden'}}>
                            {children}
                        </View>
                    </Pressable>
            </Pressable>
        </Modal>
    )
}