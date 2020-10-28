import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';

const Colors = {
    Foreground: '#FFF',
    Accent: '#68F',
    AccentForeground: '#FFF',
    Background: '#222',
    BackgroundBlur: '#444',
    Border: '#AAA',
    Error: '#F44',
    MainText: '#666'
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
        backgroundColor: Colors.Background
    },
    textInput: {
        height: StyleConstants.FormItemHeight,
        borderRadius: StyleConstants.Radius,
        borderWidth: 2,
        borderColor: Colors.Border,
        paddingLeft: StyleConstants.Radius,
        paddingRight: StyleConstants.Radius,
        color: Colors.Foreground,
        fontSize: StyleConstants.FormItemTextSize
    },
    button: {
        borderRadius: StyleConstants.Radius,
        height: StyleConstants.FormItemHeight,
        backgroundColor: Colors.Accent,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.AccentForeground,
        fontSize: StyleConstants.FormItemTextSize
    },
    errorText: {
        color: Colors.Error,
        fontSize: StyleConstants.FormItemTextSize
    },
    labelText: {
        color: Colors.Border,
        marginLeft: StyleConstants.Radius,
        fontSize: StyleConstants.FormItemTextSize
    },
    titleText: {
        color: Colors.MainText,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 160,
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
        borderColor: "white",
        alignSelf:'center',
        position: 'absolute',
        marginTop: 30
    },
    alertBox: {
        alignContent: 'center',
        justifyContent: 'center',
        color: Colors.MainText,
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 40,
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
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: '#FF403D'
    }
});

export { Colors, StyleConstants, Styles };