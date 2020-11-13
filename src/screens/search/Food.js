import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, SafeAreaView, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import { ListItem } from 'react-native-elements'
import Ingredients from '../../components/Ingredients'
import { color } from 'react-native-reanimated';
import { useDummy, useGetUpcSearch, useAddToGroceryList } from '../../hooks/api';

export default function Food({ navigation, route }) {
    const upc = route.params.upc;
    const getUpcSearch = useGetUpcSearch();
    const addToGroceryList = useAddToGroceryList(); 

    useEffect(() => {
        navigation.addListener('focus', () => 
            getUpcSearch.execute(upc)
                .catch(e => 
                    Alert.alert(
                        e,
                        null,
                        [
                            { text: "OK", onPress: () => navigation.pop() }
                        ]
                    )));
    }, [navigation]);

    useEffect(() => console.log(getUpcSearch.response), [getUpcSearch.response]);

    function onAdd(id) {
        addToGroceryList.execute(id) 
        .then (getUpcSearch.background(upc))
        .catch(e => {});
    }

    const listIngredients = (ingredients) => {
        // console.log("food: " + ingredients[0].ingredient)
        return (
            (ingredients).map((item, i) => (
            <ListItem key={i} containerStyle={{backgroundColor: Colors.Background, padding: 2}}>
                <ListItem.Content>
                    <ListItem.Title style={item.safe ? [Styles.ingredientList] : [Styles.ingredientList, {color: Colors.Error}]}>{item.ingredient}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            ))
        )
    }

    const disclaimer = "Basic Legal Disclaimer"

    return(
        <SafeAreaView style={[Styles.container, {justifyContent:'space-evenly'}]}>  
            <ScrollView style={{display: 'flex', width: '90%'}}> 
                <View style={{display:'flex', direction:'column', alignItems: 'center'}}>
                    <Text style={[Styles.titleText, {marginTop: 20, fontSize: 45}]}>{getUpcSearch.response?.name}</Text> 
                </View>
                <View style={[Styles.alertBox, (getUpcSearch.response?.safe ? null : Styles.alert)]}>
                    <Text style={[Styles.subtitleText,{textAlign: 'center'}]}>{(getUpcSearch.response?.safe ? 'THIS FOOD IS SAFE!' : 'THIS FOOD IS NOT SAFE!')}</Text>
                </View>

                <View style={{paddingTop: 20, alignItems: 'center'}}>
                    <Pressable 
                        style={getUpcSearch.response?.inGroceryList ? null : [Styles.button, {width: '80%'}]}
                        onPress={getUpcSearch.response?.inGroceryList ? null : () => onAdd(getUpcSearch.response?.id)}>
                        <Text style={{color: Colors.Accent}}>{getUpcSearch.response?.inGroceryList ? 'This food been added to your grocery list' : 'Add food to your grocery list'}</Text>
                    </Pressable>
                </View>
                <Text style={[{ paddingTop: 20, color: Colors.Foreground, fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}]}>Ingredients</Text>
                <Ingredients content={getUpcSearch.response?.ingredients} />
                {/* {
                    // console.log("food: " + getUpcSearch.response?.ingredients[2].ingredient)
                    listIngredients(getUpcSearch.response?.ingredients)
                } */}
                <View style={{alignSelf: 'center', paddingTop: StyleConstants.Radius}}>
                    <Text style={[Styles.labelText, {color: Colors.Foreground, marginLeft: 0}]}>{disclaimer}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}