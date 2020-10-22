import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { StyleConstants, Styles, Colors } from '../style';

export default function FlatlistItem(props) {

    function handlePress(location) {
        console.log(location)
    }

    return(
        <ListItem key={props.i} bottomDivider onPress={() => {handlePress(props.item.navTo)}}>
            <Icon name={props.item.icon} color={"#666"}/>
            <ListItem.Content>
            <ListItem.Title style={[Styles.labelText, {color:"#666"}]}>{props.item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="#666"/>
        </ListItem>
    )
}