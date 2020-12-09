
import React, { useRef, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetFlaggedFoods, useGetSavedFoods, useSetFoodState } from '../hooks/api';
import { ListItem, Icon } from 'react-native-elements'
import FoodList from '../components/FoodList';

export default function SavedFoods({navigation}) {
    const getSavedFoods = useGetSavedFoods();
    const setFoodState = useSetFoodState();

    useEffect(() => {
        navigation.addListener('focus', () =>  getSavedFoods.background());
    }, [navigation]);

    return (
        <View style={[Styles.container, {justifyContent: 'flex-start'}]}>
            <FoodList
                foods={getSavedFoods.response}
                refreshing={getSavedFoods.loading}
                onRefresh={() => getSavedFoods.background()}
                foodOnPress={(f) => navigation.navigate('FoodPage', {foodId: f.foodId})}
                foodOnDelete={(f) => setFoodState.execute(f.foodId, 0).then(() => getSavedFoods.background())}
            />
        </View>
    );
}