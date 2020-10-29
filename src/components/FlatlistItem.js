import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { StyleConstants, Styles, Colors } from '../style';

export default function FlatlistItem(props) {

    const navigation = useNavigation(); 
    
    return(
        <ListItem key={props.i} bottomDivider onPress={() => { navigation.navigate(props.item.navTo) }}>
            <Icon name={props.item.icon} color={"#666"}/>
            <ListItem.Content>
            <ListItem.Title style={[Styles.labelText, {color:"#666"}]}>{props.item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="#666"/>
        </ListItem>
    )
}