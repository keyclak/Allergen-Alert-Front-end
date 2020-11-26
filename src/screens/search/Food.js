import React, {useEffect, useState} from 'react';
import {Button, View, ScrollView, Text, SafeAreaView, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import TextLoadingButton from '../../components/TextLoadingButton'
import { color } from 'react-native-reanimated';
import { useDummy, useGetUpcSearch, useGetFood , useAddToGroceryList} from '../../hooks/api';
import Ingredients from '../../components/Ingredients'
import DialogInput from 'react-native-dialog-input';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Food({ navigation, route }) {
    const upc = route.params.upc;
    const foodId = route.params.foodId;
    const [food, setFood] = useState(null);
    const [spinner, setSpinner] = useState(true);

    const getUpcSearch = useGetUpcSearch();
    const getFood = useGetFood();
    const addToGroceryList = useAddToGroceryList(); 

    function refresh() {
        if(foodId) {
            getFood.execute(foodId)
                .then(r => setFood(r))
                .catch(e => 
                    Alert.alert(
                        e,
                        null,
                        [
                            { text: "OK", onPress: () => navigation.pop() }
                        ]
                    ));
        } else {
            getUpcSearch.execute(upc)
                .then(r => setFood(r))
                .catch(e => 
                    Alert.alert(
                        e,
                        null,
                        [
                            { text: "OK", onPress: () => navigation.pop() }
                        ]
                    ));
        }
    }

    useEffect(() => {
        navigation.addListener('focus', () => refresh())
        setInterval(() => {setSpinner(false)}, 500);
    }, [navigation]);

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
                <Text style={{ paddingTop: 20, color: Colors.Foreground, fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}}>Violated Restrictions</Text>
                <Text style={[Styles.ingredientList]}>{text}</Text>
            </View>
        )
    }


    function onAdd(id) {
        addToGroceryList.execute(id) 
        .then (refresh())
        .catch(e => {});
    }

    const disclaimer = "Basic Legal Disclaimer"

    return(
        <SafeAreaView style={[Styles.container, {justifyContent:'space-evenly'}]}>  
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={Styles.spinnerTextStyle}
            />
            <ScrollView style={{display: 'flex', width: '90%'}}> 
                <View style={{display:'flex', direction:'column', alignItems: 'center'}}>
                    <Text style={[Styles.titleText, {marginTop: 20, fontSize: 45}]}>{food?.name}</Text> 

                </View>
                <View style={[Styles.alertBox, (food?.safe ? null : Styles.alert)]}>
                    <Text style=
                      {food?.safe ? [Styles.subtitleText,{textAlign: 'center'}] : [Styles.subtitleText,{textAlign: 'center', color: Colors.Accent}]}>{(food?.safe ? 'THIS FOOD IS SAFE!' : 'THIS FOOD IS NOT SAFE!')}</Text>
                </View>
                <View style={{paddingTop: 10, alignItems: 'center'}}>
                    <Pressable 
                        style={food?.inGroceryList ? null : [Styles.button, {width: '80%'}]}
                        onPress={food?.inGroceryList ? null : () => onAdd(food?.id)}>
                        <Text style={{color: Colors.Accent}}>{food?.inGroceryList ? 'This food been added to your grocery list' : 'Add food to your grocery list'}</Text>
                    </Pressable>
                </View>
                <View style={{paddingTop: 20}}></View>
                <View style={{alignItems: 'center', paddingTop: 5}}>
                </View>
                <View>
                    {listRestrictions(food?.violatedRestrictions)}
                </View>
                <Text style={[{ paddingTop: 20, color: Colors.Foreground, fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}]}>Ingredients</Text>
                <Ingredients content={food?.ingredients} />
                <View style={{alignSelf: 'center', paddingTop: StyleConstants.Radius}}>
                    <Text style={[Styles.labelText, {color: Colors.Foreground, marginLeft: 0}]}>{disclaimer}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
