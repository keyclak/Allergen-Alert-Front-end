import React from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';
import { Styles } from '../style';

export default function Ingredients(props) {
    return (
        <View style = {[{marginTop:50} ]}>
            <Text style={[{ color: "white" }, {fontSize: 20}, {textAlign: 'center'}]}>
                Ingredients:
            </Text>
            <FlatList
                data = {props.content}
                renderItem={({item}) => (
                    <View>
                        <Text style={[Styles.ingredientList]}> 
                            {item.name}
                        </Text>
                    </View>
                )}
                keyExtractor={item => item}
            />
        </View>
    )
}