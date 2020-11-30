import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, Image, TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet, useAddRestriction, useDeleteModification } from '../hooks/api';
import { AuthContext } from '../context';
import { ScrollView, Swipeable } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

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

    function rightActionRestriction(id) {
        return (
            <View style={{flexDirection: "row"}}>
                <View style={{width: 100}}>
                    <TouchableOpacity
                        style={[Styles.buttonMakeException]}
                        onPress={viewRestriction(id)}
                        >  
                        <Text
                            style={[Styles.buttonText, {alignSelf: 'center'}]}
                        >  Edit </Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: 100}}>
                    <TouchableOpacity
                        style={[Styles.buttonDelete]}
                        onPress={() => onDeleteRestriction(id)}
                        >  
                        <Text
                            style={[Styles.buttonText, {alignSelf: 'center'}]}
                        >  Delete </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function rightActionModification(id) {
        return (
            <View style={{width: 100}}>
                <TouchableOpacity
                    style={[Styles.buttonDelete]}
                    onPress={() => onDeleteModification(id)}
                    >  
                    <Text
                        style={[Styles.buttonText, {alignSelf: 'center'}]}
                    >  Delete </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (

    <View style={[Styles.containerIngredient, {justifyContent: 'flex-start', paddingTop:40}]}>  
        <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={Styles.spinnerTextStyle}
        />
            <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>Dietary Restrictions</Text>
            <View style={{flex: 1}}>
                <FlatList
                    data={getDiet.response?.restrictions}
                    renderItem={({ item }) => (
                        
                        <View style={Styles.flatListRow}>

                            <Swipeable
                                renderRightActions={() => rightActionRestriction(item.id)}
                                style={{alignSelf: 'center'}}
                            >
                                <View style={Styles.flatListRowSpacing}>  
                                    <Text
                                        style={[Styles.ingredientList]}
                                        >
                                        { item.name }
                                    </Text>
                                </View>
                            </Swipeable>
                        </View>
                    )}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
            <TouchableOpacity
                style={[Styles.button, {width: "80%", alignSelf: "center"}]}
                onPress={selectRestriction}
                >
                <Text
                    style={[Styles.buttonText]}
                >Add a Dietary Restriction</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingTop: 30, paddingBottom: 30}}>Diet Modifications</Text>
            
            <View style={{flex: 1}}>
                <FlatList
                    
                    data={getDiet.response?.modifications}
                    renderItem={({ item }) => (
                       
                        <View style={Styles.flatListRow}>
                            <Swipeable
                                renderRightActions={() => rightActionModification(item.id)}
                                style={{alignSelf: 'center'}}
                            >
                                <View style={Styles.flatListRowSpacing}>  
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
                                </View>
                            </Swipeable>
                        </View>  
                    )}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
            <View style={{paddingBottom: 30, width: "80%", alignSelf: "center"}}>
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
   
    );
}