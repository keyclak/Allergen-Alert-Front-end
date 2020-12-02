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
    // Red: [
    //     '#fff5f5',
    //     '#ffe3e3',
    //     '#ffc9c9',
    //     '#ffa8a8',
    //     '#ff8787',
    //     '#ff6b6b',
    //     '#fa5252',
    //     '#f03e3e',
    //     '#e03131',
    //     '#c92a2a'
    // ],
    Red: [
        '#FEE7DA',
        '#FEC9B6',
        '#FEA591',
        '#FE8276',
        '#FE4A49',
        '#DA3542',
        '#B6243D',
        '#931736',
        '#790E32',
    ],
    // Blue: [
    //     '#e7f5ff',
    //     '#d0ebff',
    //     '#a5d8ff',
    //     '#74c0fc',
    //     '#4dabf7',
    //     '#339af0',
    //     '#228be6',
    //     '#1c7ed6',
    //     '#1971c2',
    //     '#1864ab'
    // ],
    Blue: [
        '#D4FCF4',
        '#AAF9F0',
        '#7DEFEA',
        '#5ADADF',
        '#2AB7CA',
        '#1E91AD',
        '#156E91',
        '#0D5075',
        '#083A60',
    ],
    Green: [
        '#F5FCDD',
        '#E8FABC',
        '#D4F298',
        '#BDE67B',
        '#9ED651',
        '#7EB83B',
        '#609A28',
        '#467C19',
        '#33660F',
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
        backgroundColor: Colors.Red[1],
        borderColor: Colors.Red[5]
    },
    logo: {
        fontSize: 45,
        color: Colors.Blue[4],
        alignSelf: 'center',
        bottom: '5%'
    },
    button: {
        backgroundColor: Colors.Blue[4],
        borderRadius: StyleConstants.Radius,
        height: StyleConstants.FormItemHeight,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: StyleConstants.FormItemSpacing,
    },
    buttonPressed: {
        backgroundColor: Colors.Blue[6]
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
    floatingButton: {
        position: "absolute",
        width: StyleConstants.FloatingButtonSize,
        height: StyleConstants.FloatingButtonSize,
        borderRadius: StyleConstants.FloatingButtonSize / 2,
        elevation: 10,
        backgroundColor: Colors.Blue[4],
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
        marginTop: StyleConstants.FormItemSpacing / 2,
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center'
    },
    listItemText: {
        color: Colors.Gray[7],
        fontSize: StyleConstants.FormItemTextSize
    },
    headerText: {
        fontSize: 28,
        color: Colors.Gray[7]
    },
    headerButton: {
        backgroundColor: Colors.Gray[6],
        width: StyleConstants.FormItemHeight,
        marginBottom: 0
    },
    infoBubble: {
        marginLeft: 10,
        color: Colors.Gray[1],
        backgroundColor: '#000B',
        paddingHorizontal: 10,
        height: 35,
        borderRadius: StyleConstants.Radius,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoBubbleText: {
        fontSize: 20,
        color: Colors.Gray[1],
        bottom: 1
    }
});

export { Colors, StyleConstants, Styles };