import React from 'react'
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Styles, Colors } from '../style';

export default function Ingredients(props) {
    return (
        <View>
        {
            props.content?.map((item, i) => (
            <ListItem key={i} containerStyle={{backgroundColor: Colors.Background, padding: 2}}>
                <ListItem.Content>
                    <ListItem.Title style={item.safe ? [Styles.ingredientList] : [Styles.ingredientList, {color: Colors.Error}]}>{item.ingredient}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            ))
        }
        </View>
    )
}