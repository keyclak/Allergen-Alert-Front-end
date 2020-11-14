import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { StyleConstants, Styles, Colors } from '../style';
import FlatlistItem from './FlatlistItem'

export default function IconFlatlist(props){

    return(
        <View style={{width: '100%', backgroundColor: Colors.Background}}>
        {
            (props.content).map((item, i) => (
                <FlatlistItem key={item.key} item={item} i={i}/>
            ))
        }
        </View>
    )
}