
import React, { useRef, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import SwipableListItem from '../components/SwipableListItem';
import SwipableAddListItem from '../components/SwipableAddListItem';
import { render } from 'react-dom';

export default function SavedFoods({navigation}) {
    const [getRecdIngs, setRecdIngs] = useState(ing)//useGetRecdIngs();
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

    // useEffect(() => {
    //     navigation.addListener('focus', () =>  getRecdIngs.background());
    // }, [navigation]);

    const renderItem = ({ item }) => (
        <Text>{item.name}</Text>
      );

    function restrictionRenderItem({item}) {
        return (
             <SwipableAddListItem deleteOnPress={() => null} addOnPress={() => null} style={{backgroundColor: Colors.Blue[0]}}>
                    <Text style={[Styles.listItemText, {color: Colors.Blue[6]}]}>{item.name}</Text>
            </SwipableAddListItem>
        )
    }


    return (
        <View style={[Styles.container, {justifyContent: 'flex-start'}]}>
            
            <FlatList
                style={{width: '100%'}}
                data={ing}   
                keyExtractor={item => item.key} 
                renderItem={restrictionRenderItem}          
                //refreshing={getRecdIngs.loading}
                //onRefresh={() => getRecdIngs.background()}
                //foodOnDelete={(f) => setRecdIngs.execute(f.foodId, 0).then(() => getRecdIngs.background())}
            /> 
        </View>
    );
}