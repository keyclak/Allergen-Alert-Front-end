import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useAddRestriction, useGetRestrictions, useLogin } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'
import FormTextInput from '../components/FormTextInput';


export default function TypeRestriction({navigation, route}) {

    function onAdd() {

        navigation.navigate('ViewDiet');
    }


    return (

        <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <FormTextInput placeholder="Ingredient"/>
                <View style={{paddingTop: 20}}>
                    <TouchableOpacity
                        style={Styles.button}
                        onPress={onAdd}
                        >
                        <Text
                            style={[Styles.buttonText]}
                        >Add to Diet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}