import React, { useEffect, useState } from 'react';
import {Image, View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';

const Colors = {
    Foreground: '#001dbd',
    Accent: '#FFF',
    AccentForeground: '#683604',
    Background: '#0060ff',
    BackgroundBlur: '#444',
    InputBorder: '#0034f5',
    InputBackground: '#FFF',
    Input: '#0034f5',
    ButtonBorder: '#683604',
    ButtonBackground: '#cc6f04',
    Border: '#AAA',
    Error: '#F44',
    MainText: '#666', 
    Secondary: '#00C4FF', 
    SecondaryAccent: '#00b0e6'
};
const StyleConstants = {
    Radius: 25,
    FormItemHeight: 50,
    FormWidth: '80%',
    FormItemTextSize: 16,
    AvatarRadius: 120
};

const Styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.Background,
        paddingTop: 30
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
        fontSize: StyleConstants.FormItemTextSize
    },
    titleText: {
        color: Colors.Foreground,
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: StyleConstants.FormItemHeight
    },
    subtitleText: {
        color: Colors.MainText,
        fontWeight: 'bold',
        fontSize: 20,
    },
    avatar: {
        width: StyleConstants.AvatarRadius,
        height: StyleConstants.AvatarRadius,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: Colors.Background,
        alignSelf:'center',
        marginTop: 30, 
        marginBottom: 20
    },
    alertBox: {
        alignContent: 'center',
        alignItems: 'center', 
        justifyContent: 'center',
        color: Colors.MainText,
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 45,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: '#00FF99'
    },
    alert: {
        alignContent: 'center',
        justifyContent: 'center',
        color: Colors.MainText,
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 45,
        paddingVertical: 25,
        borderRadius: 20,
        backgroundColor: '#FF403D'
    },
    navButton: {
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 20,
        backgroundColor: "#00C4FF",
        borderRadius: 20
        },
    navButtonText: {
        fontSize: 16,
        color: "black"
        },
    buttonSpace: {
        width: 20, 
        height: 20,
        },
    ingredientList: {
        color: Colors.Accent,
        paddingLeft: 10, 
        paddingTop: 5,
        fontSize: 17
    }
});

export { Colors, StyleConstants, Styles };