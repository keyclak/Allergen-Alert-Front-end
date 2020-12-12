
import React, { useRef, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet, RefreshControl} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import SwipableListItem from '../components/SwipableListItem';
import SwipableAddListItem from '../components/SwipableAddListItem';
import { render } from 'react-dom';
import { useAddModification, useGetRecommendations, useRejectRecommendation } from '../hooks/api';

export default function SavedFoods({navigation}) {
    const [getRecdIngs, setRecdIngs] = useState(ing)//useGetRecdIngs();
    const addModification = useAddModification();
    const rejectRecommendation = useRejectRecommendation();
    const getRecommendations = useGetRecommendations();
   // const setRecdIngs = useSetRecdIngs();


    const ing = [
        {
            name: 'ing1',
            key: 1
        }, 
        {
            name: 'ing2',
            key: 2
        }
    ];

    useEffect(() => {
        navigation.addListener('focus', () =>  getRecommendations.background());
    }, [navigation]);

    function onAccept(ingredient) {
        addModification.execute(ingredient, 1)
            .then(() => getRecommendations.background())
            .catch(() => {});
    }

    function onReject(ingredient) {
        rejectRecommendation.execute(ingredient)
            .then(() => getRecommendations.background())
            .catch(() => {});
    }

    function restrictionRenderItem({item}) {
        return (
             <SwipableAddListItem deleteOnPress={() => onReject(item)} addOnPress={() => onAccept(item)} style={{backgroundColor: Colors.Blue[0]}}>
                    <Text style={[Styles.listItemText, {color: Colors.Blue[6]}]}>{item}</Text>
            </SwipableAddListItem>
        )
    }

    function renderEmpty() {
        return (
            <View style={{ height: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>     
                <Text style={{color: Colors.Gray[5]}}>No Recommendations. You may need to flag more items</Text>
            </View>
        );
    }

    return (
        <View style={[Styles.container, {justifyContent: 'flex-start'}]}>
            
            <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{flexGrow: 1}}
                data={getRecommendations.response}
                keyExtractor={item => item} 
                renderItem={restrictionRenderItem}          
                ListEmptyComponent={renderEmpty}
                refreshControl={<RefreshControl colors={[Colors.Blue[4]]} refreshing={getRecommendations.loading} onRefresh={() => getRecommendations.background()}/>}
            /> 
        </View>
    );
}