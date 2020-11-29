import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { StyleConstants, Styles, Colors } from '../style';
import avatar from '../../assets/avatar.png'
import IconFlatlist from '../components/IconFlatlist'
import { useGetUsername } from '../hooks/api';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function LandingPage({navigation}) {

    const getUsername = useGetUsername();

    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        navigation.addListener('focus', () =>  getUsername.background());
        setInterval(() => {setSpinner(false)}, 500);
    }, [navigation]);

    const list = [
        {
            title: 'View My Diet',
            icon: 'sort',
            navTo: 'ViewDiet',
            key: '1'
        },
        {
            title: 'Grocery List',
            icon: 'shopping-cart',
            navTo: 'GroceryList',
            key: '2'
        },
        {
            title: 'Settings',
            icon: 'settings',
            navTo: 'Settings',
            key: '3'
        }
    ]
    
    const [image, setImage] = useState(avatar);

    return(
        <View style={[Styles.container, {paddingTop: 0}]}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={Styles.spinnerTextStyle}
            />
            <View style={{display: 'flex', alignItems: 'center', height: hp('36%')}}>
                {/* TODO: onPress user can pick an image to change profile pic */}
                <Pressable>
                    <Image style={[Styles.avatar]} source={image} />
                </Pressable>
                <Text style={[Styles.titleText]}>{getUsername.response?.username}</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', width: '100%', height: hp('64%')}}>
                <IconFlatlist content={list} />
            </View>
        </View>
    )
}