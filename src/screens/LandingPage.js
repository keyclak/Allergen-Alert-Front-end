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
            navTo: 'Diet'
        },
        {
            title: 'My Safe Foods',
            icon: 'verified-user', 
            navTo: 'SafeFoods'
        },
        {
            title: 'My Grocery List',
            icon: 'local-grocery-store',
            navTo: 'GroceryList'
        },
        {
            title: 'My Flagged Foods',
            icon: 'flag',
            navTo: 'FlaggedFoods'
        },
        {
            title: 'Create New Diet',
            icon: 'add-circle-outline',
            navTo: 'CreateDiet'
        },
        {
            title: 'Settings',
            icon: 'settings',
            navTo: 'Settings'
        }
    ]
    
    const [image, setImage] = useState(avatar); 
    const username = "catalinasandoval";

    return(
        <View style={[Styles.container, {backgroundColor: 'white'}]}>   
            {/* TODO: onPress user can pick an image to change profile pic */}
            <Pressable>
                <Image style={[Styles.avatar]} source={image} />
            </Pressable>
            <Text style={[Styles.titleText]}>{username}</Text>
            <IconFlatlist content={list} />
        </View>
    )
}