import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet, Text, TouchableOpacity, Button, TextInput, SafeAreaView, FlatList } from "react-native";
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
        <View style={Styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={{ borderRadius: 20, alignSelf: 'center', flexDirection: 'row', justifyContent:'space-evenly' }}>
                    <TextInput style={styles.inputFood }
                        placeholder="  Search Food"
                        onChangeText= {t => setSearchValue(t)}
                        onSubmitEditing={() => fetchData()}
                    />

                    <View style={{backgroundColor: Colors.ButtonBackground, borderRadius: 20, alignContent: 'center',justifyContent: 'center'}}> 
                        <Button 
                            button backgroundColor
                            onPress={() => fetchData()}
                            title="Search"
                            color='#FFF'                        
                        />
                    </View>
                </View>
            </View>
            <FlatList
                data={getFoodSearch.response}
                keyExtractor={item => item.id}
                renderItem={Item} 
                extraData={getFoodSearch.response}/>
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
        borderWidth: 5,
        fontSize: 25,
        height: 50,
    },
    item: {
        backgroundColor: Colors.ButtonBackground,
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

