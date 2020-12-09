import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    View,
    Text,
    Pressable,
    StyleSheet,
    RefreshControl,
    Animated,
    LayoutAnimation,
    UIManager,
    Modal,
    Button,
    ActivityIndicator
} from 'react-native';

import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import FloatingButton from '../components/FloatingButton';
import AnimatedFloatingButton from '../components/AnimatedFloatingButton';
import ButtonTextInput from '../components/ButtonTextInput';
import FormTextInput from '../components/FormTextInput';
import SwipableEditListItem from '../components/SwipableEditListItem';
import AddHeader from '../components/AddHeader';
import PopupModal from '../components/PopupModal';
import SwipableListItem from '../components/SwipableListItem';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet, useAddRestriction, useDeleteModification, useAddModification, useGetRestrictions } from'../hooks/api';
import { MaterialIcons } from '@expo/vector-icons';
import ExpandableFloatingButton from '../components/ExpandableFloatingButton';
import { TextInput } from 'react-native-gesture-handler';

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

export default function ViewDiet({navigation}) {

    const getDiet = useGetDiet();
    const deleteRestriction = useDeleteDiet();
    const deleteModification = useDeleteModification();
    const getRestrictions = useGetRestrictions();
    const addRestriction = useAddRestriction();
    const addModification = useAddModification();

    const [addExceptionIngredient, setAddExceptionIngredient] = useState('');
    const [addRestrictionIngredient, setAddRestrictionIngredient] = useState('');

    const [listItems, setListItems] = useState([]);

    function load() {
        getRestrictions.background();
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
                
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
        let fg = !item.type ? Colors.Green[7] : Colors.Red[6];
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
                    <View style={{width: StyleConstants.FormWidth, alignSelf: 'center', marginTop: 5}}>
                        <Text style={Styles.headerText}>{item.headerText}</Text>
                    </View>
                );
            case 'category':
                return restrictionRenderItem({item});
            case 'modification':
                return modificationRenderItem({item: item.modification});
        }
    }

    function categoriesRenderItem({item}) {
        return (
            <Pressable
                style={[Styles.listItem, {marginTop: 0, width: '100%'}]}
                onPress={() => {
                    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    addRestriction.execute(item.id)
                        .then(() => {
                            setAddCategoryVisible(false);
                            load();
                        });
                    }}>
                <Text style={Styles.listItemText}>
                    {item.name}
                </Text>
            </Pressable>
        )
    }

    const [addIngredientVisible, setAddIngredientVisible] = useState(false);
    const [addExceptionVisible, setAddExceptionVisible] = useState(false);
    const [addCategoryVisible, setAddCategoryVisible] = useState(false);

    return (
        <View style={[Styles.container, {justifyContent: 'flex-start'}]}>  


            <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingTop: StyleConstants.FormItemSpacing / 2}}
                data={listItems}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                refreshControl={<RefreshControl colors={[Colors.Blue[4]]} refreshing={getDiet.loading} onRefresh={load}/>}/>

                {/* <AnimatedFloatingButton onPress={() => navigation.navigate('SelectRestriction')}/> */}
                {/* <AnimatedFloatingButton /> */}

            <ExpandableFloatingButton items={[
                {
                    name: "Exception",
                    onPress: () => setAddExceptionVisible(true)
                },
                {
                    name: "Ingredient",
                    onPress: () => setAddIngredientVisible(true)
                },
                {
                    name: "Category",
                    onPress: () => setAddCategoryVisible(true)
                }
            ]}/>

            <PopupModal title="Add Ingredient" visible={addIngredientVisible} setVisible={setAddIngredientVisible} containerStyle={{paddingVertical: 10}}>
                <ButtonTextInput
                    placeholder="Ingredient"
                    icon="add"
                    onChangeText={setAddRestrictionIngredient}
                    onPress={() => {
                        addModification.execute(addRestrictionIngredient, 1)
                            .then(() => {
                                setAddIngredientVisible(false);
                                load();
                            })
                    }}/>
            </PopupModal>

            <PopupModal title="Add Exception" visible={addExceptionVisible} setVisible={setAddExceptionVisible} containerStyle={{paddingVertical: 10}}>
                <ButtonTextInput
                    placeholder="Ingredient"
                    icon="add"
                    onChangeText={setAddExceptionIngredient}
                    onPress={() => {
                        addModification.execute(addExceptionIngredient, 0)
                            .then(() => {
                                setAddExceptionVisible(false);
                                load();
                            })
                    }}/>
            </PopupModal>

            <PopupModal title="Add Category" visible={addCategoryVisible} setVisible={setAddCategoryVisible} containerStyle={{paddingHorizontal: 0}}>
                {
                    addRestriction.loading 
                        ? <ActivityIndicator color={Colors.Blue[5]} size="large"/>
                        : <FlatList
                            contentContainerStyle={{padding: 10}}
                            data={getRestrictions.response}
                            renderItem={categoriesRenderItem}
                            ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                            keyExtractor={item => item.name}/>
                }
            </PopupModal>

        </View>
    );
}