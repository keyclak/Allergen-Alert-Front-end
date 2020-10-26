import React, { useEffect, useState } from 'react';
import {Image, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';

const Colors = {
    Foreground: '#01760c',
    Accent: '#FFF',
    AccentForeground: '#b05903',
    Background: '#51d112',
    BackgroundBlur: '#444',
    InputBorder: '#01760c',
    InputBackground: '#FFF',
    Input: '#01760c',
    ButtonBorder: '#7e4104',
    ButtonBackground: '#b05903',
    Error: '#F44',
};
const StyleConstants = {
    Radius: 25,
    FormItemHeight: 50,
    FormWidth: '80%',
    FormItemTextSize: 18
};

const Styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.Background,
        paddingTop: 100
    },
    backgroundImage: {
        justifyContent: 'center',     
        alignItems: 'center',     
        flex: 1,     
        resizeMode: 'contain'
    },
    textInput: {
        height: StyleConstants.FormItemHeight,
        borderRadius: StyleConstants.Radius,
        borderWidth: 2,
        borderColor: Colors.InputBorder,
        paddingLeft: StyleConstants.Radius,
        paddingRight: StyleConstants.Radius,
        color: Colors.Input,
        fontSize: StyleConstants.FormItemTextSize,
        backgroundColor: Colors.InputBackground,
        elevation: 10, //Android
        shadowRadius: 5, //iOS
        shadowColor: 'black', //iOS
    },
    button: {
        borderRadius: StyleConstants.Radius,
        borderWidth: 2,
        height: StyleConstants.FormItemHeight,
        backgroundColor: Colors.ButtonBackground,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.ButtonBorder,
        backgroundColor: Colors.AccentForeground,
        elevation: 10, //Android
        shadowRadius: 5, //iOS
        shadowColor: 'black' //iOS
    },
    buttonText: {
        color: Colors.Accent,
        fontSize: StyleConstants.FormItemTextSize
    },
    errorText: {
        color: Colors.Error,
        fontSize: StyleConstants.FormItemTextSize
    },
    labelText: {
        color: Colors.InputBorder,
        marginLeft: StyleConstants.Radius,
        fontSize: StyleConstants.FormItemTextSize,
        fontWeight: 'bold'
    },
});

export { Colors, StyleConstants, Styles };