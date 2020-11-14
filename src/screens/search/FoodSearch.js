import React, { useEffect, useState } from "react";
import {Image, View, StatusBar, StyleSheet, Text, TouchableOpacity, Button, TextInput, SafeAreaView, FlatList } from "react-native";
import { StyleConstants, Styles, Colors } from '../../style';
import { useGetFoodSearch } from '../../hooks/api';
import { useDummy } from '../../hooks/api';

function searchHelper(query) {
    return useDummy([]);
}

export default function FoodSearch({navigation}) {

    const [searchValue, setSearchValue] = useState("");
    const getFoodSearch = useGetFoodSearch(searchValue);
  //  const [query, setQuery] = useState('');

    const fetchData = async () => {
   //     console.log(query);        
        getFoodSearch.background(); 
      };


    //creates an item object from data for flatlist
    const Item = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FoodPage', { foodId: item.id })}>
            <Text style={{fontSize: 20}}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[Styles.container, {flex: 1}]}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{ borderRadius: 20, alignSelf: 'center', flexDirection: 'row', justifyContent:'space-evenly' }}>
                    <TextInput style={styles.inputFood }
                        placeholder="  Search Food"
                        onChangeText= {t => setSearchValue(t)}
                        onSubmitEditing={() => fetchData()}
                    />
                    <TouchableOpacity onPress={fetchData} style={{paddingTop: 4, paddingLeft: 10}}>
                        <Image source={require('../../../assets/search.png')} style={{width: 40, height: 40}} ></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={getFoodSearch.response}
                keyExtractor={item => item.id}
                renderItem={Item} 
                extraData={getFoodSearch.response}
                style={{width: '100%', alignContent: 'center'}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputFood: {
        alignItems: 'center',
        width: '75%',
        alignSelf: 'center',
        borderRadius: 20,
        borderColor: Colors.ButtonBackground,
        borderWidth: 3,
        fontSize: 25,
        height: 50,
        paddingLeft: 20,
        backgroundColor: Colors.Secondary
    },
    item: {
        backgroundColor: Colors.Secondary,
        padding: 15,
        marginVertical: 5,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: "bold",
    }
});

