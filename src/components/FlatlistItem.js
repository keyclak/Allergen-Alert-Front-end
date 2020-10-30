import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { StyleConstants, Styles, Colors } from '../style';

export default function FlatlistItem(props) {

    const navigation = useNavigation(); 
    
    return(
        <ListItem containerStyle = {{backgroundColor: Colors.Background}} key={props.i} bottomDivider onPress={() => { navigation.navigate(props.item.navTo) }}>
            <Icon name={props.item.icon} color={Colors.Accent}/>
            <ListItem.Content >
            <ListItem.Title style={[Styles.labelText, {color:Colors.Accent}]}>{props.item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color= {Colors.Accent}/>
        </ListItem>
    )
}