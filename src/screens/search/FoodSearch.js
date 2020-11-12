import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet, Text, TouchableOpacity, Image, TextInput, SafeAreaView, FlatList } from "react-native";
import { StyleConstants, Styles, Colors } from '../../style';
import { useGetFoodSearch } from '../../hooks/api';
import { useDummy } from '../../hooks/api';

function searchHelper(query) {
    return useDummy([]);
}

export default function FoodSearch({navigation}) {
    //const getFoodSearch = useDummy();

    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);
    const getFoodSearch = useGetFoodSearch(searchValue);

    const fetchData = async (t) => {
        //console.log(t)
        setSearchValue(t);
        getFoodSearch.background(); //
        setResults(getFoodSearch.response)
        //console.log(results)
      };

    useEffect(() => {
    fetchData();
    }, []);

    useEffect(() => {
        console.log(getFoodSearch.response)
    }, [getFoodSearch.response]);


    //creates an item object from data for flatlist
    const Item = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FoodPage', { upc: item.id })}>
            <Text style={{fontSize: 20}}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={Styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{width: '100%', borderRadius: 20}}>
                    <TextInput style={styles.inputFood}
                        placeholder="  Search Food"
                        onChangeText={t => fetchData(t)}
                    />
                </View>
            </View>
            <FlatList
                data={results}
                keyExtractor={item => item.id}
                renderItem={Item} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputFood: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        width: '90%',
        borderColor: '#FC9F24',
        borderWidth: 5,
        fontSize: 25,
        height: 50,
    },
    item: {
        backgroundColor: '#FC9F24',
        padding: 15,
        marginVertical: 5,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        fontSize: 20,
        fontWeight: "bold",
    }
});

