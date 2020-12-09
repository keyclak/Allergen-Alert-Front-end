import React, { useEffect, useState } from "react";
import {Image, View, StatusBar, StyleSheet, Text, TouchableOpacity, Button, TextInput, SafeAreaView, FlatList, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { StyleConstants, Styles, Colors } from '../../style';
import { useGetFoodSearch } from '../../hooks/api';
import { useDummy } from '../../hooks/api';
import ButtonTextInput from '../../components/ButtonTextInput';
import FloatingButton from "../../components/FloatingButton";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import FormTextInput from "../../components/FormTextInput";

export default function FoodSearch({navigation}) {
    const [searchValue, setSearchValue] = useState("");
    const getFoodSearch = useGetFoodSearch(searchValue);

    const fetchData = async () => {
        getFoodSearch.background(); 
    };

    useEffect(() => console.log(getFoodSearch.response), [searchValue]);

    function renderHeader() {
        return (
            <View
                style={{
                    backgroundColor: Colors.Blue[5],
                    borderRadius: StyleConstants.Radius,
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={Colors.Gray[4]}
                    onChangeText={setSearchValue}
                    onSubmitEditing={() => fetchData()}
                    style={{
                        color: Colors.Gray[1],
                        marginLeft: StyleConstants.Radius * 0.75,
                        fontSize: StyleConstants.FormItemTextSize,
                        flexGrow: 1
                    }}/>
                
                <Pressable style={{width: 40, alignItems: 'center', }} onPress={() => fetchData()}>
                    <MaterialIcons name="search" color={Colors.Background} size={24} />
                </Pressable>
            </View>
        );
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: renderHeader
        });
    }, [searchValue]);

    const Item = ({ item }) => (
        <Pressable style={Styles.listItem} onPress={() => navigation.navigate('FoodPage', { foodId: item.id })}>
            <Text style={Styles.listItemText}>{item.name}</Text>
        </Pressable>
    );

    function openScanner() {
        navigation.push('Scanner');
    }

    function getEmptyComponent() {
        return (
            <View style={{ height: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>     
                {searchValue
                    ? <Text style={{color: Colors.Gray[5]}}>No results found</Text>
                    : <Text style={{color: Colors.Gray[5]}}>Search for something, or open the barcode scanner</Text>
                }
            </View>
        );
    }


    return (
        <View style={Styles.container}>
            <FlatList
                refreshControl={<RefreshControl colors={[Colors.Blue[4]]} refreshing={getFoodSearch.loading} onRefresh={fetchData}/>}
                ListEmptyComponent={getEmptyComponent}
                data={getFoodSearch.response}
                keyExtractor={item => item.id}
                renderItem={Item} 
                extraData={getFoodSearch.response}
                contentContainerStyle={{flexGrow: 1}}
                style={{width: '100%', alignContent: 'center'}}/>

            <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <FloatingButton onPress={openScanner}>
                    <MaterialCommunityIcons name="barcode-scan" size={32} color="white"/>
                </FloatingButton>
            </View>
        </View>
    );
}