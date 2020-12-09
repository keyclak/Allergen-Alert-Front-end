import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated, FlatList, RefreshControl } from 'react-native'; 
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import SwipableListItem from './SwipableListItem';

export default function FoodList({foods, foodOnPress, foodOnDelete, addOnPress, refreshing, onRefresh}) {
    function renderEmptyComponent() {
        return refreshing ? null : 
            <View style={{ height: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>     
                <Text style={{color: Colors.Gray[5]}}>No foods in this list</Text>
            </View>
    }

    function renderItem({item}) {
        return (
            <SwipableListItem onPress={() => foodOnPress(item)} deleteOnPress={() => foodOnDelete(item)}>
                <Text style={Styles.listItemText}>{item.name}</Text>
            </SwipableListItem>
        )
    }

    return (
        <FlatList
            refreshControl={<RefreshControl colors={[Colors.Blue[4]]} refreshing={refreshing} onRefresh={onRefresh}/>}
            ListEmptyComponent={renderEmptyComponent}
            data={foods}
            keyExtractor={item => item.foodId}
            renderItem={renderItem} 
            contentContainerStyle={{flexGrow: 1}}
            style={{width: '100%', alignContent: 'center'}}/>
    );
}