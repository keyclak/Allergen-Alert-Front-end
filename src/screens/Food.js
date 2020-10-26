import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { StyleConstants, Styles, Colors } from '../style';
import Ingredients from '../components/Ingredients'

export default function Food() {
    const [foodName, setFoodName] = useState("Cheerios"); 
    const [safety, setSafety] = useState(false); 

    const ing = [
        {
            name: 'ing1',
            key: 1
        }, 
        {
            name: 'ing2',
            key: 2
        }
    ]

    // TODO: will need to make a component to display 
    const [ingredients, setIngredients] = useState(ing);
    
    const disclaimer = "Basic legal disclaimer"

    const displaySafetyMsg = () => {
        if(safety) {
            return "This food is safe."
        }
        else {
            return "This food is not safe."
        }
    }

    return(
        <View style={[Styles.container, {backgroundColor: 'white'}]}>   
            <Text style={[Styles.titleText, {marginTop: 20}]}>{foodName}</Text>
            <Text style={[Styles.titleText, {marginTop: 20}]}>{displaySafetyMsg()}</Text>
            <Ingredients content={ingredients} />
            <Text style={[Styles.labelText, {marginLeft: 0}]}>{disclaimer}</Text>
        </View>
    )
}