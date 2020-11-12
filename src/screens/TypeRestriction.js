import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useAddModification } from '../hooks/api';
import { ListItem, Icon } from 'react-native-elements'
import FormTextInput from '../components/FormTextInput';



export default function TypeRestriction({navigation}) {

    const [ingredient, setIngredient] = useState();
    const [type, setType] = useState();
    const addModification = useAddModification(ingredient, type);

    function onAddType0() {
        setType(0);
        addModification.execute()
            .then(() => navigation.pop())
            .catch(e => {});
    }

    function onAddType1() {
        setType(1);
        addModification.execute()
            .then(() => navigation.pop())
            .catch(e => {});
    }

    return (

        <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <FormTextInput placeholder="Ingredient" onChangeText={setIngredient}/>
                <View style={{flexDirection: "row", justifyContent: "space-between",paddingTop: 20}}>
                    <TextLoadingButton style={[Styles.button, {width: "47%"}]} text="Add to Diet Type 1" isLoading={addModification.loading} onPress={onAddType0} />
                    <TextLoadingButton style={[Styles.button, {width: "47%"}]} text="Add to Diet Type 2" isLoading={addModification.loading} onPress={onAddType1} />
                </View>
            </View>
        </View>
    );
}