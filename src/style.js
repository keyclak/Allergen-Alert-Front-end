import React, { useEffect, useState } from 'react';
import {Image, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Directions } from 'react-native-gesture-handler';

const Colors = {
    Background: 'white',
    Gray: [
        '#f8f9fa',
        '#f1f3f5',
        '#e9ecef',
        '#dee2e6',
        '#ced4da',
        '#adb5bd',
        '#868e96',
        '#495057',
        '#343a40',
        '#212529'
    ],
    Red: [
        '#fff5f5',
        '#ffe3e3',
        '#ffc9c9',
        '#ffa8a8',
        '#ff8787',
        '#ff6b6b',
        '#fa5252',
        '#f03e3e',
        '#e03131',
        '#c92a2a'
    ],
    Blue: [
        '#e7f5ff',
        '#d0ebff',
        '#a5d8ff',
        '#74c0fc',
        '#4dabf7',
        '#339af0',
        '#228be6',
        '#1c7ed6',
        '#1971c2',
        '#1864ab'
    ],
    Green: [
        '#ebfbee',
        '#d3f9d8',
        '#b2f2bb',
        '#8ce99a',
        '#69db7c',
        '#51cf66',
        '#40c057',
        '#37b24d',
        '#2f9e44',
        '#2b8a3e'
    ],
};

const StyleConstants = {
    Radius: 15,
    FormItemHeight: 50,
    FormWidth: '80%',
    FormItemTextSize: 16,
    FormItemSpacing: 15
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Background,
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formInput: {
        fontSize: StyleConstants.FormItemTextSize,
        borderRadius: StyleConstants.Radius,
        paddingLeft: StyleConstants.Radius,
        paddingRight: StyleConstants.Radius,
        height: StyleConstants.FormItemHeight,
        backgroundColor: Colors.Gray[2],
        color: Colors.Gray[7],
        marginBottom: StyleConstants.FormItemSpacing,
    },
    logo: {
        fontSize: 45,
        color: Colors.Blue[8],
        alignSelf: 'center',
        bottom: '5%'
    },
    button: {
        backgroundColor: Colors.Blue[8],
        borderRadius: StyleConstants.Radius,
        height: StyleConstants.FormItemHeight,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: StyleConstants.FormItemSpacing
    },
    buttonText: {
        fontSize: StyleConstants.FormItemTextSize,
        color: Colors.Background
    },
    plainButton: {
        height: StyleConstants.FormItemHeight * 0.5,
        marginBottom: StyleConstants.FormItemSpacing,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});

export { Colors, StyleConstants, Styles };