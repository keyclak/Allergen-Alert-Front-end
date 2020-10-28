import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { StyleConstants, Styles, Colors } from '../style';
import Ingredients from '../components/Ingredients'

export default function Food() {
    const [foodName, setFoodName] = useState("Cheerios"); 
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

    // TODO: will need to make a component to display 
    const [ingredients, setIngredients] = useState(foodObj.ingredients);
    
    const disclaimer = "Basic legal disclaimer"

    return(
        <View style={Styles.container}>  
            <Text style={[Styles.titleText, {marginTop: 130}, {fontSize: 45}]}>{foodObj.name}</Text> 
            <View style={[Styles.alertBox, (foodObj.safe ? null : Styles.alert), {marginTop: -30}]}>
                <Text style={Styles.subtitleText}>{(foodObj.safe ? 'This food is safe!' : 'This food is not safe!')}</Text>
            </View>
            <Ingredients content={ingredients} />
            <Text style={[Styles.labelText, {marginLeft: 0}, {position: 'absolute'}, {bottom: 50}]}>{disclaimer}</Text>
        </View>
    )
}