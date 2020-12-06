import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useAddRestriction, useGetRestrictions, useLogin } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'


export default function SelectRestriction({navigation}) {
    const getRestrictions = useGetRestrictions();
    const addRestriction = useAddRestriction();

    useEffect(() => {
        navigation.addListener('focus', () =>  getRestrictions.background());
    }, [navigation]);
    
    function onAdd(id) {
        addRestriction.execute(id)
            .then(() => navigation.pop())
            .catch(e => {});
        // navigation.navigate('ViewDiet');
        // console.log(currentDiet[1].key);
    }

    return (
        <View style={[Styles.container, {justifyContent: 'flex-start', backgroundColor: Colors.Blue[4], paddingTop: 40}]}>
            <Text style={[Styles.headerText, {color: Colors.Gray[2]}]}>Choose a restriction to add</Text>
            <FlatList
                style={{width: '100%'}}
                data={getRestrictions.response}
                renderItem={({ item }) => (
                    <Pressable style={[Styles.listItem, {backgroundColor: Colors.Blue[6]}]}>
                        <Text style={[Styles.listItemText, {color: Colors.Gray[2]}]}>{item.name}</Text>
                    </Pressable>
                )}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    );
}