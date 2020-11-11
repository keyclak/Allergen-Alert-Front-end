import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useAddRestriction, useGetRestrictions, useLogin } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'


export default function SelectRestriction({navigation}) {
    const context = useContext(AuthContext);

    const [currentDiet, setDiets] = useState([
        { title: 'Vegetarian', key: '1' },
        { title: 'Vegan', key: '2' },
        { title: 'Lactose Intolerant', key: '3' },
        { title: 'Gluten Free', key: '4' },
        { title: 'Peanut Free', key: '5' },
    ]);

    const getRestrictions = useGetRestrictions();
    const addRestriction = useAddRestriction();

    useEffect(() => {
        navigation.addListener('focus', () =>  getRestrictions.background());
    }, [navigation]);
    
    function onAdd(id) {
        addRestriction.execute(id)
            .then(() => navigation.pop())
            .catch(e => {});
        // navigation.navigate('ViewDiet');
        // console.log(currentDiet[1].key);
    }

    return (

        <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <Text style={{fontSize: 20, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>Select Dietary Restrictions</Text>
                <View>
                    <FlatList
                        data={getRestrictions.response}
                        renderItem={({ item }) => (
                            <View style={{paddingBottom: 30}}>
                            <TouchableOpacity
                                style={Styles.button}
                                onPress={() => onAdd(item.id)} >
                                <Text
                                    style={[Styles.buttonText]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => `${item.id}`}
                    />
                    <Text style={Styles.errorText}>{addRestriction.error}</Text>
                </View>
            </View>  
        </View>
    );
}