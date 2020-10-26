import React from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler'

export default function Ingredients(props) {
    return (
        <View style = {{width: 100, height: 100}}>
            <Text>Ingredients</Text>
            <FlatList
                style = {{borderWidth: 2}}
                data = {props.content}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    )
}