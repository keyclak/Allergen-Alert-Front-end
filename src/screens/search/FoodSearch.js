import React, { useEffect, useState } from "react";
import {Image, View, StatusBar, StyleSheet, Text, TouchableOpacity, Button, TextInput, SafeAreaView, FlatList, Pressable, ActivityIndicator } from "react-native";
import { StyleConstants, Styles, Colors } from '../../style';
import { useGetFoodSearch } from '../../hooks/api';
import { useDummy } from '../../hooks/api';
import ButtonTextInput from '../../components/ButtonTextInput';
import FloatingButton from "../../components/FloatingButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function FoodSearch({navigation}) {

    const [searchValue, setSearchValue] = useState("");
    const getFoodSearch = useGetFoodSearch(searchValue);

    const fetchData = async () => {
        getFoodSearch.background(); 
    };


    const Item = ({ item }) => (
        <Pressable style={Styles.listItem} onPress={() => navigation.navigate('FoodPage', { foodId: item.id })}>
            <Text style={Styles.listItemText}>{item.name}</Text>
        </Pressable>
    );

    function Header() {
        return (
            <View style={{height: 90}} />
        );
    }

    function openScanner() {
        navigation.push('Scanner');
    }

    function getItemsContent() {
        if(getFoodSearch.loading)
            return (
                <ActivityIndicator size="large" color={Colors.Blue[6]}/>
            )
        
        if(!searchValue)
            return (
                <Text style={{color: Colors.Gray[5]}}>Search for something, or open the barcode scanner</Text>
            )
        
        if(getFoodSearch.response.length > 0) {
            return (
                <FlatList
                    data={getFoodSearch.response}
                    keyExtractor={item => item.id}
                    renderItem={Item} 
                    extraData={getFoodSearch.response}
                    ListHeaderComponent={Header}
                    style={{width: '100%', alignContent: 'center'}}/>
            );
        } else {
            return (
                <Text style={{color: Colors.Gray[5]}}>No results found</Text>
            )
        }

    }

    return (
        <View style={Styles.container}>

            {
                getItemsContent()
            }

            <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 30}}>
                <ButtonTextInput
                    icon="search"
                    onChangeText={setSearchValue}
                    placeholder="Search"
                    onSubmitEditing={fetchData}
                    onPress={fetchData}/>
            </View>

            <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <FloatingButton onPress={openScanner}>
                    <MaterialCommunityIcons name="barcode-scan" size={32} color="white"/>
                </FloatingButton>
            </View>
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

