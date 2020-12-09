import React, { useRef, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetFlaggedFoods, useSetFoodState } from '../hooks/api';
import { ListItem, Icon } from 'react-native-elements'
import FoodList from '../components/FoodList';

export default function FlaggedFoods({navigation}) {
    const flaggedFoods = useGetFlaggedFoods();
    const setFoodState = useSetFoodState();

    useEffect(() => {
        navigation.addListener('focus', () =>  flaggedFoods.background());
    }, [navigation]);

    return (
        <View style={[Styles.container, {justifyContent: 'flex-start'}]}>
            <FoodList
                foods={flaggedFoods.response}
                refreshing={flaggedFoods.loading}
                onRefresh={() => flaggedFoods.background()}
                foodOnPress={(f) => navigation.navigate('FoodPage', {foodId: f.foodId})}
                foodOnDelete={(f) => setFoodState.execute(f.foodId, 0).then(() => flaggedFoods.background())}
            />
        </View>
    );
}