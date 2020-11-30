import React, { useRef, useContext, useEffect, useState } from 'react';
import { CheckBox,TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetIngredients, useAddModification } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'
import { ScrollView, Swipeable } from 'react-native-gesture-handler';


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
            console.log("here2");
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

    function rightAction(item) {
        return (
            <View style={{paddingBottom: 3005}}>
                <TouchableOpacity
                    style={[Styles.buttonMakeException]}
                    onPress={onAddException(item)}
                    >  
                    <Text
                        style={[Styles.buttonText]}
                    >  Make Exception  </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (

        <View style={[Styles.containerIngredient, {justifyContent: 'flex-start', paddingTop:40}]}>   
            <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>{getIngredients.response?.name}</Text>
            <Text style={[Styles.errorText, {alignSelf: 'center'}]}>{addModification.error}</Text>
            <FlatList
                data={getIngredients.response?.ingredients}
                renderItem={({ item }) => (
                    <View style={Styles.flatListRow}>
                        <View>

                        <Swipeable
                            renderRightActions={() => rightAction(item)}
                            style={{alignSelf: 'center'}}
                        >
                            <View style={Styles.flatListRowSpacing}>
                                <Text
                                    style={[Styles.buttonText]}
                                    >
                                    {item}
                                </Text>
                            </View>
                        </Swipeable>
                        </View>
                        
                    </View>
                )}
                keyExtractor={(item, index) => 'key'+index}
                />
            </View>
    );
}