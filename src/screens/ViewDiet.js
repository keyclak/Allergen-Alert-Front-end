import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, Image, TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import AddHeader from '../components/AddHeader';
import SwipableListItem from '../components/SwipableListItem';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet, useAddRestriction, useDeleteModification } from '../hooks/api';
import { MaterialIcons } from '@expo/vector-icons';


export default function ViewDiet({navigation}) {

    const getDiet = useGetDiet();
    const deleteRestriction = useDeleteDiet();
    const deleteModification = useDeleteModification();

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
    
    function onDeleteRestriction(id) {
        deleteRestriction.execute(id)
            .then(() => getDiet.background());
    }

    function onDeleteModification(id) {
        deleteModification.execute(id)
            .then(() => getDiet.background());
    }

    function restrictionRenderItem({item}) {
        return (
            <View style={{marginBottom: StyleConstants.FormItemSpacing / 2}}>
                <SwipableListItem onPress={() => navigation.navigate('RestrictionInfo', item.id)} deleteOnPress={() => onDeleteRestriction(item.id)}>
                    <Text style={Styles.listItemText}>{item.name}</Text>
                </SwipableListItem>
            </View>
        )
    }

    function modificationRenderItem({item}) {
        let background = item.type ? Colors.Red[0] : Colors.Green[0];
        let foreground = item.type ? Colors.Red[9] : Colors.Green[9];

        return (
            <View style={{marginBottom: StyleConstants.FormItemSpacing / 2}}>
                <SwipableListItem deleteOnPress={() => onDeleteModification(item.id)} style={{ backgroundColor: background }}>
                    <Text style={[Styles.listItemText, { color: foreground }]}>{item.ingredient}</Text>
                </SwipableListItem>
            </View>
        );
    }

    
    return (
    <View style={[Styles.container, {paddingTop: 35, justifyContent: 'flex-start'}]}>  
        <AddHeader text="Restrictions" onPressAdd={selectRestriction}/>
        <FlatList
            style={{width: '100%', flexGrow: 0, marginBottom: 30}}
            data={getDiet.response?.restrictions}
            renderItem={restrictionRenderItem}
            keyExtractor={item => `${item.id}`}/>

        <AddHeader text="Modifications" onPressAdd={typeRestriction}/>
        <FlatList
            style={{width: '100%', flexGrow: 0}}
            data={getDiet.response?.modifications}
            renderItem={modificationRenderItem}
            keyExtractor={item => `${item.id}`} />

    </View>
    );
}