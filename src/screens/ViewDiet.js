import React, { useContext, useEffect, useRef, useState } from 'react';
import {SafeAreaView, Image, TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet, RefreshControl, Animated} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import FloatingButton from '../components/FloatingButton';
import SwipableEditListItem from '../components/SwipableEditListItem';
import AddHeader from '../components/AddHeader';
import SwipableListItem from '../components/SwipableListItem';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet, useAddRestriction, useDeleteModification } from '../hooks/api';
import { MaterialIcons } from '@expo/vector-icons';
import ExpandableFloatingButton from '../components/ExpandableFloatingButton';


export default function ViewDiet({navigation}) {

    const getDiet = useGetDiet();
    const deleteRestriction = useDeleteDiet();
    const deleteModification = useDeleteModification();

    const [listItems, setListItems] = useState([]);

    function load() {
        getDiet.execute()
            .then(d => {
                let items = [];

                items.push({
                    type: 'header',
                    headerText: 'Categories',
                    onAdd: selectRestriction,
                    key: 'h0'
                });

                d?.restrictions.forEach((r, i) => 
                    items.push({
                        type: 'category',
                        key: `c_${r.name}`,
                        ...r
                    }));

                items.push({
                    type: 'header',
                    headerText: 'Ingredients',
                    onAdd: typeRestriction,
                    key: 'h1'
                });

                d?.modifications
                    .filter(m => m.type === 1)
                    .forEach((m, i) => 
                        items.push({
                            type: 'modification',
                            key: `i_${m.ingredient}`,
                            modification: m
                        }));

                items.push({
                    type: 'header',
                    headerText: 'Exceptions',
                    onAdd: typeRestriction,
                    key: 'h2'
                });

                d?.modifications
                    .filter(m => m.type === 0)
                    .forEach((m, i) => 
                        items.push({
                            type: 'modification',
                            key: `e_${m.ingredient}`,
                            modification: m
                        }));

                setListItems(items);
            })
            .catch(() => {});
    }

    useEffect(() => {
        navigation.addListener('focus', () => load());
    }, [navigation]);

    function selectRestriction() {
        navigation.navigate('SelectRestriction');
    }

    function typeRestriction() {
        navigation.navigate('TypeRestriction');
    }
    
    function onDeleteRestriction(id) {
        deleteRestriction.execute(id)
            .then(() => load());
    }

    function onDeleteModification(id) {
        deleteModification.execute(id)
            .then(() => load());
    }

    function restrictionRenderItem({item}) {
        return (
            <View style={{marginBottom: StyleConstants.FormItemSpacing / 2}}>
                <SwipableEditListItem editOnPress={() => navigation.navigate('RestrictionInfo', item.id)} deleteOnPress={() => onDeleteRestriction(item.id)} style={{backgroundColor: Colors.Blue[0]}}>
                    <Text style={[Styles.listItemText, {color: Colors.Blue[6]}]}>{item.name}</Text>
                </SwipableEditListItem>
            </View>
        )
    }

    function modificationRenderItem({item}) {
        let fg = !item.type ? Colors.Green[6] : Colors.Red[6];
        let bg = !item.type ? Colors.Green[0] : Colors.Red[0];

        return (
            <View style={{marginBottom: StyleConstants.FormItemSpacing / 2}}>
                <SwipableListItem deleteOnPress={() => onDeleteModification(item.id)} style={{backgroundColor: bg}}>
                    <Text style={[Styles.listItemText, {color: fg}]}>{item.ingredient}</Text>
                </SwipableListItem>
            </View>
        );
    }

    function renderItem({item}) {
        switch(item.type) {
            case 'header':
                return (
                    <View style={{width: StyleConstants.FormWidth, alignSelf: 'center', marginVertical: 10}}>
                        <Text style={Styles.headerText}>{item.headerText}</Text>
                    </View>
                );
            case 'category':
                return restrictionRenderItem({item});
            case 'modification':
                return modificationRenderItem({item: item.modification});
        }
    }

    return (
        <View style={[Styles.container, {justifyContent: 'flex-start'}]}>  

            <FlatList
                style={{width: '100%'}}
                data={listItems}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                refreshControl={<RefreshControl colors={[Colors.Blue[7]]} refreshing={getDiet.loading} onRefresh={load}/>}/>

                <ExpandableFloatingButton items={[
                    {
                        name: "Exception",
                        onPress: typeRestriction
                    },
                    {
                        name: "Ingredient",
                        onPress: typeRestriction
                    },
                    {
                        name: "Category",
                        onPress: selectRestriction
                    }
                ]}/>

        </View>
    );
}