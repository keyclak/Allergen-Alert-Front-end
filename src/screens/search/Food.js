import React, {useEffect, useState, useRef} from 'react';
import {Button, View, ScrollView, Text, SafeAreaView, StyleSheet, Pressable, Image, TouchableOpacity, Alert, RefreshControl, Animated} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import { useDummy, useGetUpcSearch, useGetFood , useAddToGroceryList, useSetFoodState} from '../../hooks/api';
import { MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import Expandable from '../../components/Expandable';
import ExpandableFloatingButton from '../../components/ExpandableFloatingButton';
import LoadingAlertBox from '../../components/LoadingAlertBox';

export default function Food({ navigation, route }) {
    const upc = route.params.upc;
    const foodId = route.params.foodId;
    const [food, setFood] = useState(null);

    const getUpcSearch = useGetUpcSearch();
    const getFood = useGetFood();
    const addToGroceryList = useAddToGroceryList(); 
    const flagSetFoodState = useSetFoodState();
    const saveSetFoodState = useSetFoodState();

    const scrollAnimation = useRef(new Animated.Value(0)).current;

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
        .then (refresh())
        .catch(e => {});
    }

    return(
        <View style={Styles.container}>
            <LoadingAlertBox
                colors={Colors.Blue}
                errorColors={Colors.Red}
                icon="check-circle"
                loadingText="Adding Item..."
                text="Added item to grocery list"
                error={addToGroceryList.error}
                errorIcon="error"
                loading={addToGroceryList.loading}/>

            <LoadingAlertBox
                colors={Colors.Blue}
                errorColors={Colors.Red}
                icon="check-circle"
                loadingText="Flagging food..."
                text="Flagged food"
                error={flagSetFoodState.error}
                errorIcon="error"
                loading={flagSetFoodState.loading}/>

            <LoadingAlertBox
                colors={Colors.Blue}
                errorColors={Colors.Red}
                icon="check-circle"
                loadingText="Saving food..."
                text="Saved food"
                error={saveSetFoodState.error}
                errorIcon="error"
                loading={saveSetFoodState.loading}/>


            <Animated.View style={[
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor: Colors.Gray[3],
                    paddingTop: 20,
                    alignItems: 'center',
                    transform: [
                        { translateY: scrollAnimation.interpolate({
                            inputRange: [0, 2],
                            outputRange: [0, -1]
                        })}
                    ]
                }
            ]}>
                <MaterialCommunityIcons name="food-apple" color={Colors.Gray[8]} size={200}/>
            </Animated.View>


            <Animated.ScrollView 
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {y: scrollAnimation}}}
                ], { useNativeDriver: true })}
                refreshControl={<RefreshControl colors={[Colors.Blue[4]]} refreshing={getFood.loading || getUpcSearch.loading} onRefresh={refresh}/>}
                style={{width: '100%'}}
                contentContainerStyle={{flexGrow: 1}}>

                <View style={{
                    height: 200
                }}/>

                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
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

                    {
                        food?.inGroceryList
                            ?  (
                                <View style={Styles.infoBubble}>
                                    <MaterialCommunityIcons name="shopping" color={Colors.Background} size={20}/>
                                </View>
                            ) :  null
                    }
                    {
                        food?.state == 2
                            ? (
                                <View style={Styles.infoBubble}>
                                    <MaterialIcons name="flag" color={Colors.Background} size={20} />
                                </View>
                            ) : null
                    }
                    {
                        food?.state == 1
                            ? (
                                <View style={Styles.infoBubble}>
                                    <MaterialIcons name="bookmark" color={Colors.Background} size={20} />
                                </View>
                            ) : null
                    }
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

                    {!(food?.safe)
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
                            food?.ingredients.map((ingr, i) => (
                                <Text 
                                    key={`${i}`}
                                    style={{
                                        marginTop: 3,
                                        color: ingr.safe
                                            ? Colors.Gray[7]
                                            : Colors.Red[5]
                                    }}>
                                    
                                    {ingr.ingredient}
                                </Text>
                            ))
                        }
                    </Expandable>
                </View>
            </Animated.ScrollView>

            <ExpandableFloatingButton icon="playlist-add" items={[
                {
                    name: "Saved Foods",
                    onPress: () => saveSetFoodState.execute(food?.id, 1).then(() => refresh())
                },
                {
                    name: "Flagged Foods",
                    onPress: () => flagSetFoodState.execute(food?.id, 2).then(() => refresh())
                },
                {
                    name: "Grocery List",
                    onPress: () => addToGroceryList.execute(food?.id).then(() => refresh())
                }
            ]}/>
        </View>
    )
}