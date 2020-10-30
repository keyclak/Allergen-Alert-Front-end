import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetDiet, useDeleteDiet,  } from '../hooks/api';
import { AuthContext } from '../context';

export default function ViewDiet({navigation}) {

    const getDiet = useGetDiet();
    const deleteRestriction = useDeleteDiet();

    const [dietState, setDietState] = useState();


    useEffect(() => {
        navigation.addListener('focus', () =>  getDiet.background());
    }, [navigation]);

    function addRestriction() {
        navigation.navigate('SelectRestriction');
    }
    
    function onDelete(id) {
        deleteRestriction.execute(id);
    }

    return (
    <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>Dietary Restrictions</Text>
                <FlatList
                    data={getDiet.response?.restrictions}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 20 }}>
                            <Text
                                style={[Styles.buttonText, {paddingLeft: 32, paddingBottom: 20}]}>
                                {item.name}
                            </Text>
                            <TouchableOpacity
                                style={Styles.button}
                                onPress={() => onDelete(item.id)}
                                >
                                <Text> Delete </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => `${item.id}`}
                />
                <TouchableOpacity
                    style={Styles.button}
                    onPress={addRestriction}
                    >
                    <Text>Add a Dietary Restriction</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}