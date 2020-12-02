import React, {useEffect, useState} from 'react';
import {Button, View, ScrollView, Text, SafeAreaView, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import TextLoadingButton from '../../components/TextLoadingButton'
import { useDummy, useGetUpcSearch, useGetFood , useAddToGroceryList} from '../../hooks/api';
import Ingredients from '../../components/Ingredients';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Expandable from '../../components/Expandable';


export default function Food({ navigation, route }) {
    const upc = route.params.upc;
    const foodId = route.params.foodId;
    const [food, setFood] = useState(null);

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
    }, [navigation]);

    useEffect(() => {
        let color;
        if(getFood.loading || getUpcSearch.loading) {
            color = Colors.Gray[6];
        } else if(food?.safe) {
            color = Colors.Green[4]
        } else {
            color = Colors.Red[4]
        }

        navigation.setOptions({
            headerStyle: {
                backgroundColor: color
            }
        });
    }, [food, getFood.loading, getUpcSearch.loading])

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

    return(
        <View style={Styles.container}>
            <View style={[StyleSheet.absoluteFillObject, {backgroundColor: Colors.Gray[3], paddingTop: 20, alignItems: 'center'}]}>
                <MaterialCommunityIcons name="food-apple" color={Colors.Gray[8]} size={200}/>
            </View>

            <ScrollView style={{width: '100%'}} contentContainerStyle={{flexGrow: 1}}>
                <View style={{
                    height: 200
                }}/>

                <View style={{
                    marginBottom: 10,
                    flexDirection: 'row'
                }}>
                    <View style={Styles.infoBubble}>
                        <Text style={Styles.infoBubbleText}>
                            {food?.name}
                        </Text>
                    </View>
                    
                    <View style={Styles.infoBubble}>
                        {
                            food?.safe
                                ? <MaterialIcons name="check-circle" size={22} color={Colors.Green[4]} style={{right: 3}}/>
                                : <MaterialIcons name="warning" size={20} color={Colors.Red[4]} style={{right: 2}}/>
                        }
                        <Text style={Styles.infoBubbleText}>
                            {
                                food?.safe
                                    ? 'Safe'
                                    : 'Unsafe'
                            }
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: Colors.Background,
                        alignItems: 'center',
                        width: '100%',
                        flexGrow: 1,
                        elevation: 10,
                        paddingBottom: StyleConstants.FormItemSpacing
                    }}>

                    {
                        !(food?.safe)
                            ? (<Expandable headerText="Violated Restrictions">
                                    {
                                        food?.violatedRestrictions.map(r => (
                                            <Text style={{color: Colors.Gray[7]}}key={r.name}>{r.name}</Text>
                                        ))
                                    }
                                </Expandable>)
                            : null
                    }

                    <Expandable headerText="Ingredients">
                        {
                            food?.ingredients.map(i => (
                                <Text 
                                    key={i.ingredient}
                                    style={{
                                        marginTop: 3,
                                        color: i.safe
                                            ? Colors.Gray[7]
                                            : Colors.Red[5]
                                    }}>
                                    
                                    {i.ingredient}
                                </Text>
                            ))
                        }
                    </Expandable>
                </View>
            </ScrollView>
        </View>
    )
}
