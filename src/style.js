import { StatusBar } from 'expo-status-bar';
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
    FormItemSpacing: 15,
    FloatingButtonSize: 60
};

const Styles = StyleSheet.create({
    alertContainer: {
        height: '100%',
        width: '100%',
    },
    container: {
        backgroundColor: Colors.Background,
        display: 'flex',
        height: '100%',
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
        borderColor: Colors.Gray[6],
        color: Colors.Gray[7],
        marginBottom: StyleConstants.FormItemSpacing,
        borderWidth: 0
    },
    formInputFocus: {
        backgroundColor: 'white',
        borderWidth: 2
    },
    formInputError: {
        backgroundColor: Colors.Red[2],
        borderColor: Colors.Red[7]
    },
    logo: {
        fontSize: 45,
        color: Colors.Blue[6],
        alignSelf: 'center',
        bottom: '5%'
    },
    button: {
        backgroundColor: Colors.Blue[6],
        borderRadius: StyleConstants.Radius,
        height: StyleConstants.FormItemHeight,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: StyleConstants.FormItemSpacing,
    },
    buttonPressed: {
        backgroundColor: Colors.Blue[8]
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
    },
    alertBoxContainer: {
        position: 'absolute',
        top: 30,
        width: StyleConstants.FormWidth,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: StyleConstants.Radius,
        borderWidth: 2,
        height: StyleConstants.FormItemHeight,
        paddingLeft: 5,
        elevation: 5
    },
    alertBoxText: {
        fontSize: StyleConstants.FormItemTextSize,
        marginLeft: 5
    },
    headerText: {
        fontSize: StyleConstants.FormItemTextSize * 2,
        color: Colors.Gray[7],
        paddingBottom: StyleConstants.FormItemSpacing,
        alignSelf: 'center'
    },
    floatingButton: {
        position: "absolute",
        width: StyleConstants.FloatingButtonSize,
        height: StyleConstants.FloatingButtonSize,
        borderRadius: StyleConstants.FloatingButtonSize / 2,
        elevation: 10,
        backgroundColor: Colors.Blue[6],
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: StyleConstants.FloatingButtonSize / 2,
        right: StyleConstants.FloatingButtonSize / 2
    },
    listItem: {
        backgroundColor: Colors.Gray[0],
        height: StyleConstants.FormItemHeight,
        borderRadius: StyleConstants.Radius,
        justifyContent: 'center',
        paddingLeft: StyleConstants.Radius,
        marginBottom: StyleConstants.FormItemSpacing / 2,
        width: '90%',
        alignSelf: 'center'
    },
    listItemText: {
        color: Colors.Gray[7],
        fontSize: StyleConstants.FormItemTextSize
    }
});

export { Colors, StyleConstants, Styles };