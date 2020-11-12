import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, SafeAreaView, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
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

    const listIngredients = (ingredients) => {
        var x;
        var text = ""; 

        for(x in ingredients) {
            text += ingredients[x] + "\n"
        }

        return(
            <Text style={[Styles.ingredientList]}>{text}</Text>
        )
    }

    function onAdd(id) {
        addToGroceryList.execute(id) 
            .catch(e => {});
    }
    
    const disclaimer = "Basic Legal Disclaimer"

    return(
        <SafeAreaView style={[Styles.container, {justifyContent:'space-evenly'}]}>  
            <ScrollView style={{display: 'flex', flexDirection: 'column'}}> 
                <View style={{display:'flex', direction:'column', alignItems: 'center'}}>
                    <Text style={[Styles.titleText, {marginTop: 20, fontSize: 45}]}>{getUpcSearch.response?.name}</Text> 
                </View>
                <View style={[Styles.alertBox, (getUpcSearch.response?.safe ? null : Styles.alert)]}>
                    <Text style={[Styles.subtitleText,{textAlign: 'center'}]}>{(getUpcSearch.response?.safe ? 'THIS FOOD IS SAFE!' : 'THIS FOOD IS NOT SAFE!')}</Text>
                </View>

                <View style={{paddingTop: 20, alignItems: 'center'}}>
                    <Pressable 
                        style={[Styles.button, {width: '80%'}]}
                        onPress={() => onAdd(getUpcSearch.response?.id)}>
                        <Text>Add to Grocery List</Text>
                    </Pressable>
                </View>
                <View>
                    <Text style={[{ paddingTop: 20, color: Colors.Foreground, fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}]}>Ingredients</Text>
                    {listIngredients(getUpcSearch.response?.ingredients)}
                </View>
                <View style={{alignSelf: 'center', paddingTop: StyleConstants.Radius}}>
                    <Text style={[Styles.labelText, {color: Colors.Foreground, marginLeft: 0}]}>{disclaimer}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}