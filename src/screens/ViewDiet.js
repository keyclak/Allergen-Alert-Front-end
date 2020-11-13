import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, Image, TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet, useAddRestriction } from '../hooks/api';
import { AuthContext } from '../context';

export default function ViewDiet({navigation}) {

    const getDiet = useGetDiet();
    const deleteRestriction = useDeleteDiet();

    const [dietState, setDietState] = useState();

    useEffect(() => {
        navigation.addListener('focus', () =>  getDiet.background());
    }, [navigation]);

    function selectRestriction() {
        navigation.navigate('SelectRestriction');
    }

    function viewRestriction(id) {
        return function() {
            navigation.navigate('RestrictionInfo', id);
        }
    }

    function typeRestriction() {
        navigation.navigate('TypeRestriction');
    }
    
    function onDelete(id) {
        deleteRestriction.execute(id)
            .then(() => getDiet.background());
    }

    return (
    <SafeAreaView>
    <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>  
        <View style={{width: StyleConstants.FormWidth, flex: 1}}>
            <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>Dietary Restrictions</Text>
            <View style={{flex: 1}}>
                <FlatList
                    data={getDiet.response?.restrictions}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 20 }}>
                            <TouchableOpacity
                                style={[Styles.button, {width: '75%'}]}
                                onPress={viewRestriction(item.id)}
                                >
                                <Text
                                    style={[Styles.buttonText]}
                                    //style={[Styles.buttonText, {paddingLeft: 32, paddingBottom: 20}]}
                                    >
                                    { item.name }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={Styles.button}
                                onPress={() => onDelete(item.id)}
                                >
                                <Text
                                    style={[Styles.buttonText]}
                                >  Delete  </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
            <TouchableOpacity
                style={Styles.button}
                onPress={selectRestriction}
                >
                <Text
                    style={[Styles.buttonText]}
                >Add a Dietary Restriction</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingTop: 30, paddingBottom: 30}}>Other Restrictions</Text>
            <View style={{flex: 1}}>
                <FlatList
                    data={getDiet.response?.modifications}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 20 }}>
                            <View style={{}}>
                                {(item.type == 1)&&<Text style={[Styles.ingredientList, {color: '#07bb02'}]}
                                    //style={[Styles.buttonText, {paddingLeft: 32, paddingBottom: 20}]}
                                    >
                                    { item.ingredient }
                                </Text>}
                                {(item.type == 0)&&<Text style={[Styles.ingredientList, {color: '#e50000'}]}
                                    //style={[Styles.buttonText, {paddingLeft: 32, paddingBottom: 20}]}
                                    >
                                    { item.ingredient }
                                </Text>}
                            </View>
                            <View style={Styles.button}>
                                <Text style={[Styles.buttonText]}>  Delete  </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
            <TouchableOpacity
                style={Styles.button}
                onPress={typeRestriction}
                >
                <Text
                    style={[Styles.buttonText]}
                >Add an Ingredient</Text>
            </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
    );
}