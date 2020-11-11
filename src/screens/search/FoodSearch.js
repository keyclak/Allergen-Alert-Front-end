import React, { useState } from "react";
import { View, StatusBar, StyleSheet, Text, TouchableOpacity, Image, TextInput, SafeAreaView, FlatList } from "react-native";
import { StyleConstants, Styles, Colors } from '../../style';

export default function FoodSearch({navigation}) {
    //const getFoodSearch = useFoodSearch();

    //creates an item object from data for flatlist
    const Item = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => null}>
            <Text style={{fontSize: 20}}>{item.name}</Text>
        </TouchableOpacity>
    );

    const [results, setResults] = useState([
        
    ]);
    
    function search(query) {
        console.log(results);
        if(query === '')
           setResults([]);

        else
            setResults([
                {
                    name: 'food1',
                    key: 1
                }, 
                {
                    name: 'food2',
                    key: 2
                }
            ]);
    }


    return (
        <View style={Styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{width: '100%', borderRadius: 20}}>
                    <TextInput style={styles.inputFood}
                        placeholder="  Search Food"
                        onChangeText={t => search(t)}
                    />
                </View>
            </View>
            <FlatList
                data={results}
                keyExtractor={item => item.key}
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
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        fontSize: 20,
        fontWeight: "bold",
    }
});

