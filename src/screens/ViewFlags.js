import React, { useContext, useEffect, useState } from 'react';
import {Image, TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet,  } from '../hooks/api';
import { AuthContext } from '../context';

export default function ViewFlags({navigation}) {

    const getDiet = useGetDiet();
    const deleteRestriction = useDeleteDiet();

    const [dietState, setDietState] = useState();


    useEffect(() => {
        navigation.addListener('focus', () =>  getDiet.background());
    }, [navigation]);

    function addRestriction() {
        navigation.navigate('SelectRestriction');
    }
    
    function onDelete(id) {

    }

    const [dummyFoods, setFoods] = useState([
        { title: 'Organic Blue Corn Tortilla Chips', key: '1' },
        { title: 'Piacci Lightly Smoked Aged Provolone', key: '2' },
        { title: 'Ramen Noodle Soup', key: '3' },
    ]);

    return (
    <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <FlatList
                        data={dummyFoods}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 20 }}>
                                <Text
                                    style={[Styles.buttonText]}>
                                    {item.title}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => onDelete(item.id)}
                                    >
                                    <Image source={require('../../assets/bin.png')} style={{width: 25, height: 25}}></Image>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => `${item.key}`}
                    />
            </View>
        </View>
    );
}