import React, { useRef, useContext, useEffect, useState } from 'react';
import { CheckBox,TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet, Button} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetIngredients, useAddModification } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import ButtonPartition from '../components/ButtonPartition';
import AlertBox from '../components/AlertBox';


export default function RestrictionInfo({navigation, route}) {

    const id = route.params;
    const context = useContext(AuthContext);
    const getIngredients = useGetIngredients();

    const [dietID, setDietID] = useState(route.params);

    useEffect(() => {
        navigation.addListener('focus', () =>  getIngredients.execute(id));
    }, [navigation]);

    const [ingredient, setIngredient] = useState();
    const [type, setType] = useState();
    const addModification = useAddModification(ingredient, type);
    const initialRender = useRef(true);

    useEffect(() => {
        if(initialRender.current) {
            initialRender.current = false;
        } else {
            addModification.execute()
            .then(() => navigation.pop())
            .catch(e => {});
        }

    }, [ingredient]);

    function onAddException(ingredient) {
        return function() {
            setType(0);
            
            setIngredient(ingredient);
        }
    }

    return (

        <View style={[Styles.container, {justifyContent: 'flex-start'}]}>  
            <AlertBox icon="error" text={addModification.error} colors={Colors.Red}/>
            <FlatList
                data={getIngredients.response?.ingredients}
                renderItem={({ item }) => (

                    <ButtonPartition item={item} onPress={() => onAddException(item)}></ButtonPartition>
                )}
                keyExtractor={(item, index) => 'key'+index}
                />
            </View>
    );
}