import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import Ingredients from '../../components/Ingredients'
import { color } from 'react-native-reanimated';
import { useDummy, useGetUpcSearch } from '../../hooks/api';

export default function Food({ navigation, route }) {
    const upc = route.params.upc;
    console.log(upc);

    const getUpcSearch = useGetUpcSearch();

    useEffect(() => {
        navigation.addListener('focus', () => 
            getUpcSearch.execute(upc)
                .catch(e => 
                    Alert.alert(
                        e,
                        null,
                        [
                            { text: "OK", onPress: () => navigation.pop() }
                        ]
                    )));
    }, [navigation]);

    useEffect(() => console.log(getUpcSearch.response), [getUpcSearch.response]);

    const disclaimer = "Basic legal disclaimer"

    return(
        <View style={[Styles.container, {justifyContent:'space-evenly'}]}>  
            <View style={{display:'flex', direction:'column', alignItems: 'center'}}>
                <Text style={[Styles.titleText, {fontSize: 45}]}>{getUpcSearch.response?.name}</Text> 
                <View style={[Styles.alertBox, (getUpcSearch.response?.safe ? null : Styles.alert)]}>
                    <Text style={Styles.subtitleText}>{(getUpcSearch.response?.safe ? 'This food is safe!' : 'This food is not safe!')}</Text>
                </View>
            </View>
            <View style={{display: 'flex', alignItems: 'center'}}>
                <Ingredients content={getUpcSearch.response?.ingredients} />
            </View>
            {/* <View style={[{flexDirection: "row"}]}>
                <TouchableOpacity
                    style={Styles.navButton}
                    onPress= {null}
                    underlayColor='#fff'>
                    <Text style = {Styles.navButtonText} > Back</Text>
                </TouchableOpacity>

                <View style={Styles.buttonSpace} />

                <TouchableOpacity
                    style={Styles.navButton}
                    onPress= {null}
                    underlayColor='#fff'>
                    <Text style = {Styles.navButtonText} >Search Another Item</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{alignSelf: 'auto'}}>
                <Text style={[Styles.labelText, {marginLeft: 0}]}>{disclaimer}</Text>
            </View>
        </View>
    )
}