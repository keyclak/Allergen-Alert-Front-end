import React, {useEffect, useState} from 'react'
import {SafeAreaView, ScrollView, View, Text, FlatList, Pressable, Image} from 'react-native'
import { StyleConstants, Styles, Colors } from '../style';
import { useDeleteGrocery, useGetGroceryList, useTogglePurchased } from '../hooks/api';
import { ListItem, CheckBox } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function GroceryList({navigation}) {

    const getGroceryList = useGetGroceryList();
    const deleteGrocery = useDeleteGrocery(); 
    const togglePurchased = useTogglePurchased(); 

    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        navigation.addListener('focus', () =>  getGroceryList.background());
        setInterval(() => {setSpinner(false)}, 500);
    }, [navigation]);

    function onDelete(id) {
        deleteGrocery.execute(id)
            .then(() => getGroceryList.background())
            .catch(e => {});
    }

    function onCheck(food) {
        togglePurchased.execute(food.foodId, !food.purchased)
            .then(() => getGroceryList.background())
            .catch(e => {});    
    }

    return (
        <SafeAreaView style={[Styles.container, {flex: 1, alignItems: 'flex-start'}]}>
            <View>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={Styles.spinnerTextStyle}
                />
                <FlatList
                    data={getGroceryList.response}
                    renderItem={({ item }) => (
                        <ListItem containerStyle={{backgroundColor: 'Colors.Background', padding: 2, width: wp('100%')}}
                        >
                            <CheckBox
                                containerStyle={{width: wp('73%'), borderRadius: 15}}
                                title={item.name}
                                checked={item.purchased}
                                onPress={() => navigation.navigate('FoodPage', { foodId: item.foodId })}
                                onIconPress={() => onCheck(item)}
                            />
                            <Pressable
                                style={{paddingBottom: 5}}
                                onPress={() => onDelete(item.foodId)}>
                                <Image source={require('../../assets/bin.png')} style={{width: wp('10%'), height: hp('6%')}}></Image>
                            </Pressable>
                        </ListItem>
                    )}
                    keyExtractor={item => `${item.foodId}`}
                />
            </View>
        </SafeAreaView>
    )
}