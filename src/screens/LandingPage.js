import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { StyleConstants, Styles, Colors } from '../style';
import avatar from '../../assets/avatar.png'
import IconFlatlist from '../components/IconFlatlist'

export default function LandingPage() {

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
    const username = useState("TODO: Pull Username");

    return(
        <View style={[Styles.container, {paddingTop: 0}]}>
            <View style={{display: 'flex', alignItems: 'center'}}>
                {/* TODO: onPress user can pick an image to change profile pic */}
                <Pressable>
                    <Image style={[Styles.avatar]} source={image} />
                </Pressable>
                <Text style={[Styles.titleText]}>{username}</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <IconFlatlist content={list} />
            </View>
        </View>
    )
}