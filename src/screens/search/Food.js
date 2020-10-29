import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';
import { StyleConstants, Styles, Colors } from '../../style';
import Ingredients from '../../components/Ingredients'
import { color } from 'react-native-reanimated';
import { useDummy } from '../../hooks/api';

export default function Food() {
    const [foodObj, setFoodObj] = useState({
        name: 'food1',
        ingredients: [
            {
                name: 'salt',
                key: 1
            },
            {
                name: 'pepper',
                key: 2
            },
            {
                name: 'mono and diglycerides',
                key: 3
            }
        ],
       // safe: false
        safe: true
    })

    const food = useDummy({
        name: 'food1',
        ingredients: [
            {
                name: 'salt',
                key: 1
            },
            {
                name: 'pepper',
                key: 2
            },
            {
                name: 'mono and diglycerides',
                key: 3
            }
        ],
       // safe: false
        safe: true
    });

    const [ingredients, setIngredients] = useState(foodObj.ingredients);
    
    const disclaimer = "Basic legal disclaimer"

    return(
        <View style={[Styles.container, {justifyContent:'space-evenly'}]}>  
            <View style={{display:'flex', direction:'column', alignItems: 'center'}}>
                <Text style={[Styles.titleText, {fontSize: 45}]}>{foodObj.name}</Text> 
                <View style={[Styles.alertBox, (foodObj.safe ? null : Styles.alert)]}>
                    <Text style={Styles.subtitleText}>{(foodObj.safe ? 'This food is safe!' : 'This food is not safe!')}</Text>
                </View>
            </View>
            <View style={{display: 'flex', alignItems: 'center'}}>
                <Ingredients content={ingredients} />
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