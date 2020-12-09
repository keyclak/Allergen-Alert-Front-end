import React, {useEffect, useState} from 'react'
import {SafeAreaView, ScrollView, View, Text, FlatList, Pressable, RefreshControl} from 'react-native'
import { StyleConstants, Styles, Colors } from '../style';
import { useDeleteGrocery, useGetGroceryList, useTogglePurchased } from '../hooks/api';
import { ListItem, CheckBox } from 'react-native-elements'
import SwipableListItem from '../components/SwipableListItem';
import Checkbox from '../components/Checkbox';

export default function GroceryList({navigation}) {

    const getGroceryList = useGetGroceryList();
    const deleteGrocery = useDeleteGrocery(); 
    const togglePurchased = useTogglePurchased(); 

    useEffect(() => {
        navigation.addListener('focus', () =>  getGroceryList.background());
    }, [navigation]);

    function onDelete(id) {
        console.log(id);
        deleteGrocery.execute(id)
            .then(() => getGroceryList.background())
            .catch(e => {});
    }

    function onCheck(food) {
        togglePurchased.execute(food.foodId, !food.purchased)
            .then(() => getGroceryList.background())
            .catch(e => {});    
    }

    function renderItem({item}) {
        return (
            <SwipableListItem onPress={() => navigation.navigate('FoodPage', {foodId: item.foodId})} deleteOnPress={() => onDelete(item.foodId)}>
                <Checkbox style={{marginRight: 5}}/>
                <Text style={Styles.listItemText}>{item.name}</Text>
            </SwipableListItem>
        )
    }

    return (
        <View style={Styles.container}>
            <FlatList
                contentContainerStyle={{ paddingTop: 10 }}
                refreshControl={<RefreshControl onRefresh={getGroceryList.background} refreshing={getGroceryList.loading} colors={[Colors.Blue[4]]}/>}
                style={{width: '100%'}}
                data={getGroceryList.response}
                renderItem={renderItem}
                keyExtractor={item => `${item.foodId}`}/>
        </View>
    )
}