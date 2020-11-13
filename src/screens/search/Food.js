import React, {useEffect, useState} from 'react';
import {Button, View, ScrollView, Text, SafeAreaView, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import Ingredients from '../../components/Ingredients'
import { useDummy, useGetUpcSearch, useAddToGroceryList } from '../../hooks/api';
import { color } from 'react-native-reanimated';
import { useDummy, useGetUpcSearch } from '../../hooks/api';
import DialogInput from 'react-native-dialog-input';

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

    const listRestrictions = (restrictions) => {
        var x;
        var text = ""; 

        for(x in restrictions) {
            text += restrictions[x].name + "\n"
        }

        if (text.length == 0 ) {
            return null 
        }

        return(
            <View>
                <Text style={{ paddingTop: 20, color: Colors.Foreground, fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}}>Violated Restrictions:</Text>
                <Text style={[Styles.ingredientList]}>{text}</Text>
            </View>
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
                    <Text style={getUpcSearch.response?.safe ? [Styles.subtitleText,{textAlign: 'center'}] : [Styles.subtitleText,{textAlign: 'center', color: Colors.Accent}]}>{(getUpcSearch.response?.safe ? 'THIS FOOD IS SAFE!' : 'THIS FOOD IS NOT SAFE!')}</Text>
                </View>
                <View style={{paddingTop: 10, alignItems: 'center'}}>
                    <Pressable 
                        style={getUpcSearch.response?.inGroceryList ? null : [Styles.button, {width: '80%'}]}
                        onPress={getUpcSearch.response?.inGroceryList ? null : () => onAdd(getUpcSearch.response?.id)}>
                        <Text style={{color: Colors.Accent}}>{getUpcSearch.response?.inGroceryList ? 'This food has been added to your grocery list' : 'Add to Grocery List'}</Text>
                    </Pressable>
                </View>
                <View style={{paddingTop: 20}}></View>
                <View style={{alignItems: 'center', paddingTop: 5}}>
                </View>
                <View>
                    {listRestrictions(getUpcSearch.response?.violatedRestrictions)}
                </View>
                <Text style={[{ paddingTop: 20, color: Colors.Foreground, fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}]}>Ingredients</Text>
                <Ingredients content={getUpcSearch.response?.ingredients} />
                <View style={{alignSelf: 'center', paddingTop: StyleConstants.Radius}}>
                    <Text style={[Styles.labelText, {color: Colors.Foreground, marginLeft: 0}]}>{disclaimer}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}