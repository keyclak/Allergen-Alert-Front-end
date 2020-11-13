import React, { useRef, useContext, useEffect, useState } from 'react';
import { CheckBox,TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetIngredients, useAddModification } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


export default function SelectRestriction({navigation, route}) {

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
            .catch(e => {

                console.error(error);
            });
        }

    }, [ingredient]);

    function onAddException(ingredient) {
        return function() {
            setType(0);
            setIngredient(ingredient);
        }
    }

    return (

        <View style={[Styles.containerIngredient, {justifyContent: 'flex-start', paddingTop:40}]}>   
            <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>{getIngredients.response?.name}</Text>
            <FlatList
                data={getIngredients.response?.ingredients}
                renderItem={({ item }) => (

                    <View style={Styles.flatListRow}>
                        <View style={Styles.flatListRowSpacing}>
                            <Text
                                style={[Styles.buttonText, {paddingLeft: 25}]}
                                >
                                {item}
                            </Text>
                            <View style={{paddingRight: 25}}>
                                <TouchableOpacity
                                    style={[Styles.button,{width: "100%"}]}
                                    onPress={onAddException(item)}
                                    >
                                    <Text
                                        style={[Styles.buttonText]}
                                    >  Make Exception  </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => 'key'+index}
                />
            </View>
    );
}