import React, {useEffect, useState} from 'react';
import {Button, View, ScrollView, Text, SafeAreaView, StyleSheet, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import Ingredients from '../../components/Ingredients'
import { color } from 'react-native-reanimated';
import { useDummy, useGetUpcSearch } from '../../hooks/api';
import DialogInput from 'react-native-dialog-input';

export default function Food({ navigation, route }) {
    const upc = route.params.upc;
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

    const listIngredients = (ingredients) => {
        var x;
        var text = ""; 

        for(x in ingredients) {
            text += ingredients[x] + "\n"
        }

        return(
            <Text style={[Styles.ingredientList]}>{text}</Text>
        )
    }

    const disclaimer = "Basic Legal Disclaimer"

    const [flag, flagState] = useState(0);
    const [flagReason, changeFlagReason] = useState();
    const [dialog, dialogState] = useState(0);

    return(
        <SafeAreaView style={[Styles.container, {justifyContent:'space-evenly'}]}>  
            <ScrollView style={{display: 'flex', flexDirection: 'column', width: StyleConstants.FormWidth}}> 
                <View style={{display:'flex', direction:'column', alignItems: 'center'}}>
                    <Text style={[Styles.titleText, {marginTop: 20, fontSize: 45}]}>{getUpcSearch.response?.name}</Text> 
                </View>
                <View style={[Styles.alertBox, (getUpcSearch.response?.safe ? null : Styles.alert)]}>
                    <Text style={[Styles.subtitleText,{textAlign: 'center'}]}>{(getUpcSearch.response?.safe ? 'THIS FOOD IS SAFE!' : 'THIS FOOD IS NOT SAFE!')}</Text>
                </View>
                <View style={{paddingTop: 20}}></View>
                {flag === 1 &&
                    <View style={[Styles.flagBox, (getUpcSearch.response?.safe ? null : Styles.alert)]}>
                    <Image source={require('../../../assets/flagCircle.png')} style={{width: 20, height: 20}}></Image>
                    <Text style={[Styles.flagMessage,{textAlign: 'center'}]}>{'You have flagged this food for the following reason(s): '}</Text>
                    <Text style={[Styles.flagMessage,{textAlign: 'center'}]}>{flagReason}</Text>
                </View>}
                <View style={{alignItems: 'center', paddingTop: 5}}>
                    {flag === 1 &&
                    <Pressable style={Styles.flagButton} onPress={() => {flagState(0), changeFlagReason()}}>
                        <Text style={[Styles.buttonText, { fontWeight: 'bold', color: "black"}]}>Unflag food</Text>
                    </Pressable>}
                    {flag === 0 &&
                    <Pressable style={Styles.flagButton} onPress={() => {flagState(1), dialogState(1)}}>
                        <Text style={[Styles.buttonText, { fontWeight: 'bold', color: "black"}]}>Flag food</Text>
                    </Pressable>}
                </View>
                <View>
                    <Text style={[{ paddingTop: 20, color: Colors.Foreground, fontSize: 20, textAlign: 'center', textDecorationLine: 'underline'}]}>Ingredients</Text>
                    {listIngredients(getUpcSearch.response?.ingredients)}
                </View>
                <View style={{alignSelf: 'center', paddingTop: StyleConstants.Radius}}>
                    <Text style={[Styles.labelText, {color: Colors.Foreground, marginLeft: 0}]}>{disclaimer}</Text>
                </View>
                <DialogInput isDialogVisible={dialog ? true : false}
                    title={"Flag Food"}
                    message={"Why would you like to flag this food?"}
                    hintInput ={"Ex: Caused bloating, is unappealing, etc."}
                    submitInput={ (inputText) => {changeFlagReason(inputText), dialogState(0)} }
                    closeDialog={ () => {dialogState(0)}}
                   >
                </DialogInput>
            </ScrollView>
        </SafeAreaView>
    )
}