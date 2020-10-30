import React from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';

export default function Ingredients(props) {
    return (
        <View style = {[{width: 250}, {height: 150},{marginTop:50} ]}>
            <Text style={[{ color: "white" }, {paddingLeft: 5}, {fontSize: 18}]}>
                Ingredients
            </Text>
            <FlatList
                style = {[{borderWidth: 2}, {marginTop:7.5}]}
                data = {props.content}
                renderItem={({item}) => (
                    <View>
                        <Text style={[{ color: "white" }, {paddingLeft: 10}, {paddingTop: 2.5}, {fontSize: 14}]}> 
                            {item}
                        </Text>
                    </View>
                )}
                keyExtractor={item => item}
            />
        </View>
    )
}