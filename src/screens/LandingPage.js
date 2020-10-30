import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { StyleConstants, Styles, Colors } from '../style';
import avatar from '../../assets/avatar.png'
import IconFlatlist from '../components/IconFlatlist'
import { useGetUsername } from '../hooks/api';


export default function LandingPage({navigation}) {

    const getUsername = useGetUsername();

    useEffect(() => {
        navigation.addListener('focus', () =>  getUsername.background());
    }, [navigation]);

    const list = [
        {
            title: 'View My Diet',
            icon: 'sort',
            navTo: 'ViewDiet'
        },
        {
            title: 'Settings',
            icon: 'settings',
            navTo: 'Settings'
        }
    ]
    
    const [image, setImage] = useState(avatar);

    return(
        <View style={[Styles.container, {paddingTop: 0}]}>
            <View style={{display: 'flex', alignItems: 'center'}}>
                {/* TODO: onPress user can pick an image to change profile pic */}
                <Pressable>
                    <Image style={[Styles.avatar]} source={image} />
                </Pressable>
                <Text style={[Styles.titleText]}>{getUsername.response?.username}</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <IconFlatlist content={list} />
            </View>
        </View>
    )
}