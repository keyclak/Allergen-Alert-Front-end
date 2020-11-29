import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, Image, TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet, useAddRestriction, useDeleteModification } from '../hooks/api';
import { AuthContext } from '../context';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function ViewDiet({navigation}) {

    const getDiet = useGetDiet();
    const deleteRestriction = useDeleteDiet();
    const deleteModification = useDeleteModification();

    const [dietState, setDietState] = useState();
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        navigation.addListener('focus', () =>  getDiet.background());
        setInterval(() => {setSpinner(false)}, 500);
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
    
    function onDeleteRestriction(id) {
        deleteRestriction.execute(id)
            .then(() => getDiet.background());
    }

    function onDeleteModification(id) {
        deleteModification.execute(id)
            .then(() => getDiet.background());
    }

    
    return (
    <SafeAreaView>
    <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:30}]}>  
        <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={Styles.spinnerTextStyle}
        />
        <View style={{width: StyleConstants.FormWidth, flex: 1}}>
            <Text style={{fontSize: RFPercentage(5), color: Colors.Foreground, alignSelf: 'center', paddingBottom: 10}}>Dietary Restrictions</Text>
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
                                onPress={() => onDeleteRestriction(item.id)}
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
            <Text style={{fontSize: RFPercentage(5), color: Colors.Foreground, alignSelf: 'center', paddingTop: 30, paddingBottom: 10}}>Diet Modifications</Text>
            <View style={{flex: 1}}>
                <FlatList
                    data={getDiet.response?.modifications}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 20 }}>
                            
                            <TouchableOpacity
                                style={[Styles.button, {width: '75%'}]}
                                onPress={viewRestriction(item.id)}
                                disabled={true}
                                >
                                <View style={{}}>
                                    {(item.type == 0)&&<Text style={[Styles.ingredientList, {color: '#07bb02'}]}
                                        //style={[Styles.buttonText, {paddingLeft: 32, paddingBottom: 20}]}
                                        >
                                        { item.ingredient } (Exception)
                                    </Text>}
                                    {(item.type == 1)&&<Text style={[Styles.ingredientList, {color: '#e50000'}]}
                                        //style={[Styles.buttonText, {paddingLeft: 32, paddingBottom: 20}]}
                                        >
                                        { item.ingredient } (Restriction)
                                    </Text>}
                                </View>
                            </TouchableOpacity>
                            
                            
                            
                            
                            
                            <TouchableOpacity
                                style={Styles.button}
                                onPress={() => onDeleteModification(item.id)}
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
            <View style={{paddingBottom: 5}}>
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
    </View>
    </SafeAreaView>
    );
}