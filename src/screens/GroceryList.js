import React from 'react'
import {SafeAreaView, ScrollView, View, Text} from 'react-native'

export default function GroceryList({navigation}) {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Grocery List</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}